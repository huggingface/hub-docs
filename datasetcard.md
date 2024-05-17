---
# Example metadata to be added to a dataset card.  
# Full dataset card template at https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/datasetcard_template.md
language:
- {lang_0}  # Example: fr
- {lang_1}  # Example: en
license: {license}  # Example: apache-2.0 or any license from https://hf.co/docs/hub/repositories-licenses
license_name: {license_name}  # If license = other (license not in https://hf.co/docs/hub/repositories-licenses), specify an id for it here, like `my-license-1.0`.
license_link: {license_link}  # If license = other, specify "LICENSE" or "LICENSE.md" to link to a file of that name inside the repo, or a URL to a remote file.
license_details: {license_details}  # Legacy, textual description of a custom license.
tags:
- {tag_0}  # Example: audio
- {tag_1}  # Example: bio
- {tag_2}  # Example: natural-language-understanding
- {tag_3}  # Example: birds-classification
annotations_creators:
- {creator}  # Example: crowdsourced, found, expert-generated, machine-generated
language_creators:
- {creator}  # Example: crowdsourced, ...
language_details:
- {bcp47_lang_0}  # Example: fr-FR
- {bcp47_lang_1}  # Example: en-US
pretty_name: {pretty_name}  # Example: SQuAD
size_categories:
- {number_of_elements_in_dataset}  # Example: n<1K, 100K<n<1M, …
source_datasets:
- {source_dataset_0}  # Example: wikipedia
- {source_dataset_1}  # Example: laion/laion-2b
task_categories:  # Full list at https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/pipelines.ts
- {task_0}  # Example: question-answering
- {task_1}  # Example: image-classification
task_ids:
- {subtask_0}  # Example: extractive-qa
- {subtask_1}  # Example: multi-class-image-classification
paperswithcode_id: {paperswithcode_id}  # Dataset id on PapersWithCode (from the URL). Example for SQuAD: squad
configs:  # Optional. This can be used to pass additional parameters to the dataset loader, such as `data_files`, `data_dir`, and any builder-specific parameters  
- config_name: {config_name_0}  # Example: default
  data_files:
  - split: {split_name_0}  # Example: train
    path: {file_path_0}  # Example: data.csv
  - split: {split_name_1}  # Example: test
    path: {file_path_1}   # Example: holdout.csv
- config_name: {config_name_1}  # Example: ...

# Optional. This part can be used to store the feature types and size of the dataset to be used in python. This can be automatically generated using the datasets-cli.
dataset_info:
  features:
    - name: {feature_name_0}    # Example: id
      dtype: {feature_dtype_0}  # Example: int32
    - name: {feature_name_1}    # Example: text
      dtype: {feature_dtype_1}  # Example: string
    - name: {feature_name_2}    # Example: image
      dtype: {feature_dtype_2}  # Example: image
    # Example for SQuAD:
    # - name: id
    #   dtype: string
    # - name: title
    #   dtype: string
    # - name: context
    #   dtype: string
    # - name: question
    #   dtype: string
    # - name: answers
    #   sequence:
    #     - name: text
    #       dtype: string
    #     - name: answer_start
    #       dtype: int32
  config_name: {config_name}  # Example for glue: sst2
  splits:
    - name: {split_name_0}                  # Example: train
      num_bytes: {split_num_bytes_0}        # Example for SQuAD: 79317110
      num_examples: {split_num_examples_0}  # Example for SQuAD: 87599
  download_size: {dataset_download_size}   # Example for SQuAD: 35142551
  dataset_size: {dataset_size}             # Example for SQuAD: 89789763

# It can also be a list of multiple configurations:
# ```yaml
# dataset_info:
#   - config_name: {config0}
#     features:
#       ...
#   - config_name: {config1}
#     features:
#       ...
# ```

# Optional. If you want your dataset to be protected behind a gate that users have to accept to access the dataset. More info at https://huggingface.co/docs/hub/datasets-gated
extra_gated_fields:
- {field_name_0}: {field_type_0}  # Example: Name: text
- {field_name_1}: {field_type_1}  # Example: Affiliation: text
- {field_name_2}: {field_type_2}  # Example: Email: text
- {field_name_3}: {field_type_3}  # Example for speech datasets: I agree to not attempt to determine the identity of speakers in this dataset: checkbox
extra_gated_prompt: {extra_gated_prompt}  # Example for speech datasets: By clicking on “Access repository” below, you also agree to not attempt to determine the identity of speakers in the dataset.

# Optional. Add this if you want to encode a train and evaluation info in a structured way for AutoTrain or Evaluation on the Hub
train-eval-index:
  - config: {config_name}           # The dataset config name to use. Example for datasets without configs: default. Example for glue: sst2
    task: {task_name}               # The task category name (same as task_category). Example: question-answering
    task_id: {task_type}            # The AutoTrain task id. Example: extractive_question_answering
    splits:
      train_split: train            # The split to use for training. Example: train
      eval_split: validation        # The split to use for evaluation. Example: test
    col_mapping:                    # The columns mapping needed to configure the task_id.
    # Example for extractive_question_answering:
      # question: question
      # context: context
      # answers:
      #   text: text
      #   answer_start: answer_start
    metrics:
      - type: {metric_type}         # The metric id. Example: wer. Use metric id from https://hf.co/metrics
        name: {metric_name}         # Tne metric name to be displayed. Example: Test WER
---

Valid license identifiers can be found in [our docs](https://huggingface.co/docs/hub/repositories-licenses).

For the full dataset card template, see: [datasetcard_template.md file](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/datasetcard_template.md).
