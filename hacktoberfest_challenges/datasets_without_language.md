# Datasets without language challenge

Related to https://github.com/huggingface/hub-docs/issues/986.

## Context

The Hugging Face Hub hosts hundreds of thousands of public models and datasets. These datasets and models cover a wide range of languages. One of the main ways in which it's possible to know what language a dataset is in is by looking at the `language` field in the dataset's [metadata](https://huggingface.co/docs/hub/datasets-cards#dataset-card-metadata)  section of the dataset card. 

```yaml
language: 
- "List of ISO 639-1 code for your language"
- lang1
pretty_name: "Pretty Name of the Dataset"
tags:
- tag1
- tag2
license: "any valid license identifier"
task_categories:
- task1
```

Having this field filled in is essential for users to find datasets in their language and give a better idea of the languages that the Hub covers. However, the dataset's author has only sometimes filled this field. This challenge is to fill in the `language` field for datasets that don't have it filled in.


## How to contribute?

How can you help improve the coverage of language metadata on the Hub?

For each dataset, the workflow is the following:

1. Find a dataset that doesn't have the `language` field filled in. You can find a list of datasets without the `language` field filled in [here](#datasets-without-language-field-filled-in). We start with datasets that have the most downloads and likes.
2. **Check that the dataset doesn't already have a PR to add a language tag(s).** Someone else may have already started working on it. You can check this by looking in the discussion section of the dataset page. 
3. If there is no PR to add language metadata already open, your next step is to identify the language (if possible for the dataset). There are a few main ways you can often identify the language
   1. The dataset's name. Often, the name of the dataset will include the language. Sometimes as a full name, i.e. `imdb_german` or sometimes as a language code, i.e. `imdb_de`. You can use that as the language tag if the dataset name includes the language.
   2. The dataset card will sometimes mention the language(s) of the dataset explicitly. 
   3. Many datasets will have an active [dataset viewer](https://huggingface.co/docs/hub/datasets-viewer) for the dataset. This will allow you to see examples from the dataset. You may identify the language by looking at the text examples. 
   4. Sometimes, the dataset will have a column specifying the language of the text. You can use this column to fill in the language tag(s).
   5. If the dataset viewer is available for the dataset, but you don't recognize the language, you can use the [facebook/fasttext-language-identification](https://huggingface.co/facebook/fasttext-language-identification) model or [Google Translate](https://translate.google.com/) to try to identify the language. 
4. Once you've identified the language(s) of the dataset, you can add the language tag(s) to the dataset card. You can do this by clicking the `Edit` button on the dataset card. This will open a PR to the dataset repo. You can add the language tag(s) to the `language` field in the dataset card. Some datasets may have multiple languages. Try and add all of the languages you have identified. 
5. Once done, open a PR on GitHub to update the table below. Once merged, this will count as a Hacktoberfest contribution! Add the `pr_url` (the one on the Hub) and a status (opened, merged, closed) in the PR. 
6. Adding a language tag to some of the datasets below may not make sense. If so, add `not relevant` as the link in the `pr_url`. There may also be datasets where you need help with the language. In these cases, you can open a discussion to suggest a language tag(s) is added to the dataset. 

## F.A.Q.

### Does it make sense to add language metadata to all datasets?

No! This is why we have focused on datasets with a `task_categories` field indicating that the dataset has a text-related task. 

### Can I use a script to automate the process?

While it is possible to use machine learning to help assist this process, see [this blog](https://huggingface.co/blog/huggy-lingo) as an example; checking the accuracy of the PRs you are making is still important. 

## What about datasets with multiple languages?

Some datasets may have more than one language. Do your best to add all the languages you can identify in the datasets. If there is a vast number, this may be tricky. In this case, do your best. 

## What about code? 

Currently, you can add a language tag for `code`. You will need to do this directly in the `YAML` rather than the visual editor since using the visual editor will lead to an auto-completion for the `co` language code (Corsican). 

## Datasets without language field filled in

| status   | pr_url   | hub_id                                                                                                                                                     |   downloads |   likes |
|----------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|---------|
|          |          | [sahil2801/CodeAlpaca-20k](https://huggingface.co/datasets/sahil2801/CodeAlpaca-20k)                                                                       |        2124 |     104 |
|          |          | [facebook/winoground](https://huggingface.co/datasets/facebook/winoground)                                                                                 |        5468 |      57 |
|          |          | [oscar-corpus/OSCAR-2301](https://huggingface.co/datasets/oscar-corpus/OSCAR-2301)                                                                         |        7814 |      56 |
|          |          | [MMInstruction/M3IT](https://huggingface.co/datasets/MMInstruction/M3IT)                                                                                   |       62902 |      47 |
|          |          | [huggan/wikiart](https://huggingface.co/datasets/huggan/wikiart)                                                                                           |         344 |      38 |
|          |          | [HuggingFaceH4/CodeAlpaca_20K](https://huggingface.co/datasets/HuggingFaceH4/CodeAlpaca_20K)                                                               |         850 |      36 |
|          |          | [codeparrot/self-instruct-starcoder](https://huggingface.co/datasets/codeparrot/self-instruct-starcoder)                                                   |         454 |      25 |
|          |          | [unaidedelf87777/openapi-function-invocations-25k](https://huggingface.co/datasets/unaidedelf87777/openapi-function-invocations-25k)                       |          47 |      20 |
|          |          | [Matthijs/cmu-arctic-xvectors](https://huggingface.co/datasets/Matthijs/cmu-arctic-xvectors)                                                               |      158508 |      19 |
|          |          | [skg/toxigen-data](https://huggingface.co/datasets/skg/toxigen-data)                                                                                       |         957 |      17 |
|          |          | [oscar-corpus/colossal-oscar-1.0](https://huggingface.co/datasets/oscar-corpus/colossal-oscar-1.0)                                                         |          66 |      17 |
|          |          | [aadityaubhat/GPT-wiki-intro](https://huggingface.co/datasets/aadityaubhat/GPT-wiki-intro)                                                                 |         267 |      15 |
|          |          | [codeparrot/github-jupyter-code-to-text](https://huggingface.co/datasets/codeparrot/github-jupyter-code-to-text)                                           |          11 |      14 |
|          |          | [iamtarun/python_code_instructions_18k_alpaca](https://huggingface.co/datasets/iamtarun/python_code_instructions_18k_alpaca)                               |        1424 |      10 |
|          |          | [sander-wood/irishman](https://huggingface.co/datasets/sander-wood/irishman)                                                                               |         456 |       9 |
|          |          | [OleehyO/latex-formulas](https://huggingface.co/datasets/OleehyO/latex-formulas)                                                                           |          46 |       9 |
|          |          | [Muennighoff/flores200](https://huggingface.co/datasets/Muennighoff/flores200)                                                                             |       93084 |       5 |
|          |          | [vivym/midjourney-prompts](https://huggingface.co/datasets/vivym/midjourney-prompts)                                                                       |         126 |       4 |
|          |          | [yuweiyin/FinBench](https://huggingface.co/datasets/yuweiyin/FinBench)                                                                                     |         102 |       4 |
|          |          | [tianyang/repobench-c](https://huggingface.co/datasets/tianyang/repobench-c)                                                                               |         240 |       3 |
|          |          | [HuggingFaceH4/self_instruct](https://huggingface.co/datasets/HuggingFaceH4/self_instruct)                                                                 |         219 |       3 |
|          |          | [iamtarun/code_instructions_120k_alpaca](https://huggingface.co/datasets/iamtarun/code_instructions_120k_alpaca)                                           |         141 |       3 |
|          |          | [billray110/corpus-of-diverse-styles](https://huggingface.co/datasets/billray110/corpus-of-diverse-styles)                                                 |          18 |       3 |
|          |          | [polymer/dolphin-only-gpt-4](https://huggingface.co/datasets/polymer/dolphin-only-gpt-4)                                                                   |          69 |       2 |
|          |          | [gia-project/gia-dataset](https://huggingface.co/datasets/gia-project/gia-dataset)                                                                         |        1727 |       1 |
|          |          | [ajaykarthick/imdb-movie-reviews](https://huggingface.co/datasets/ajaykarthick/imdb-movie-reviews)                                                         |         222 |       1 |
|          |          | [MMInstruction/M3IT-80](https://huggingface.co/datasets/MMInstruction/M3IT-80)                                                                             |         108 |       1 |
|          |          | [rizerphe/sharegpt-hyperfiltered-3k-llama](https://huggingface.co/datasets/rizerphe/sharegpt-hyperfiltered-3k-llama)                                       |          35 |       1 |
|          |          | [ejschwartz/oo-method-test](https://huggingface.co/datasets/ejschwartz/oo-method-test)                                                                     |          27 |       1 |
|          |          | [soymia/boudoir-dataset](https://huggingface.co/datasets/soymia/boudoir-dataset)                                                                           |          25 |       1 |
|          |          | [strombergnlp/offenseval_2020](https://huggingface.co/datasets/strombergnlp/offenseval_2020)                                                               |          24 |       1 |
|          |          | [cw1521/ember2018-malware](https://huggingface.co/datasets/cw1521/ember2018-malware)                                                                       |          17 |       1 |
|          |          | [Senem/Nostalgic_Sentiment_Analysis_of_YouTube_Comments_Data](https://huggingface.co/datasets/Senem/Nostalgic_Sentiment_Analysis_of_YouTube_Comments_Data) |          12 |       1 |
|          |          | [gia-project/gia-dataset-parquet](https://huggingface.co/datasets/gia-project/gia-dataset-parquet)                                                         |       10293 |       0 |
|          |          | [nimaster/Devign_for_VD](https://huggingface.co/datasets/nimaster/Devign_for_VD)                                                                           |         239 |       0 |
|          |          | [Jeska/autonlp-data-vaccinfaq](https://huggingface.co/datasets/Jeska/autonlp-data-vaccinfaq)                                                               |         104 |       0 |
|          |          | [alvp/autonlp-data-alberti-stanza-names](https://huggingface.co/datasets/alvp/autonlp-data-alberti-stanza-names)                                           |         102 |       0 |
|          |          | [alvp/autonlp-data-alberti-stanzas-finetuning](https://huggingface.co/datasets/alvp/autonlp-data-alberti-stanzas-finetuning)                               |         102 |       0 |
|          |          | [ejschwartz/oo-method-test-split](https://huggingface.co/datasets/ejschwartz/oo-method-test-split)                                                         |          53 |       0 |
|          |          | [PierreLepagnol/WRENCH](https://huggingface.co/datasets/PierreLepagnol/WRENCH)                                                                             |          49 |       0 |
|          |          | [mammoth-blaze/ParcelSummaryDS](https://huggingface.co/datasets/mammoth-blaze/ParcelSummaryDS)                                                             |          49 |       0 |
|          |          | [Isaak-Carter/Function_Calling_Private_GG](https://huggingface.co/datasets/Isaak-Carter/Function_Calling_Private_GG)                                       |          43 |       0 |
|          |          | [pszemraj/simplepile-lite](https://huggingface.co/datasets/pszemraj/simplepile-lite)                                                                       |          33 |       0 |
|          |          | [webimmunization/COVID-19-conspiracy-theories-tweets](https://huggingface.co/datasets/webimmunization/COVID-19-conspiracy-theories-tweets)                 |          31 |       0 |
|          |          | [rdpahalavan/UNSW-NB15](https://huggingface.co/datasets/rdpahalavan/UNSW-NB15)                                                                             |          30 |       0 |
|          |          | [marekk/testing_dataset_article_category](https://huggingface.co/datasets/marekk/testing_dataset_article_category)                                         |          28 |       0 |
|          |          | [rdpahalavan/CIC-IDS2017](https://huggingface.co/datasets/rdpahalavan/CIC-IDS2017)                                                                         |          22 |       0 |
|          |          | [Admin08077/STUPID](https://huggingface.co/datasets/Admin08077/STUPID)                                                                                     |          21 |       0 |
|          |          | [irds/nyt](https://huggingface.co/datasets/irds/nyt)                                                                                                       |          15 |       0 |
|          |          | [generative-newsai/news-unmasked](https://huggingface.co/datasets/generative-newsai/news-unmasked)                                                         |          12 |       0 |
|          |          | [irds/dpr-w100](https://huggingface.co/datasets/irds/dpr-w100)                                                                                             |          12 |       0 |
|          |          | [Suchinthana/databricks-dolly-15k-sinhala](https://huggingface.co/datasets/Suchinthana/databricks-dolly-15k-sinhala)                                                                                             |          31 |       0 |
