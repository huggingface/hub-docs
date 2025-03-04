# Third-party scanner: JFrog


[JFrog](https://protectai.com/)'s security scanner detects malicious behavior in machine learning models.

![JFrog report for the danger.dat file contained in mcpotato/42-eicar-street](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/jfrog-report.png)
*Example of a report for [danger.dat](https://huggingface.co/mcpotato/42-eicar-street/blob/main/danger.dat)*

We partnered with JFrog to provide scanning in order to make the Hub safer. Model files are scanned by the JFrog scanner and reports you the scanning result.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/jfrog-scanner.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/jfrog-scanner.png" />
</div>

Here is an example repository you can check out to see the feature in action: [mcpotato/42-eicar-street](https://huggingface.co/mcpotato/42-eicar-street).

## Model security refresher

To share models, we serialize the data structures we use to interact with the models, in order to facilitate storage and transport. Some serialization formats are vulnerable to nasty exploits, such as arbitrary code execution (looking at you pickle), making sharing models potentially dangerous.

As Hugging Face has become a popular platform for model sharing, we’d like to protect the community from this, hence why we have developed tools like [picklescan](https://github.com/mmaitre314/picklescan) and why we integrate third party scanners.

Pickle is not the only exploitable format out there, [see for reference](https://github.com/Azure/counterfit/wiki/Abusing-ML-model-file-formats-to-create-malware-on-AI-systems:-A-proof-of-concept) how one can exploit Keras Lambda layers to achieve arbitrary code execution.

