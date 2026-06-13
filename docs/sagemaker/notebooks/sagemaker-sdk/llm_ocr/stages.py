"""Pipeline stages: extract, describe, assemble."""

from __future__ import annotations

import json
import logging
import shutil
import time
from dataclasses import asdict
from datetime import datetime
from typing import Any, Dict, List

from datasets import Features, Sequence, Value, load_dataset, Image as HfImage

from .config import AssembleSettings, DescribeSettings, ExtractSettings, env
from .document import build_document_markdown, enrich_markdown_with_captions, write_json
from .storage import get_storage, get_source_storage

LOGGER = logging.getLogger(__name__)


def _format_duration(seconds: float) -> str:
    """Format duration as mm:ss."""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes:02d}:{secs:02d}"


def _now_iso() -> str:
    return datetime.utcnow().isoformat() + "Z"


def _dataset_features() -> Features:
    """Dataset schema - all data is embedded, no external file paths."""
    return Features(
        {
            "sample_id": Value("string"),
            "dataset_index": Value("int64"),
            "source_image": HfImage(),
            "document_with_boxes_image": HfImage(),
            "document_markdown": Value("string"),
            "extracted_figures": Sequence(HfImage()),
            "extracted_figures_metadata": Sequence(Value("string")),
            "document_final_markdown": Value("string"),
        }
    )


def run_stage_extract(settings: ExtractSettings) -> None:
    """Run OCR extraction on dataset samples."""
    stage_start = time.time()
    LOGGER.info("⏳ Starting EXTRACT stage...")

    # Lazy import torch - only needed for extract stage
    from torch.utils.data import DataLoader

    dataset = load_dataset(
        settings.dataset_name,
        settings.dataset_config,
        split=settings.dataset_split,
        streaming=settings.stream_dataset,
    )

    # Setup iterator with optional DataLoader for streaming
    if settings.stream_dataset:
        num_workers = env("DATALOADER_WORKERS", 2, int)
        prefetch = env("DATALOADER_PREFETCH", 2, int)
        kwargs = {
            "batch_size": 1,
            "num_workers": num_workers,
            "collate_fn": lambda b: b[0],
        }
        if num_workers > 0:
            kwargs["prefetch_factor"] = prefetch
        sample_iter = iter(DataLoader(dataset, **kwargs))
    else:
        sample_iter = iter(dataset)

    settings.output_dir.mkdir(parents=True, exist_ok=True)
    batches_dir = settings.output_dir / "document_batches"
    if batches_dir.exists():
        shutil.rmtree(batches_dir)
    batches_dir.mkdir(parents=True, exist_ok=True)

    batch_files: List[str] = []
    batch_idx = 0
    doc_count = 0
    failures: List[Dict[str, Any]] = []
    chunk_size = settings.inference.batch_size

    LOGGER.info(
        "Extract | dataset=%s/%s/%s | max_samples=%s | batch=%s",
        settings.dataset_name,
        settings.dataset_config,
        settings.dataset_split,
        settings.max_samples,
        chunk_size,
    )

    contexts: List[Dict[str, Any]] = []
    requests: List[Dict[str, Any]] = []

    def flush():
        nonlocal contexts, requests, doc_count, batch_idx
        if not contexts:
            return

        try:
            responses = settings.client.infer(requests)
        except Exception as exc:
            LOGGER.exception("Batch inference failed for %d samples", len(contexts))
            for ctx in contexts:
                failures.append({"sample_id": ctx["sample_id"], "error": str(exc)})
                if hasattr(ctx.get("image"), "close"):
                    ctx["image"].close()
            contexts, requests = [], []
            return

        docs: List[Dict[str, Any]] = []
        for i, ctx in enumerate(contexts):
            img = ctx.get("image")
            try:
                text = responses[i].strip() if i < len(responses) else ""
                if not text:
                    raise RuntimeError("Empty response")

                sample_dir = ctx["sample_dir"]
                sample_id = ctx["sample_id"]

                markdown, figures, figure_images, img_draw = build_document_markdown(
                    image=img,
                    response_text=text,
                    sample_id=sample_id,
                )

                # Save images locally for dataset loading (HfImage needs file paths)
                source_path = sample_dir / "source.png"
                boxes_path = sample_dir / "document_with_boxes.png"
                img_draw.save(boxes_path)

                # Save figure images for dataset loading
                figures_dir = sample_dir / "figures"
                figures_dir.mkdir(parents=True, exist_ok=True)
                figure_paths = []
                for fig_meta, fig_img in zip(figures, figure_images):
                    fig_path = figures_dir / f"{fig_meta.figure_id}.png"
                    fig_img.save(fig_path)
                    figure_paths.append(str(fig_path))

                docs.append(
                    {
                        "sample_id": sample_id,
                        "dataset_index": ctx["dataset_index"],
                        "source_image": str(source_path),
                        "document_with_boxes_image": str(boxes_path),
                        "document_markdown": markdown,
                        "extracted_figures": figure_paths,
                        "extracted_figures_metadata": [
                            json.dumps(asdict(f)) for f in figures
                        ],
                        "document_final_markdown": "",  # Filled in assemble stage
                    }
                )
            except Exception as exc:
                LOGGER.exception("Failed sample %s", ctx["sample_id"])
                failures.append({"sample_id": ctx["sample_id"], "error": str(exc)})
            finally:
                if hasattr(img, "close"):
                    img.close()

        if docs:
            batch_file = batches_dir / f"batch_{batch_idx:05d}.json"
            write_json(batch_file, docs)
            batch_files.append(str(batch_file))
            batch_idx += 1
            doc_count += len(docs)

        contexts, requests = [], []

    for idx, sample in enumerate(sample_iter):
        if settings.max_samples and idx >= settings.max_samples:
            break

        sample_id = f"sample_{idx:05d}"
        sample_dir = settings.output_dir / sample_id
        sample_dir.mkdir(parents=True, exist_ok=True)

        img = sample["images"][0].copy()
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(sample_dir / "source.png")

        contexts.append(
            {
                "sample_id": sample_id,
                "dataset_index": idx,
                "sample_dir": sample_dir,
                "image": img.copy(),
            }
        )
        requests.append(
            {
                "image": contexts[-1]["image"],
                "prompt": settings.prompt,
                "max_tokens": settings.max_tokens,
                "temperature": settings.temperature,
                "request_timeout": settings.inference.request_timeout,
            }
        )
        img.close()

        if len(requests) >= chunk_size:
            flush()

    flush()

    # Save manifest
    write_json(
        settings.output_dir / "manifest.json",
        {
            "generated_at": _now_iso(),
            "stage": "extract",
            "documents_count": doc_count,
            "failures": failures,
        },
    )

    # Load as HF dataset
    ds = load_dataset("json", data_files=batch_files, features=_dataset_features())
    shutil.rmtree(batches_dir)

    # Get storage backend and save
    storage = get_storage(repo_id=settings.hub.repo_id)
    storage.save_dataset(ds, "dataset")

    elapsed = time.time() - stage_start
    LOGGER.info(
        "✅ Extract complete | docs=%d | failures=%d | duration=%s",
        doc_count,
        len(failures),
        _format_duration(elapsed),
    )


