# Editing Datasets in Data Studio

Data Studio lets you edit dataset values directly in the browser, then commit those edits back to your repo — no re-upload required.

Cell editing is available when:

- You have **write access** to the dataset repository.
- The selected split is backed by a single `.csv`, `.tsv`, or `.parquet` file.

## Enter edit mode

Click **Toggle Edit Mode** to start editing the current split.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-toggle-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-toggle-dark.png"/>
</div>

## Edit and stage changes

In edit mode, editable cells show an edit action.
You can edit **string**, **number**, and **boolean** values (including setting values to `null`).

Edits are staged locally first and shown as an unsaved-changes counter, so you can review everything before committing.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-csv-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-csv-dark.png"/>
</div>

## Commit your edits

Click **Commit**, update the commit message if needed, and confirm.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-commit-modal-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/cell-editing-commit-modal-dark.png"/>
</div>

> [!TIP]
> Commits are optimized for large files: Data Studio computes the exact edited byte ranges and commits only those changes instead of rewriting the full file. Storage and upload on the Hub are handled efficiently with Xet-backed chunking and deduplication.

## Discard staged edits

You can leave edit mode at any time. If you don't want to keep your staged edits, discard them before exiting edit mode.
