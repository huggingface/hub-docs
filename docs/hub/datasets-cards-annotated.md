# Annotated Dataset Card Template

> [!TIP]
> New to dataset cards? Start with [Dataset Cards](./datasets-cards) for what a card is and how the metadata section controls the Hub, then come back here when you are filling in the written sections.

## Template

[datasetcard_template.md file](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/datasetcard_template.md)

This is the template the Hub inserts when you click **Import dataset card template** while creating a `README.md` in a dataset repository. It is also what [`huggingface_hub.DatasetCard.from_template`](https://huggingface.co/docs/huggingface_hub/package_reference/cards#huggingface_hub.DatasetCard.from_template) produces.

## Directions

Fully filling out a dataset card usually takes input from a few different roles. (One person may have more than one role.) We'll refer to these roles as the **data curator**, who collected, filtered, processed, or annotated the data and knows exactly how the files were produced; the **sociotechnic**, who is skilled at analyzing the interaction of technology and society long-term (this includes lawyers, ethicists, sociologists, or rights advocates); and the **project organizer**, who understands the overall scope and reach of the dataset, can roughly fill out each part of the card, and who serves as a contact person for dataset card updates.

* The **data curator** is necessary for filling out [Dataset Structure](#dataset-structure) and [Dataset Creation](#dataset-creation), in particular the [Source Data](#source-data) and [Annotations](#annotations-optional) subsections. They are also the best source for the technical side of [Bias, Risks, and Limitations](#bias-risks-and-limitations), such as known annotation artifacts or coverage gaps.

* The **sociotechnic** is necessary for filling out [Personal and Sensitive Information](#personal-and-sensitive-information) and the bias and risk parts of [Bias, Risks, and Limitations](#bias-risks-and-limitations), and particularly useful for [Out-of-Scope Use](#out-of-scope-use).

* The **project organizer** is necessary for filling out [Dataset Details](#dataset-details) and [Uses](#uses). They might also fill out [Curation Rationale](#curation-rationale). Project organizers could also be in charge of [Citation](#citation-optional), [Glossary](#glossary-optional), [Dataset Card Contact](#dataset-card-contact), [Dataset Card Authors](#dataset-card-authors-optional), and [More Information](#more-information-optional).

For fields you cannot complete yet, keep the `[More Information Needed]` placeholder rather than deleting the section. It tells readers the information is missing rather than not applicable, and makes it easy to find what still needs filling in later.

_Instructions are provided below, in italics._

Template variable names appear in `monospace`.

---

# Metadata

**Section Overview:** The YAML block between the two `---` lines at the top of the file. It is not rendered as text; the Hub reads it to display the license, languages, size, and tags on the dataset page, to power the filters at https://huggingface.co/datasets, and to configure how data files map to splits and subsets.

`card_data`

_Fill this in with the **Metadata UI** in the Hub editor rather than by hand where you can. The full list of accepted fields is in the [Dataset Card specifications](https://github.com/huggingface/hub-docs/blob/main/datasetcard.md?plain=1). At minimum, set `license`, `language` (for datasets with natural language), `pretty_name`, `task_categories`, and `size_categories`. Use the `configs` key to declare splits and subsets without writing any code; see [Manual Configuration](./datasets-manual-configuration)._

# Dataset Card for `pretty_name`

**Section Overview:** Provide the dataset name and a short summary of what the dataset is.

`dataset_summary`

_Write 1-3 sentences a reader can use to decide whether to keep reading. Say what the data is (for example "news headlines with human-written summaries"), roughly how much of it there is, which languages or modalities it covers, and what it was built for. Avoid marketing language; the summary is often the only thing people read before downloading._

# Dataset Details

**Section Overview:** This section provides basic information about what the dataset is, where it came from, and who is responsible for it. It should be useful for anyone who wants to reference the dataset.

## Dataset Description

`dataset_description`

_Expand on the summary. Describe the domain, topic, or genre covered, the time period the data spans, and the version of the dataset this card describes. If the dataset was introduced in a paper or is a processed version of another dataset, say so here and link to it. Mention anything a reader must know before using the data, such as a non-commercial license or a required attribution._

* **Curated by:** `curators`

_List (and ideally link to) the people or organizations who collected and assembled the dataset, with their affiliations._

* **Funded by [optional]:** `funded_by`

_List (and ideally link to) the funding sources that financially, computationally, or otherwise supported or enabled the creation of this dataset._

* **Shared by [optional]:** `shared_by`

_List (and ideally link to) the people or organization making the dataset available on the Hub, if different from the curators. This is common when someone uploads a dataset originally released elsewhere._

* **Language(s) (NLP):** `language`

_Use this field when the dataset contains natural (human) language. Name the languages and, where relevant, the variety: social media text, transcribed speech, legal documents, a specific dialect. Where possible use [BCP-47 codes](https://www.rfc-editor.org/info/bcp47) (for example `en-US`, `pt-BR`) in `language_details` in the metadata so the variety is machine-readable too._

* **License:** `license`

_Name and link to the license. It should match the `license` field in the metadata. If the data was collected from sources with their own terms (a website's terms of service, a source dataset's license), state how those terms apply to this dataset._

## Dataset Sources [optional]

* **Repository:** `repo`
* **Paper [optional]:** `paper`
* **Demo [optional]:** `demo`

_Provide links for the reader to see where the dataset came from: the code used to build it, the paper that introduced it, a Space that lets people browse it. If the dataset has a homepage or an active leaderboard, link them here as well. Additional kinds of resources, such as blog posts or lessons learned, belong in [More Information](#more-information-optional). If you include one thing in this section, link to the repository or homepage._

# Uses

**Section Overview:** This section addresses how the dataset is intended to be used, who the foreseeable users are (including people represented in the data), and which uses are out of scope or would be misuse. This section is not for license terms; link directly to the license for that.

## Direct Use

`direct_use`

_Describe the tasks the dataset was built for and is suitable for. For each task, say what a model trained or evaluated on this data would do and how success is usually measured (for example "extractive question answering, evaluated with exact match and F1"). Link to the relevant task pages on the Hub. If the dataset is a benchmark, say whether it is meant for training, evaluation, or both._

## Out-of-Scope Use

`out_of_scope_use`

_List how the dataset may foreseeably be misused (used in a way it will not work for) and what users ought not do with it. Common entries: uses the license prohibits, uses that would harm the people in the data (such as identifying individuals or inferring sensitive attributes), and technical mismatches (such as using a dataset of formal written text to train a model for casual speech)._

# Dataset Structure

**Section Overview:** This section describes what a single example looks like, what each field means, and how the data is divided into splits or subsets. It is what people read when they open the data and see column names for the first time.

`dataset_structure`

_Cover three things:_

_1. **Data instances.** Show one representative example, ideally as a small JSON snippet, and say what it represents (one document, one image with its labels, one conversation turn). If examples are related to each other, such as several answers to the same question, explain the relationship and whether it is made explicit in the data._

_2. **Data fields.** List every field with its data type and what it contains. Say whether each field is an input or a target for the supported tasks. For span indices, state whether they count characters, tokens, or words, and whether spans can overlap. For IDs, state whether they carry meaning, such as a mapping to another dataset._

_3. **Data splits and subsets.** Name each split or subset and give its size. Describe the criteria used to split the data. If the splits differ in how they were produced (for example machine-generated training labels but human-verified test labels), say so. A small table of split sizes and basic statistics, such as average text length, is helpful. Structured split and feature information can also go in the `dataset_info` metadata; the Hub renders it in the dataset viewer._

# Dataset Creation

**Section Overview:** This section explains why the dataset exists and how it was made: where the raw data came from, how it was selected and processed, who produced it, and who labeled it. It is what lets someone judge whether the data fits their use, and what lets them reproduce or extend the work.

## Curation Rationale

`curation_rationale_section`

_What need motivated the creation of this dataset? What were the reasons behind the major choices involved in putting it together, such as the sources chosen, the size, the languages, or the categories in the label set?_

## Source Data

_This section describes the source data (for example news text and headlines, social media posts, sensor readings, or translated sentences). If the dataset was derived from other datasets, name them, link to their Hub pages, and list them in `source_datasets` in the metadata._

### Data Collection and Processing

`data_collection_and_processing_section`

_Describe how the data was collected and what was done to it afterwards. Include the selection or filtering criteria, any key words or search terms used, the tools and libraries involved, and the dates the data was gathered. If the data was cleaned, deduplicated, normalized, tokenized, resized, or otherwise transformed, describe the process. If the data was scraped, say from where and under what terms._

### Who are the source data producers?

`source_data_producers_section`

_State whether the data was produced by humans, generated by a machine (including by a language model), or both. Describe the people or systems who originally created the data and the conditions under which they did so: crowdworkers on a named platform, users of a website, employees, a model with a given prompt. If people were paid, say so._

_If available, include self-reported demographic or identity information for the data producers, but do not infer it. If it is unknown, say so. See [Larson (2017)](https://aclanthology.org/W17-1601/) on using identity categories as variables, particularly gender. Also describe other people represented or mentioned in the data, even if they did not produce it._

## Annotations [optional]

_If the dataset contains labels, ratings, transcriptions, or other annotations that were not part of the initial data collection, describe them in the following subsections. If there are no annotations, say so and remove the subsections._

### Annotation process

`annotation_process_section`

_Describe how the annotations were created: the tools used, the guidelines given to annotators (link to them if they are public), how much of the data was annotated, how many annotators saw each example, inter-annotator agreement statistics if you have them, and any validation or adjudication steps. If a model produced the annotations, name it and describe the prompt or setup._

### Who are the annotators?

`who_are_annotators_section`

_Describe the people or systems who created the annotations and how they were selected. Note whether they were experts, crowdworkers, volunteers, or automated. The same guidance as for source data producers applies: include self-reported demographic information if available, do not infer it, and describe the working conditions and compensation where known._

## Personal and Sensitive Information

`personal_and_sensitive_information`

_State whether the dataset contains data that might be considered personal, sensitive, or private. This includes names, addresses, contact details, account handles, faces, voices, and anything that could identify an individual directly or in combination with other data. It also includes data that reveals racial or ethnic origin, sexual orientation, religious or political beliefs, union membership, health, finances, biometrics, government identifiers, or criminal history._

_If the dataset uses identity categories (for example a gender label), explain where that information came from: self-reporting, profile data, or inference. If efforts were made to anonymize the data, describe the process and its known limits. If the dataset is [gated](./datasets-gated) because of this content, say so._

# Bias, Risks, and Limitations

**Section Overview:** This section identifies foreseeable harms, misunderstandings, and technical and sociotechnical limitations, together with warnings and potential mitigations. Bias, risks, and limitations can sometimes be inseparable. Generally, bias and risks are sociotechnical, while limitations are technical:
- A **bias** is a skew in the data, such as over- or under-representation of some groups, topics, or viewpoints, or stereotyped associations.
- A **risk** is a socially relevant harm that using the dataset might cause or contribute to.
- A **limitation** is a likely failure mode, such as annotation artifacts or label noise, that can be addressed by following the listed Recommendations.

`bias_risks_limitations`

_What are the known or foreseeable issues stemming from this dataset? Describe specific biases likely to be reflected in the data and whether any steps were taken to reduce them. If analyses have quantified these biases, summarize them and link to the studies. If the dataset contains a low-resource or under-represented language, or has any impact on underserved communities, discuss it here. Note other known limitations, such as annotation artifacts that let models score well without solving the task, and cite the work that found them._

_For general background on bias in text datasets, see [Blodgett et al. (2020)](https://aclanthology.org/2020.acl-main.485/); for a worked example on Wikipedia text, see [Dinan et al. (2020)](https://huggingface.co/papers/2005.00614)._

## Recommendations

`bias_recommendations`

_What are recommendations with respect to the foreseeable issues? This can range from "filter out examples shorter than N tokens" to "do not use for decisions about individuals" to "evaluate downstream models separately on the under-represented subgroups listed above". If you have nothing specific yet, the template's default text is a reasonable placeholder, but a concrete recommendation is far more useful._

# Citation [optional]

**Section Overview:** The curators' preferred citation for this dataset. This is often a paper. If the dataset has a [DOI](https://www.doi.org/), include it.

### BibTeX

`citation_bibtex`

### APA

`citation_apa`

# Glossary [optional]

**Section Overview:** This section defines terms used in the card or in the field names that may not be obvious to readers outside the field, and explains how any reported statistics were calculated.

`glossary`

_Clearly define terms in order to be accessible across audiences._

# More Information [optional]

**Section Overview:** This section provides links to further writing on the dataset: blog posts, technical reports on the collection process, changelogs between versions, or known downstream models trained on it.

`more_information`

# Dataset Card Authors [optional]

**Section Overview:** This section lists the people who wrote the dataset card, providing recognition and accountability for the detailed work that goes into its construction. They may be different from the dataset curators.

`dataset_card_authors`

# Dataset Card Contact

**Section Overview:** Provides a way for people who have updates to the dataset card, suggestions, or questions, to contact the dataset card authors. An email address, a link to the repository's Community tab, or a GitHub issues page all work.

`dataset_card_contact`

---

For the reasoning behind these sections, see [Datasheets for Datasets](https://huggingface.co/papers/1803.09010) (Gebru et al., 2018) and [Data Statements for NLP](https://aclanthology.org/Q18-1041/) (Bender and Friedman, 2018), which the template draws on.
