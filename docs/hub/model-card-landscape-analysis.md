# THE LANDSCAPE OF ML DOCUMENTATION TOOLS
The development of the model cards framework in 2018 was inspired by the major documentation framework efforts of Data Statements for Natural Language Processing ([Bender & Friedman, 2018](https://aclanthology.org/Q18-1041/)) and Datasheets for Datasets ([Gebru et al., 2018](https://www.fatml.org/media/documents/datasheets_for_datasets.pdf)). Since model cards were proposed, several other tools have been proposed for documenting and evaluating various aspects of the machine learning development cycle. These tools, including model cards and related documentation efforts, proposed before model cards, can be contextualized about their focus (e.g., on which part of the ML system lifecycle does the tool focus?) and their intended audiences (e.g., who is the tool designed for?). In Figures 1-2 below, we summarise several prominent documentation tools along these dimensions, provide contextual descriptions of each tool, and link to examples. We broadly classify the documentation tools as belonging to the following groups: 

* **Data-focused**, including documentation tools focused on datasets used in the machine learning system lifecycle
* **Models-and-methods-focused**, including documentation tools focused on machine learning models and methods; and 
* **Systems-focused**, including documentation tools focused on ML systems, including models, methods, datasets, APIs, and non-AI/ML components that interact with each other as part of an ML system


These groupings are not mutually exclusive; they do include overlapping aspects of the ML system lifecycle. For example, **system cards** focus on documenting ML systems that may include multiple models and datasets, and thus might include content that overlaps with data-focused or model-focused documentation tools. The tools described are a non-exhaustive list of documentation tools for the ML system lifecycle. In general, we included tools that were: 

* Focused on documentation of some (or multiple) aspects of the ML system lifecycle
* Included the release of a template intended for repeated use, adoption, and adaption


## Summary of ML Documentation Tools

### Figure 1

### DATA-FOCUSED DOCUMENTATION TOOLS

Several proposed documentation tools focus on datasets used in the ML system lifecycle, including training, developing, validating, finetuning, and evaluating machine learning models as part of continuous cycles. These tools generally focus on the many aspects of the data lifecycle (perhaps for a particular dataset, group of datasets, or more broadly), including how the data was assembled, collected, annotated, and how it should be used. 

* Extending the concept of datasheets in the electronics industry, [Gebru et al. (2018)](https://www.fatml.org/media/documents/datasheets_for_datasets.pdf) propose datasheets for datasets to document details related to a dataset’s creation, potential uses, and associated concerns. 
* [Bender and Friedman (2018)](https://aclanthology.org/Q18-1041/) propose data statements for natural language processing. [Bender, Friedman, and McMillan-Major (2021)](https://techpolicylab.uw.edu/wp-content/uploads/2021/11/Data_Statements_Guide_V2.pdf) update the original data statements framework and provide resources including a guide for writing data statements and translating between the first version of the schema and the newer version[^2]. 
* [Holland et al. (2018)](https://huggingface.co/papers/1805.03677) propose data nutrition labels, akin to nutrition facts for foodstuffs and nutrition labels for privacy disclosures, as a tool for analyzing and making decisions about datasets. The Data Nutrition Label team released an updated design of an interface for the label in 2020  ([Chmielinski et al., 2020)](https://huggingface.co/papers/2201.03954)).
* [McMillan-Major et al. (2021)](https://huggingface.co/papers/2108.07374) describe the development process and resulting templates for **data cards for NLP** in the form of data cards on the Hugging Face Hub[^3] and data cards for datasets that are part of the NLP benchmark for Generation and its Evaluation Metrics (GEM) environment[^4].
* [Hutchinson et al. (2021)](https://dl.acm.org/doi/pdf/10.1145/3442188.3445918) describes the need for comprehensive dataset documentation, and drawing on software development practices, provide templates for documenting several aspects of the dataset development lifecycle (for Tables 1 and 2, we refer to their framework as the **Dataset Development Lifecycle Documentation Framework**).
* [Pushkarna et al. (2021)](https://huggingface.co/papers/2204.01075) propose the data cards as part of the **data card playbook**, a human-centered documentation tool focused on datasets used in industry and research. 


### MODEL-AND-METHOD-FOCUSED DOCUMENTATION TOOLS

Another set of documentation tools can be thought of as focusing on machine learning models and machine learning methods. These include:

* [Mitchell et al. (2018)](https://huggingface.co/papers/1810.03993) propose **model cards** for model reporting to accompany trained ML models and document issues related to evaluation, use, and other issues

* [Shen et al. (2021)](https://dl.acm.org/doi/abs/10.1145/3442188.3445971) propose **value cards** for teaching students and practitioners about values related to ML models

* [Seifert et al. (2019)](https://ris.utwente.nl/ws/portalfiles/portal/158031484/Seifert2019_cogmi_consumer_labels_preprint.pdf) propose **consumer labels for ML models** to help non-experts using or affected by the model understand key issues related to the model.

* [Adkins et al. (2022)](https://dl.acm.org/doi/pdf/10.1145/3491101.3519724) analyze aspects of descriptive documentation tools – which they consider to include **model cards** and data sheets – and argue for increased prescriptive tools for ML engineers. They propose method cards, focused on ML methods, and design primarily with technical stakeholders like model developers and reviewers in mind.

  * They envision the relationship between model cards and method cards, in part, by stating: “The sections and prompts we propose…[in the method card template] focus on ML methods that are sufficient to produce a proper ML model with defined input, output, and task. Examples of these are object detection methods such as Single-shot Detectors and language modeling methods such as Generative Pre-trained Transformers (GPT). *It is possible to create Model Cards for the models created using these methods*.”
  
  * They also state “While Model Cards and FactSheets put the main focus on documenting existing models, Method Cards focus more on the underlying methodical and algorithmic choices that need to be considered when creating and training these models. *As a rough analogy, if Model Cards and FactSheets provide nutritional information about cooked meals, Method Cards provide the recipes*.”
 

### SYSTEM-FOCUSED DOCUMENTATION TOOLS

Rather than focusing on particular models, datasets, or methods, system-focused documentation tools look at how models interact with each other, with datasets, methods, and with other ML components to form ML systems. 

* [Procope et al. (2022)](https://ai.facebook.com/research/publications/system-level-transparency-of-machine-learning) propose system cards to document and explain AI systems – potentially including multiple ML models, AI tools, and non-AI technologies – that work together to accomplish tasks.
* [Arnold et al. (2019)](https://huggingface.co/papers/1808.07261) extends the idea of declarations of conformity for consumer products to AI services, proposing FactSheets to document aspects of “AI services” which are typically accessed through APIs and may be composed of multiple different ML models. [Hind et al. (2020)](https://dl.acm.org/doi/abs/10.1145/3334480.3383051) share reflections on building factsheets.
* [Gilbert et al. (2022)](https://huggingface.co/papers/2204.10817) propose **Reward Reports for Reinforcement Learning** systems, recognizing the dynamic nature of ML systems and the need for documentation efforts to incorporate considerations of post-deployment performance, especially for reinforcement learning systems.
* [Goel et al. (2021)](https://huggingface.co/papers/2101.04840) develop **Robustness Gym**, an evaluation toolkit for testing several aspects of deep neural networks in real-world systems, allowing for comparison across evaluation paradigms. 
* Through the [ABOUT ML project](https://partnershiponai.org/workstream/about-ml/) ([Raji and Yang, 2019](https://huggingface.co/papers/1912.06166)), the Partnership on AI is coordinating efforts across groups of stakeholders in the machine learning community to develop comprehensive, scalable documentation tools for ML systems. 


## THE EVOLUTION OF MODEL CARDS

Since the proposal for model cards by Mitchell et al. in 2018, model cards have been adopted and adapted by various organizations, including by major technology companies and startups developing and hosting machine learning models[^5], researchers describing new techniques[^6], and government stakeholders evaluating models for various projects[^7]. Model cards also appear as part of AI Ethics educational toolkits, and numerous organizations and developers have created implementations for automating or semi-automating the creation of model cards. Appendix A provides a set of examples of model cards for various types of ML models created by different organizations (including model cards for large language models), model card generation tools, and model card educational tools.




### MODEL CARDS ON THE HUGGING FACE HUB
Since 2018, new platforms and mediums for hosting and sharing model cards have also emerged. For example, particularly relevant to this project, Hugging Face hosts model cards on the Hugging Face Hub as README files in the repositories associated with ML models. As a result, model cards figure as a prominent form of documentation for users of models on the Hugging Face Hub. As part of our analysis of model cards, we developed and proposed model cards for several dozen ML models on the Hugging Face Hub, using the Hub’s Pull Request (PR) and Discussion features to gather feedback on model cards, verify information included in model cards, and publish model cards for models on the Hugging Face Hub. At the time of writing this guidebook, all of Hugging Face’s models on the Hugging Face Hub have an associated model card on the Hub[^8].



The high number of models uploaded to the Hugging Face Hub (101,041 models at the point of writing), enabled us to explore the content within model cards on the hub:
We began by analyzing language model, and model cards, to identify patterns (e.g. repeated sections and subsections, to answer initial questions such as:

1) How many of these models have model cards?
   
2) What percent of downloads had an associated model card?

From our analysis of all the models on the hub, we noticed that the most downloads come from the top 200 models.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/mc-downloads.png"/>
</div>


With a continued focus on large language models, ordered by most downloaded and only models with model cards, to begin with, we noted the most recurring sections within their respective model cards. 

While some headings within model cards may differ between models, we grouped components/the theme of each section within each model card and then mapped them to section headings that were the most recurring (mostly found in the top 200 downloaded models and with the aid/guidance of the Bloom model card)



<Tip>

 [Checkout the User Studies](./model-cards-user-studies)

 </Tip>


<Tip>

 [See Appendix](./model-card-appendix)

 </Tip>

[^1]: For each tool, descriptions are excerpted from the linked paper listed in the second column.

[^2]: See https://techpolicylab.uw.edu/data-statements/ .

[^3]: See https://techpolicylab.uw.edu/data-statements/ .

[^4]: See https://techpolicylab.uw.edu/data-statements/ .

[^5]: See, e.g., the Hugging Face Hub, Google Cloud’s Model Cards https://modelcards.withgoogle.com/about.

[^6]: See Appendix A.

[^7]: See GSA / US Census Bureau Collaboration on Model Card Generator.

[^8]: By “Hugging Face models,” we mean models shared by Hugging Face, not another organization, on the Hub. Formally, these are models without a ‘/’ in their model ID.

---

**Please cite as:**
Ozoani, Ezi and Gerchick, Marissa and Mitchell, Margaret. Model Card Guidebook. Hugging Face, 2022. https://huggingface.co/docs/hub/en/model-card-guidebook 
