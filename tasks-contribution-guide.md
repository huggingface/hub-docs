## Contributing to Tasks

Welcome to the contribution guide to [Hugging Face Tasks](https://huggingface.co/tasks) and thank you for considering to help us out! 

### Philosophy behind Tasks

The Task pages are made to lower the barrier of entry to understand a task that can be solved with machine learning and use or train a model to accomplish it. It's a documentation effort made to help out software developers, social scientists, or anyone with no background in machine learning that is interested in understanding how machine learning models can be used to solve a problem. The task pages avoid jargon to let everyone understand the documentation, and if specific terminology is needed, it is explained on the most basic level possible. This is important to understand before contributing to Tasks: at the end of every task page, the user is expected to be able to find and pull a model from the Hub and use it on their data and see if it works for their use case to come up with a proof of concept.

### How to Contribute
You can open a pull request to hub-docs repository to contribute a new documentation about a new task. Under `tasks/src` we have a folder for every task that contains two files, `about.md` and `data.ts`. `about.md` contains the markdown part of the page, use cases, resources and minimal code block to infer a model that belongs to the task. `data.ts` contains redirections to canonical models and datasets, metrics, the schema of the task and the information the inference widget needs. 
![Anatomy of a Task Page](tasks/assets/contribution-guide/anatomy.png)
We have `tasks/assets` that contains data used in inference widget and images used in the markdown file. Last three files are `const.ts` which has task to library mapping (e.g. spacy to token-classification) where you can add a library. They will look on top right corner like below.
![Libraries of a Task](tasks/assets/contribution-guide/libraries.png)
This might seem overwhelming, but you don't necessarily need to add all of these in one pull request or on your own, you can simply contribute one section. Feel free to ask for help whenever you need. 