def run_stage_describe(settings: DescribeSettings) -> None:
    """Describe figures in the dataset that lack descriptions."""
    stage_start = time.time()
    LOGGER.info("⏳ Starting DESCRIBE stage...")

    # Get source storage and load dataset
    source_storage = get_source_storage(
        source_repo_id=settings.source_repo_id or settings.hub.repo_id
    )
    if not source_storage.is_configured:
        raise ValueError(
            "No source configured for describe stage (set SOURCE_REPO_ID, HF_REPO_ID, or S3_INPUT_URI)"
        )

    dataset = source_storage.load_dataset()
    if dataset is None:
        raise RuntimeError("Failed to load source dataset for describe stage")

    settings.output_dir.mkdir(parents=True, exist_ok=True)
    desc_dir = settings.output_dir / "descriptions"
    if desc_dir.exists():
        shutil.rmtree(desc_dir)
    desc_dir.mkdir(parents=True, exist_ok=True)

    chunk_size = settings.inference.batch_size
    failures: List[Dict[str, Any]] = []
    contexts: List[Dict[str, Any]] = []
    requests: List[Dict[str, Any]] = []
    batch_idx = 0
    described = 0

    def flush():
        nonlocal contexts, requests, batch_idx, described
        if not contexts:
            return

        results = []
        try:
            responses = settings.client.infer(requests)
            for i, ctx in enumerate(contexts):
                desc = responses[i].strip() if i < len(responses) else ""
                if desc:
                    results.append({"figure_id": ctx["figure_id"], "description": desc})
                    described += 1
        except Exception as exc:
            LOGGER.exception("Describe batch failed")
            for ctx in contexts:
                failures.append({"figure_id": ctx.get("figure_id"), "error": str(exc)})
        finally:
            for ctx in contexts:
                if hasattr(ctx.get("image"), "close"):
                    ctx["image"].close()
            contexts, requests = [], []

        if results:
            with (desc_dir / f"batch_{batch_idx:05d}.jsonl").open("w") as f:
                for r in results:
                    f.write(json.dumps(r) + "\n")
            batch_idx += 1

    # Queue figures needing descriptions
    pending = 0
    for row in dataset:
        sample_id = row["sample_id"]
        metas = row.get("extracted_figures_metadata") or []
        images = row.get("extracted_figures") or []

        for i, meta_json in enumerate(metas):
            meta = json.loads(meta_json) if isinstance(meta_json, str) else meta_json
            if meta.get("description"):
                continue

            pending += 1
            fig_id = meta.get("figure_id", "")

            if i >= len(images) or images[i] is None:
                failures.append(
                    {
                        "sample_id": sample_id,
                        "figure_id": fig_id,
                        "reason": "missing_image",
                    }
                )
                continue

            fig_img = images[i]
            contexts.append(
                {"sample_id": sample_id, "figure_id": fig_id, "image": fig_img}
            )
            requests.append(
                {
                    "image": fig_img,
                    "prompt": settings.prompt,
                    "max_tokens": settings.max_tokens,
                    "temperature": settings.temperature,
                    "request_timeout": settings.inference.request_timeout,
                }
            )

            if len(requests) >= chunk_size:
                flush()

    flush()

    if pending == 0:
        LOGGER.info("No figures need descriptions")
        return

    # Load descriptions and apply to dataset
    lookup = {}
    for f in sorted(desc_dir.glob("batch_*.jsonl")):
        for line in f.read_text().splitlines():
            if line.strip():
                r = json.loads(line)
                lookup[r["figure_id"]] = r["description"]

    if not lookup:
        LOGGER.info("No descriptions generated")
        return

    LOGGER.info(
        "Lookup has %d descriptions, first few: %s",
        len(lookup),
        list(lookup.keys())[:3],
    )

    def apply(row):
        metas = row.get("extracted_figures_metadata") or []
        new_metas = []
        for m in metas:
            meta = json.loads(m) if isinstance(m, str) else m
            if meta.get("figure_id") in lookup:
                meta["description"] = lookup[meta["figure_id"]]
            new_metas.append(json.dumps(meta))
        return {"extracted_figures_metadata": new_metas}

    # Don't pass features - let map infer them
    updated = dataset.map(apply)
    shutil.rmtree(desc_dir)

    # Verify before saving
    test_meta = updated[0]["extracted_figures_metadata"]
    if test_meta:
        test_parsed = (
            json.loads(test_meta[0]) if isinstance(test_meta[0], str) else test_meta[0]
        )
        LOGGER.info(
            "VERIFY before save - description present: %s",
            test_parsed.get("description") is not None,
        )

    # Get output storage and save
    storage = get_storage(repo_id=settings.hub.repo_id)
    storage.save_dataset(updated, "dataset")

    elapsed = time.time() - stage_start
    LOGGER.info(
        "✅ Describe complete | described=%d | failures=%d | duration=%s",
        described,
        len(failures),
        _format_duration(elapsed),
    )


