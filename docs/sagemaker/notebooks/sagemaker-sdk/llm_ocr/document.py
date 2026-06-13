"""Document processing: markdown extraction, figure handling, and caption enrichment."""

from __future__ import annotations

import ast
import base64
import json
import logging
import re
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, List, Tuple

import numpy as np
from PIL import Image, ImageDraw, ImageFont

from .config import FigureMetadata

LOGGER = logging.getLogger(__name__)

GROUNDING_PATTERN = re.compile(
    r"<\|ref\|>(.*?)<\|/ref\|><\|det\|>(.*?)<\|/det\|>",
    re.DOTALL,
)

# Matches both old path format and new figure: URI format
FIGURE_MARKDOWN_PATTERN = re.compile(
    r"!\[(?:Figure )?(?P<figure_id>[^\]]+)\]\((?P<path>[^)]+)\)"
)


def encode_image(image: Image.Image) -> str:
    """Encode a PIL Image to base64 PNG string."""
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def extract_grounding_blocks(text: str) -> List[Dict[str, Any]]:
    """Extract grounding blocks (ref/det tags) from model response."""
    matches: List[Dict[str, Any]] = []
    for match in GROUNDING_PATTERN.finditer(text):
        label = match.group(1).strip()
        coords_text = match.group(2).strip()
        coordinates = None
        if coords_text:
            try:
                coordinates = ast.literal_eval(coords_text)
            except Exception:
                coordinates = None
        matches.append(
            {
                "label": label,
                "coordinates": coordinates,
                "raw": match.group(0),
                "span": match.span(),
            }
        )
    return matches


def postprocess_markdown(text: str) -> str:
    """Clean up markdown text from model output."""
    cleaned = (
        text.replace("\\coloneqq", ":=")
        .replace("\\eqqcolon", "=:")
        .replace("<|image_pad|>", "")
    )
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned.strip()


def apply_replacements(text: str, replacements: List[Tuple[int, int, str]]) -> str:
    """Apply text replacements at specified spans."""
    if not replacements:
        return postprocess_markdown(text)
    sorted_replacements = sorted(replacements, key=lambda item: item[0])
    segments: List[str] = []
    cursor = 0
    for start, end, replacement in sorted_replacements:
        segments.append(text[cursor:start])
        segments.append(replacement)
        cursor = end
    segments.append(text[cursor:])
    return postprocess_markdown("".join(segments))


def crop_figure(
    image: Image.Image,
    sample_id: str,
    figure_index: int,
    pixel_box: List[int],
    label: str,
) -> Tuple[FigureMetadata, Image.Image]:
    """Crop a figure region from the source image.

    Args:
        pixel_box: [x1, y1, x2, y2] bounding box in pixels

    Returns:
        (metadata, cropped_image) tuple for embedding in dataset
    """
    x1, y1, x2, y2 = pixel_box
    crop = image.crop((x1, y1, x2, y2)).copy()

    figure_id = f"{sample_id}_fig{figure_index:02d}"

    metadata = FigureMetadata(
        figure_id=figure_id,
        label=label,
        bounding_box_pixels={"x1": x1, "y1": y1, "x2": x2, "y2": y2},
    )

    return metadata, crop


def write_text(path: Path, content: str) -> None:
    """Write text content to a file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def write_json(path: Path, payload: Any) -> None:
    """Write JSON content to a file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)


