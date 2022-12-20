# User Studies
## MODEL CARD AUDIENCES AND USE CASES


During our investigation into the landscape of model documentation tools (data cards etc), we noted how different stakeholders make use of existing infrastructure to create a kind of model card with information focused on their needed domain.

One such example are ‘business analysts’ or those whose focus is on B2B as well as an internal only audience. ( [insert and cite](https://towardsdatascience.com/dag-card-is-the-new-model-card-70754847a111)) The static and more manual approach for this audience is using Confluence pages. (if PMs write the page, we are detaching the model creators from its theoretical consumption; if ML engineers write the page, they may tend to stress only a certain type of information. ) or a proposed combination of HTML (Jinja) templates, Metaflow classes and external APi keys, in order to create model cards that include a perspective of the model information that is needed for their domain/use case. 

We conducted a user study, with the aim of validating a literature informed model card structure and to understand sections/ areas of ranked importance for the different stakeholders perspectives. The study aimed to validate the following components:

* **Validate the Model Card Layout** 

During our examination of the state of the art of model cards, which noted recurring sections from the top ~100 downloaded models on the hub that had model cards. From this analysis we catalogued the top recurring model card sections and recurring information, this coupled with the structure of the Bloom model card, lead us to the initial version of a standard model card structure. 

As we began to structure our user studies, two variations of model cards - that made use of the [initial model card structure](http://github.com/huggingface/hub-docs/docs/hub/model-card-annotated.md) - were used as interactive demonstrations. The aim of these demo’s was to understand not only the different user perspectives on the visual elements of the model card’s but also the content presented to users. The {desired} outcome would enable us to further understand  what makes a model card both easier to read, still providing some level of interactivity within the model cards, all while presenting the information in an easily understandable [approachable] manner.

* **Stakeholders Perspectives**

As different people, of varying technical backgrounds, could be collaborating on a model and subsequently the model card, we sought to validate the need for different stakeholders perspectives. Based on the ease of use of writing the different model card sections and the sections that one would read first

Participants ranked the different sections of model cards in the perspective of one reading a model card and then as an author of a model card. An ordering scheme -  1 being the highest weight and 10 being the lowest -  was applied to the different sections that the user would usually read first in a model card and the sections of a model card that a model card author would find easiest to write. 


## Summary of Responses to the User Studies Survey

Our user studies provided further clarity on the sections that different user profiles/stakeholders would find more challenging or easier to write. 

The results illustrated below show that while the Bias, Risks and Limitations section ranks second for both model card writers and model card readers for *In what order do you write the model card and What section do you look at first*, respectively, it is also noted as the most challenging/longest section to write. This favoured/endorsed the need to further evaluate the Bias, Risks and Limitations sections in order to assist with writing this decisive/imperative section.

These templates were then used to generate model cards for the top 200 most downloaded Hugging Face models. 

* We first began by pulling all Hugging Face model's on the hub and, in particular, the Limitations and bias sections.
* Based on inputs that were the most continuously used with a higher number of model downloads, grouped by model typed, the tool provides prompted text within the Bias, Risks and Limitations sections. We also prompt a default text if the model type is not specified.

Using this information, we returned back to our analysis of all model cards on the hub, coupled with suggestions from other researchers and peers at HF and additional research on the type of prompted information we could provide to users while they are creating model cards. These defaulted prompted text allowed us to satisfy the aims:

1) For those who have not created model cards before or who do not usually make a model card or any other type of model documentation for their model’s, the prompted text enables these users to easily create a model card. In turn increasing the number of model cards created.
   
2) Users who already write model cards, the prompted text invites them to add more to their model card, further developing the content/standard of model cards. 

### Respondent Demographics

* Tech & Regulatory Affairs Counsel
* ML Engineer (x2)
* Developer Advocate
* Executive Assistant
* Monetization Lead
* Policy Manager/AI Researcher
* Research Intern

**What are the key pieces of information you want or need to know about a model when interacting with a machine learning model?**

**Insight:**

* Respondents prioritised information about the model task/domain (x3), training data/training procedure (x2), how to use the model (with code) (x2), bias and limitations, and the model licence

### Feedback on Specific Model Card Formats

#### Format 1: 
**Current [distilgpt2 model card](https://huggingface.co/distilgpt2) on the Hub**

**Insights:**

* Respondents found this model card format to be concise, complete, and readable. 
* There was no consensus about the collapsible sections (some liked them and wanted more, some disliked them). 
* Some respondents said “Risks and Limitations” should go with “Out of Scope Uses”

#### Format 2: 
**Nazneen Rajani's [Interactive Model Card space](https://huggingface.co/spaces/nazneen/interactive-model-cards)**

**Insights:**

* While a few respondents really liked this format, most found it overwhelming or as an overload of information. Several suggested this could be a nice tool to layer onto a base model card for more advanced audiences.

#### Format 3: 
**Ezi Ozoani's [Semi-Interactive Model Card Space](https://huggingface.co/spaces/Ezi/ModelCardsAnalysis)**

**Insights:**

* Several respondents found this format overwhelming, but they generally found it less overwhelming than format 2 
* Several respondents disagreed with the current layout and gave specific feedback about which sections should be prioritised within each column


### Section Rankings
*Computed and then ordered based on average ranking. Arrows shown relative to the order of the associated section in the question on the survey.*

**Insights:** 
* When writing model cards, respondents generally said they would write a model card in the same order in which the sections were listed in the survey question.
* When ranking the sections of the model card by ease/quickness of writing, consensus was that the sections on uses and limitations and risks were the most difficult.
* When reading model cards, respondents said they looked at the cards’ sections in an order that was close to – but not perfectly aligned with – the order in which the sections were listed in the survey question.

![user studies results 1](https://huggingface.co/datasets/huggingface/documentation-images/tree/main/hub/usaer-studes-responses(1).png) 

![user studies results 2](https://huggingface.co/datasets/huggingface/documentation-images/tree/main/hub/user-studies-responses(2).png) 


<Tip>

 [Checkout the Appendix](https://github.com/huggingface/hub-docs/blob/meg-huggingface-patch-1/docs/hub/model-card-appendix.md)

 </Tip>