def run_stage_assemble(settings: AssembleSettings) -> None:
    """Enrich markdown with figure descriptions."""
    stage_start = time.time()
    LOGGER.info("⏳ Starting ASSEMBLE stage...")

    # Get source storage and load dataset
    source_storage = get_source_storage(
        source_repo_id=settings.source_repo_id or settings.hub.repo_id
    )
    if not source_storage.is_configured:
        raise ValueError(
            "No source configured for assemble stage (set SOURCE_REPO_ID, HF_REPO_ID, or S3_INPUT_URI)"
        )

    dataset = source_storage.load_dataset()
    if dataset is None:
        raise RuntimeError("Failed to load source dataset for assemble stage")

    assembled_count = 0

    def assemble(row):
        nonlocal assembled_count
        markdown = row.get("document_markdown") or ""
        if not markdown:
            return row

        # Parse figure metadata for description lookup
        desc_map = {}
        for m in row.get("extracted_figures_metadata") or []:
            meta = json.loads(m) if isinstance(m, str) else m
            if meta.get("figure_id"):
                desc_map[meta["figure_id"]] = meta

        # Enrich with captions (keeps figure: URIs, adds descriptions)
        # Images are rendered on-demand using render_sample_markdown()
        final_markdown = enrich_markdown_with_captions(markdown, desc_map)

        row["document_final_markdown"] = final_markdown
        assembled_count += 1
        return row

    dataset = dataset.map(assemble)

    # Get output storage and save
    storage = get_storage(repo_id=settings.hub.repo_id)
    storage.save_dataset(dataset, "dataset")

    elapsed = time.time() - stage_start
    LOGGER.info(
        "✅ Assemble complete | assembled=%d | duration=%s",
        assembled_count,
        _format_duration(elapsed),
    )