def build_document_markdown(
    image: Image.Image,
    response_text: str,
    sample_id: str,
) -> Tuple[str, List[FigureMetadata], List[Image.Image], Image.Image]:
    """Process model response to extract markdown and figures.

    Returns:
        (markdown, figure_metadata, figure_images, annotated_image) tuple
    """
    blocks = extract_grounding_blocks(response_text)
    replacements: List[Tuple[int, int, str]] = []
    figures: List[FigureMetadata] = []
    figure_images: List[Image.Image] = []
    figure_index = 1

    img_draw = image.copy()
    draw = ImageDraw.Draw(img_draw)
    overlay = Image.new("RGBA", img_draw.size, (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    font = ImageFont.load_default()

    width, height = image.size

    for block in blocks:
        label = block["label"].lower()
        start, end = block["span"]

        # Random color for this block
        color = (
            np.random.randint(0, 200),
            np.random.randint(0, 200),
            np.random.randint(0, 255),
        )
        color_alpha = color + (20,)

        # Convert normalized coords to pixels
        raw_box = block["coordinates"][0]
        x1 = int(raw_box[0] / 999 * width)
        y1 = int(raw_box[1] / 999 * height)
        x2 = int(raw_box[2] / 999 * width)
        y2 = int(raw_box[3] / 999 * height)
        pixel_box = (x1, y1, x2, y2)

        # Extract figures (images)
        if label == "image":
            metadata, crop = crop_figure(
                image=image,
                sample_id=sample_id,
                figure_index=figure_index,
                pixel_box=pixel_box,
                label=block["label"],
            )
            figures.append(metadata)
            figure_images.append(crop)
            # Use figure:{id} URI format - clearly an identifier, not a file path
            replacements.append(
                (
                    start,
                    end,
                    f"![{metadata.figure_id}](figure:{metadata.figure_id})",
                )
            )
            figure_index += 1
        else:
            replacements.append((start, end, ""))

        # Draw bounding box
        box_width = 4 if label == "title" else 2
        draw.rectangle([x1, y1, x2, y2], outline=color, width=box_width)
        draw_overlay.rectangle([x1, y1, x2, y2], fill=color_alpha)

        # Draw label
        text_x, text_y = x1, max(0, y1 - 15)
        text_bbox = draw.textbbox((0, 0), label, font=font)
        text_w, text_h = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
        draw.rectangle(
            [text_x, text_y, text_x + text_w, text_y + text_h], fill=(255, 255, 255, 30)
        )
        draw.text((text_x, text_y), label, font=font, fill=color)

    img_draw.paste(overlay, (0, 0), overlay)
    markdown = apply_replacements(response_text, replacements)
    return markdown, figures, figure_images, img_draw


def _truncate_for_alt(description: str, max_length: int = 120) -> str:
    """Create a short alt text from a description (first sentence, truncated)."""
    # Take first sentence
    first_sentence = description.split(". ")[0].split(".\n")[0]
    if len(first_sentence) <= max_length:
        return first_sentence.strip()
    # Truncate at word boundary
    truncated = first_sentence[:max_length].rsplit(" ", 1)[0]
    return truncated.strip() + "..."


def enrich_markdown_with_captions(
    markdown: str,
    description_map: Dict[str, Dict[str, Any]],
) -> str:
    """Add figure captions to markdown. Alt text is truncated; full description below."""
    used: set[str] = set()

    def replace(match: re.Match[str]) -> str:
        alt_text = match.group("figure_id").strip()
        path = match.group("path").strip()

        # Extract figure_id from figure:{id} URI or from alt text
        if path.startswith("figure:"):
            figure_id = path[7:]  # Remove "figure:" prefix
        else:
            # Legacy format - figure_id is in alt text after "Figure "
            figure_id = alt_text.replace("Figure ", "").split(":")[0].strip()

        entry = description_map.get(figure_id)
        if not entry:
            return match.group(0)

        description = (entry.get("description") or "").strip()
        if not description:
            return match.group(0)

        # Alt text: short summary (first sentence, max 120 chars)
        short_alt = _truncate_for_alt(description)

        # Image tag with short alt text
        rendered = f"![{figure_id}: {short_alt}]({path})"

        # Add full caption below (only once per figure)
        if figure_id not in used:
            rendered += f"\n\n*Figure {figure_id}: {description}*\n"
            used.add(figure_id)
        return rendered

    return FIGURE_MARKDOWN_PATTERN.sub(replace, markdown)


def render_markdown_with_images(
    markdown: str,
    figure_images: List[Image.Image],
    figure_metadata: List[Dict[str, Any]],
) -> str:
    """Replace figure:{id} URIs in markdown with base64-encoded images."""
    # Build figure_id -> image mapping
    id_to_image: Dict[str, Image.Image] = {}
    for i, meta in enumerate(figure_metadata):
        fig_id = meta.get("figure_id", "")
        if fig_id and i < len(figure_images) and figure_images[i] is not None:
            id_to_image[fig_id] = figure_images[i]

    def replace(match: re.Match[str]) -> str:
        alt_text = match.group("figure_id").strip()
        path = match.group("path").strip()

        # Extract figure_id from figure:{id} URI or use alt_text as fallback
        if path.startswith("figure:"):
            figure_id = path[7:]  # Remove "figure:" prefix
        else:
            # Legacy path format - extract figure_id from alt_text
            figure_id = alt_text.replace("Figure ", "").split(":")[0].strip()

        img = id_to_image.get(figure_id)
        if img is None:
            return match.group(0)  # Keep original if image not found

        # Embed as base64 data URI
        data_uri = f"data:image/png;base64,{encode_image(img)}"
        return f"![{alt_text}]({data_uri})"

    return FIGURE_MARKDOWN_PATTERN.sub(replace, markdown)


def render_sample_markdown(sample: Dict[str, Any]) -> str:
    """Render dataset sample's markdown with embedded base64 images."""
    markdown = (
        sample.get("document_final_markdown") or sample.get("document_markdown") or ""
    )

    # Parse metadata
    raw_metadata = sample.get("extracted_figures_metadata") or []
    metadata = []
    for m in raw_metadata:
        if isinstance(m, str):
            metadata.append(json.loads(m))
        else:
            metadata.append(m)

    images = sample.get("extracted_figures") or []

    return render_markdown_with_images(
        markdown=markdown,
        figure_images=images,
        figure_metadata=metadata,
    )


def display_markdown(sample: Dict[str, Any]) -> None:
    """Display sample's markdown with embedded images in Jupyter."""
    from IPython.display import display, Markdown

    rendered = render_sample_markdown(sample)
    display(Markdown(rendered))


def display_samples(dataset, num_samples: int = 2) -> None:
    """Display samples with source images, markdown, and figure descriptions."""
    from IPython.display import display

    print(f"Dataset: {len(dataset)} samples")
    print(f"Columns: {list(dataset.column_names)}")
    print()

    for i in range(min(num_samples, len(dataset))):
        sample = dataset[i]
        print(f"=== Sample {i}: {sample.get('sample_id', i)} ===")

        # Show source image
        if sample.get("source_image"):
            print("Source image:")
            img = sample["source_image"]
            img.thumbnail((500, 500))  # Resize to max 500px
            display(img)

        # Show markdown preview
        md = sample.get("document_markdown") or sample.get("document_markdown_text", "")
        if md:
            print(f"\nMarkdown preview ({len(md)} chars):")
            print(md[:500] + "..." if len(md) > 500 else md)

        # Show final markdown if available
        final_md = sample.get("document_final_markdown") or sample.get(
            "document_final_markdown_text", ""
        )
        if final_md:
            print(f"\nFinal markdown preview ({len(final_md)} chars):")
            print(final_md[:500] + "..." if len(final_md) > 500 else final_md)

        # Show figures and their descriptions
        figures = sample.get("extracted_figures", [])
        metadata = sample.get("extracted_figures_metadata", [])
        if figures:
            print(f"\nExtracted figures: {len(figures)}")
            for j, fig in enumerate(figures[:2]):  # Show max 2 figures
                fig.thumbnail((500, 500))
                display(fig)
                # Show figure description if available
                if j < len(metadata):
                    try:
                        meta = (
                            json.loads(metadata[j])
                            if isinstance(metadata[j], str)
                            else metadata[j]
                        )
                        if meta.get("description"):
                            print(f"  📝 Description: {meta['description'][:200]}...")
                    except Exception:
                        pass
        print()
