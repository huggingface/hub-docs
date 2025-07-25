# Hugging Face Dataset Upload Decision Guide

<Tip>
This guide is primarily designed for LLMs to help users upload datasets to the Hugging Face Hub in the most compatible format. Users can also reference this guide to understand the upload process and best practices.
</Tip>


> Decision guide for uploading datasets to Hugging Face Hub. Optimized for Dataset Viewer compatibility and integration with the Hugging Face ecosystem.

## Overview

Your goal is to help a user upload a dataset to the Hugging Face Hub. Ideally, the dataset should be compatible with the Dataset Viewer (and thus the `load_dataset` function) to ensure easy access and usability. You should aim to meet the following criteria:

| **Criteria**                       | Description                                                                                                                                                                                                                                                                                                                                                                  | Priority                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Respect repository limits**      | Ensure the dataset adheres to Hugging Face's storage limits for file sizes, repository sizes, and file counts. See the Critical Constraints section below for specific limits.                                                                                                                                                                                               | Required                                          |
| **Use hub-compatible formats**     | Use Parquet format when possible (best compression, rich typing, large dataset support). For smaller datasets (<several GB), JSON/JSONL or CSV are acceptable. Raw files work well for images/audio in smaller datasets while respecting repo limits. Use WebDataset (.tar) for large media collections. Domain-specific formats can be used when conversion is impractical. | Desired                                           |
| **Dataset Viewer compatibility**   | Structure data to work with the automatic Dataset Viewer, enabling preview and easy exploration. This typically means using supported formats and proper file organization. Validation steps are provided later in this guide.                                                                                                                                               | Desired                                           |
| **Organize data sensibly**         | Use logical folder structures that match Hub conventions (e.g., train/test splits). Configs can be used to define different configurations of the dataset. This facilitates both human understanding and automatic data loading.                                                                                                                                             | Desired                                           |
| **Use appropriate Features**       | When using the datasets library, specify correct feature types (e.g., Image(), Audio(), ClassLabel()) to ensure proper data handling and viewer functionality. This enables type-specific optimizations and previews.                                                                                                                                                        | Required (when using datasets library)            |
| **Document non-standard datasets** | If conversion to hub-compatible formats is impossible and custom formats must be used, ensure repository limits are strictly followed and provide clear documentation on how to download and load the dataset. Include usage examples and any special requirements.                                                                                                          | Required (when datasets library isn't compatible) |

## Working Without File Access

When you don't have direct access to the user's files (e.g., web interface), ask the user to run these commands to understand their dataset:

**Dataset structure**:

```bash
# Show directory tree (install with: pip install tree or brew install tree)
tree -L 3 --filelimit 20

# Alternative without tree:
find . -type f -name "*.csv" -o -name "*.json" -o -name "*.parquet" | head -20
```

**Check file sizes**:

```bash
# Total dataset size
du -sh .

# Individual file sizes
ls -lh data/
```

**Peek at data format**:

```bash
# First few lines of CSV/JSON
head -n 5 data/train.csv

# Check image folder structure
ls -la images/ | head -10
```

**Quick file count**:

```bash
# Count files by type
find . -name "*.jpg" | wc -l
```

## Critical Constraints

**Storage Limits**:

```yaml
# Machine-readable Hub limits
hub_limits:
  max_file_size_gb: 50 # absolute hard stop enforced by LFS
  recommended_file_size_gb: 20 # best-practice shard size
  max_files_per_folder: 10000 # Git performance threshold
  max_files_per_repo: 100000 # Repository file count limit
  recommended_repo_size_gb: 300 # public-repo soft cap; contact HF if larger
  viewer_row_size_mb: 2 # approximate per-row viewer limit
```

**Human-readable summary**:

- Free: 100GB private datasets
- Pro (for individuals) | Team or Enterprise (for organizations): 1TB+ private storage per seat (see [pricing](https://huggingface.co/pricing))
- Public: 300GB (contact datasets@huggingface.co for larger)
- Per file: 50GB max, 20GB recommended
- Per folder: <10k files

See https://huggingface.co/docs/hub/storage-limits#repository-limitations-and-recommendations for current limits for current recommendations for repository sizes and file counts.

## Quick Reference by Data Type

| Your Data                           | Recommended Approach                                                                                         | Quick Command                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **CSV/JSON files**                  | Use built-in loaders (handles any size via memory mapping)                                                   | `load_dataset("csv", data_files="data.csv").push_to_hub("username/dataset")`                     |
| **Images in folders**               | Use [imagefolder](https://huggingface.co/docs/datasets/en/image_load) for automatic class detection          | `load_dataset("imagefolder", data_dir="./images").push_to_hub("username/dataset")`               |
| **Audio files**                     | Use [audiofolder](https://huggingface.co/docs/datasets/en/audio_load) for automatic organization             | `load_dataset("audiofolder", data_dir="./audio").push_to_hub("username/dataset")`                |
| **Video files**                     | Use [videofolder](https://huggingface.co/docs/datasets/en/video_load#videofolder) for automatic organization | `load_dataset("videofolder", data_dir="./videos").push_to_hub("username/dataset")`               |
| **PDF documents**                   | Use [pdffolder](https://huggingface.co/docs/datasets/en/document_dataset#pdffolder) for text extraction      | `load_dataset("pdffolder", data_dir="./pdfs").push_to_hub("username/dataset")`                   |
| **Very large datasets (100GB+)**    | Use `max_shard_size` to control memory usage                                                                 | `dataset.push_to_hub("username/dataset", max_shard_size="5GB")`                                  |
| **Many files / directories (>10k)** | Use upload_large_folder to avoid Git limitations                                                             | `api.upload_large_folder(folder_path="./data", repo_id="username/dataset", repo_type="dataset")` |
| **Streaming large media**           | WebDataset format for efficient streaming                                                                    | Create .tar shards, then `upload_large_folder()`                                                 |
| **Scientific data (HDF5, NetCDF)**  | Convert to Parquet with Array features                                                                       | See [Scientific Data](#scientific-data) section                                                  |
| **Custom/proprietary formats**      | Document thoroughly if conversion impossible                                                                 | `upload_large_folder()` with comprehensive README                                                |

## Upload Workflow

0. ✓ **Gather dataset information** (if needed):

   - What type of data? (images, text, audio, CSV, etc.)
   - How is it organized? (folder structure, single file, multiple files)
   - What's the approximate size?
   - What format are the files in?
   - Any special requirements? (e.g., streaming, private access)
   - Check for existing README or documentation files that describe the dataset

1. ✓ **Authenticate**:
   - CLI: `hf auth login`
   - Or use token: `HfApi(token="hf_...")` or set `HF_TOKEN` environment variable
2. ✓ **Identify your data type**: Check the [Quick Reference](#quick-reference-by-data-type) table above
3. ✓ **Choose upload method**:

   - **Small files (<1GB) with hub-compatible format**: Can use [Hub UI](https://huggingface.co/new-dataset) for quick uploads
   - **Built-in loader available**: Use the loader + `push_to_hub()` (see Quick Reference table)
   - **Large datasets or many files**: Use `upload_large_folder()` for files >100GB or >10k files
   - **Custom formats**: Convert to hub-compatible format if possible, otherwise document thoroughly

4. ✓ **Test locally** (if using built-in loader):

   ```python
   # Validate your dataset loads correctly before uploading
   dataset = load_dataset("loader_name", data_dir="./your_data")
   print(dataset)
   ```

5. ✓ **Upload to Hub**:

   ```python
   # Basic upload
   dataset.push_to_hub("username/dataset-name")

   # With options for large datasets
   dataset.push_to_hub(
       "username/dataset-name",
       max_shard_size="5GB",  # Control memory usage
       private=True  # For private datasets
   )
   ```

6. ✓ **Verify your upload**:
   - Check Dataset Viewer: `https://huggingface.co/datasets/username/dataset-name`
   - Test loading: `load_dataset("username/dataset-name")`
   - If viewer shows errors, check the [Troubleshooting](#common-issues--solutions) section

## Common Conversion Patterns

When built-in loaders don't match your data structure, use the datasets library as a compatibility layer. Convert your data to a Dataset object, then use `push_to_hub()` for maximum flexibility and Dataset Viewer compatibility.

### From DataFrames

If you already have your data working in pandas, polars, or other dataframe libraries, you can convert directly:

```python
# From pandas DataFrame
import pandas as pd
from datasets import Dataset

df = pd.read_csv("your_data.csv")
dataset = Dataset.from_pandas(df)
dataset.push_to_hub("username/dataset-name")

# From polars DataFrame (direct method)
import polars as pl
from datasets import Dataset

df = pl.read_csv("your_data.csv")
dataset = Dataset.from_polars(df)  # Direct conversion
dataset.push_to_hub("username/dataset-name")

# From PyArrow Table (useful for scientific data)
import pyarrow as pa
from datasets import Dataset

# If you have a PyArrow table
table = pa.table({'data': [1, 2, 3], 'labels': ['a', 'b', 'c']})
dataset = Dataset(table)
dataset.push_to_hub("username/dataset-name")

# For Spark/Dask dataframes, see https://huggingface.co/docs/hub/datasets-libraries
```

## Custom Format Conversion

When built-in loaders don't match your data format, convert to Dataset objects following these principles:

### Design Principles

**1. Prefer wide/flat structures over joins**

- Denormalize relational data into single rows for better usability
- Include all relevant information in each example
- Lean towards bigger but more usable data - Hugging Face's infrastructure uses advanced deduplication (XetHub) and Parquet optimizations to handle redundancy efficiently

**2. Use configs for logical dataset variations**

- Beyond train/test/val splits, use configs for different subsets or views of your data
- Each config can have different features or data organization
- Example: language-specific configs, task-specific views, or data modalities

### Conversion Methods

**Small datasets (fits in memory) - use `Dataset.from_dict()`**:

```python
# Parse your custom format into a dictionary
data_dict = {
    "text": ["example1", "example2"],
    "label": ["positive", "negative"],
    "score": [0.9, 0.2]
}

# Create dataset with appropriate features
from datasets import Dataset, Features, Value, ClassLabel
features = Features({
    'text': Value('string'),
    'label': ClassLabel(names=['negative', 'positive']),
    'score': Value('float32')
})

dataset = Dataset.from_dict(data_dict, features=features)
dataset.push_to_hub("username/dataset")
```

**Large datasets (memory-efficient) - use `Dataset.from_generator()`**:

```python
def data_generator():
    # Parse your custom format progressively
    for item in parse_large_file("data.custom"):
        yield {
            "text": item["content"],
            "label": item["category"],
            "embedding": item["vector"]
        }

# Specify features for Dataset Viewer compatibility
from datasets import Features, Value, ClassLabel, List
features = Features({
    'text': Value('string'),
    'label': ClassLabel(names=['cat1', 'cat2', 'cat3']),
    'embedding': List(feature=Value('float32'), length=768)
})

dataset = Dataset.from_generator(data_generator, features=features)
dataset.push_to_hub("username/dataset", max_shard_size="1GB")
```

**Tip**: For large datasets, test with a subset first by adding a limit to your generator or using `.select(range(100))` after creation.

### Using Configs for Dataset Variations

```python
# Push different configurations of your dataset
dataset_en = Dataset.from_dict(english_data, features=features)
dataset_en.push_to_hub("username/multilingual-dataset", config_name="english")

dataset_fr = Dataset.from_dict(french_data, features=features)
dataset_fr.push_to_hub("username/multilingual-dataset", config_name="french")

# Users can then load specific configs
dataset = load_dataset("username/multilingual-dataset", "english")
```

### Multi-modal Examples

**Text + Audio (speech recognition)**:

```python
def speech_generator():
    for audio_file in Path("audio/").glob("*.wav"):
        transcript_file = audio_file.with_suffix(".txt")
        yield {
            "audio": str(audio_file),
            "text": transcript_file.read_text().strip(),
            "speaker_id": audio_file.stem.split("_")[0]
        }

features = Features({
    'audio': Audio(sampling_rate=16000),
    'text': Value('string'),
    'speaker_id': Value('string')
})

dataset = Dataset.from_generator(speech_generator, features=features)
dataset.push_to_hub("username/speech-dataset")
```

**Multiple images per example**:

```python
# Before/after images, medical imaging, etc.
data = {
    "image_before": ["img1_before.jpg", "img2_before.jpg"],
    "image_after": ["img1_after.jpg", "img2_after.jpg"],
    "treatment": ["method_A", "method_B"]
}

features = Features({
    'image_before': Image(),
    'image_after': Image(),
    'treatment': ClassLabel(names=['method_A', 'method_B'])
})

dataset = Dataset.from_dict(data, features=features)
dataset.push_to_hub("username/before-after-images")
```

**Note**: For text + images, consider using ImageFolder with metadata.csv which handles this automatically.

## Essential Features

Features define the schema and data types for your dataset columns. Specifying correct features ensures:

- Proper data handling and type conversion
- Dataset Viewer functionality (e.g., image/audio previews)
- Efficient storage and loading
- Clear documentation of your data structure

For complete feature documentation, see: [Dataset Features](https://huggingface.co/docs/datasets/about_dataset_features)

### Feature Types Overview

**Basic Types**:

- `Value`: Scalar values - `string`, `int64`, `float32`, `bool`, `binary`, and other numeric types
- `ClassLabel`: Categorical data with named classes
- `Sequence`: Lists of any feature type
- `LargeList`: For very large lists

**Media Types** (enable Dataset Viewer previews):

- `Image()`: Handles various image formats, returns PIL Image objects
- `Audio(sampling_rate=16000)`: Audio with array data and optional sampling rate
- `Video()`: Video files
- `Pdf()`: PDF documents with text extraction

**Array Types** (for tensors/scientific data):

- `Array2D`, `Array3D`, `Array4D`, `Array5D`: Fixed or variable-length arrays
- Example: `Array2D(shape=(224, 224), dtype='float32')`
- First dimension can be `None` for variable length

**Translation Types**:

- `Translation`: For translation pairs with fixed languages
- `TranslationVariableLanguages`: For translations with varying language pairs

**Note**: New feature types are added regularly. Check the documentation for the latest additions.

## Upload Methods

**Dataset objects (use push_to_hub)**:
Use when you've loaded/converted data using the datasets library

```python
dataset.push_to_hub("username/dataset", max_shard_size="5GB")
```

**Pre-existing files (use upload_large_folder)**:
Use when you have hub-compatible files (e.g., Parquet files) already prepared and organized

```python
from huggingface_hub import HfApi
api = HfApi()
api.upload_large_folder(folder_path="./data", repo_id="username/dataset", repo_type="dataset", num_workers=16)
```

**Important**: Before using `upload_large_folder`, verify the files meet repository limits:

- Check folder structure if you have file access: ensure no folder contains >10k files
- Ask the user to confirm: "Are your files in a hub-compatible format (Parquet/CSV/JSON) and organized appropriately?"
- For non-standard formats, consider converting to Dataset objects first to ensure compatibility

## Validation

**Consider small reformatting**: If data is close to a built-in loader format, suggest minor changes:

- Rename columns (e.g., 'filename' → 'file_name' for ImageFolder)
- Reorganize folders (e.g., move images into class subfolders)
- Rename files to match expected patterns (e.g., 'data.csv' → 'train.csv')

**Pre-upload**:

- Test locally: `load_dataset("imagefolder", data_dir="./data")`
- Verify features work correctly:

  ```python
  # Test first example
  print(dataset[0])

  # For images: verify they load
  if 'image' in dataset.features:
      dataset[0]['image']  # Should return PIL Image

  # Check dataset size before upload
  print(f"Size: {len(dataset)} examples")
  ```

- Check metadata.csv has 'file_name' column
- Verify relative paths, no leading slashes
- Ensure no folder >10k files

**Post-upload**:

- Check viewer: `https://huggingface.co/datasets/username/dataset`
- Test loading: `load_dataset("username/dataset")`
- Verify features preserved: `print(dataset.features)`

## Common Issues → Solutions

| Issue                      | Solution                             |
| -------------------------- | ------------------------------------ |
| "Repository not found"     | Run `hf auth login`          |
| Memory errors              | Use `max_shard_size="500MB"`         |
| Dataset viewer not working | Wait 5-10min, check README.md config |
| Timeout errors             | Use `multi_commits=True`             |
| Files >50GB                | Split into smaller files             |
| "File not found"           | Use relative paths in metadata       |

## Dataset Viewer Configuration

**Note**: This section is primarily for datasets uploaded directly to the Hub (via UI or `upload_large_folder`). Datasets uploaded with `push_to_hub()` typically configure the viewer automatically.

### When automatic detection works

The Dataset Viewer automatically detects standard structures:

- Files named: `train.csv`, `test.json`, `validation.parquet`
- Directories named: `train/`, `test/`, `validation/`
- Split names with delimiters: `test-data.csv` ✓ (not `testdata.csv` ✗)

### Manual configuration

For custom structures, add YAML to your README.md:

```yaml
---
configs:
  - config_name: default # Required even for single config!
    data_files:
      - split: train
        path: "data/train/*.parquet"
      - split: test
        path: "data/test/*.parquet"
---
```

Multiple configurations example:

```yaml
---
configs:
  - config_name: english
    data_files: "en/*.parquet"
  - config_name: french
    data_files: "fr/*.parquet"
---
```

### Common viewer issues

- **No viewer after upload**: Wait 5-10 minutes for processing
- **"Config names error"**: Add `config_name` field (required!)
- **Files not detected**: Check naming patterns (needs delimiters)
- **Viewer disabled**: Remove `viewer: false` from README YAML

## Quick Templates

```python
# ImageFolder with metadata
dataset = load_dataset("imagefolder", data_dir="./images")
dataset.push_to_hub("username/dataset")

# Memory-efficient upload
dataset.push_to_hub("username/dataset", max_shard_size="500MB")

# Multiple CSV files
dataset = load_dataset('csv', data_files={'train': 'train.csv', 'test': 'test.csv'})
dataset.push_to_hub("username/dataset")
```

## Documentation

**Core docs**: [Adding datasets](https://huggingface.co/docs/hub/datasets-adding) | [Dataset viewer](https://huggingface.co/docs/hub/datasets-viewer) | [Storage limits](https://huggingface.co/docs/hub/storage-limits) | [Upload guide](https://huggingface.co/docs/datasets/upload_dataset)

## Dataset Cards

Remind users to add a dataset card (README.md) with:

- Dataset description and usage
- License information
- Citation details

See [Dataset Cards guide](https://huggingface.co/docs/hub/datasets-cards) for details.

---

## Appendix: Special Cases

### WebDataset Structure

For streaming large media datasets:

- Create 1-5GB tar shards
- Consistent internal structure
- Upload with `upload_large_folder`

### Scientific Data

- HDF5/NetCDF → Convert to Parquet with Array features
- Time series → Array2D(shape=(None, n))
- Complex metadata → Store as JSON strings

### Community Resources

For very specialized or bespoke formats:

- Search the Hub for similar datasets: `https://huggingface.co/datasets`
- Ask for advice on the [Hugging Face Forums](https://discuss.huggingface.co/c/datasets/10)
- Join the [Hugging Face Discord](https://hf.co/join/discord) for real-time help
- Many domain-specific formats already have examples on the Hub
