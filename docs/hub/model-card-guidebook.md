# Model Card Guidebook 

Model cards are an important documentation and transparency framework for machine learning models. We believe that model cards have the potential to serve as *boundary objects*, a single artefact that is accessible to users who have different backgrounds and goals when interacting with model cards – including developers, students, policymakers, ethicists, those impacted by machine learning models, and other stakeholders. We recognize that developing a single artefact to serve such multifaceted purposes is difficult and requires careful consideration of potential users and use cases. Our goal as part of the Hugging Face science team over the last several months has been to help operationalize model cards towards that vision, taking into account these challenges, both at Hugging Face and in the broader ML community. 

To work towards that goal, it is important to recognize the thoughtful, dedicated efforts that have helped model cards grow into what they are today, from the adoption of model cards as a standard practice at many large organisations to the development of sophisticated tools for hosting and generating model cards. Since model cards were proposed by Mitchell et al. (2018), the landscape of machine learning documentation has expanded and evolved. A plethora of documentation tools and templates for data, models, and ML systems have been proposed and have developed – reflecting the incredible work of hundreds of researchers, impacted community members, advocates, and other stakeholders. Important discussions about the relationship between ML documentation and theories of change in responsible AI have created continued important discussions, and at times, divergence. We also recognize the challenges facing model cards, which in some ways mirror the challenges facing machine learning documentation and responsible AI efforts more generally, and we see opportunities ahead to help shape both model cards and the ecosystems in which they function positively in the months and years ahead. 

Our work presents a view of where we think model cards stand right now and where they could go in the future, at Hugging Face and beyond. This work is a “snapshot” of the current state of model cards, informed by a landscape analysis of the many ways ML documentation artefacts have been instantiated. It represents one perspective amongst multiple about both the current state and more aspirational visions of model cards. In this blog post, we summarise our work, including a discussion of the broader, growing landscape of ML documentation tools, the diverse audiences for and opinions about model cards, and potential new templates for model card content. We also explore and develop model cards for machine learning models in the context of the Hugging Face Hub, using the Hub’s features to collaboratively create, discuss, and disseminate model cards for ML models. 

With the launch of this Guidebook, we introduce several new resources and connect together previous work on Model Cards:

1) An updated Model Card template, released in [the `huggingface_hub` library](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/modelcard_template.md), drawing together Model Card work in academia and throughout the industry.

2) An [Annotated Model Card Template](./model-card-annotated), which details how to fill the card out.

3) A [Model Card Creator Tool](https://huggingface.co/spaces/huggingface/Model_Cards_Writing_Tool), to ease card creation without needing to program, and to help teams share the work of different sections.

4) A [User Study](./model-cards-user-studies) on Model Card usage at Hugging Face

5) A [Landscape Analysis and Literature Review](./model-card-landscape-analysis) of the state of the art in model documentation.

We also include an [Appendix](./model-card-appendix) with further details from this work.
