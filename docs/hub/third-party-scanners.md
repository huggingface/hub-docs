# 3rd Party scanners

*Interested in joining our security partnership / providing scanning information on the Hub? Please get in touch with us over at security@huggingface.co.*

We partner with 3rd party scanning providers in order to make the Hub safer. The same way files are scanned by our internal scanning system, public repositories' files are scanned by the 3rd party scanners we integrate.

Our frontend has been redesigned specifically for this purpose, in order to accomodate for new scanners:

<img class="block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/token-leak-email-example.png"/>

Here is an example repository you can check out to see the feature in action: [mcpotato/42-eicar-street](https://huggingface.co/mcpotato/42-eicar-street).

## Model security refresher

To share models, we serialize the data structures we use to interact with the models, in order to facilitate storage and transport. Some serialization formats are vulnerable to nasty exploits, such as arbitrary code execution (looking at you pickle), making sharing models potentially dangerous.

As Hugging Face has become the de facto platform for model sharing, we’d like to protect the community from this, hence why we have developed tools like [picklescan](https://github.com/mmaitre314/picklescan) and why we integrate 3rd party scanners.

Pickle is not the only exploitable format out there, [see for reference](https://github.com/Azure/counterfit/wiki/Abusing-ML-model-file-formats-to-create-malware-on-AI-systems:-A-proof-of-concept) how one can exploit Keras Lambda layers to achieve arbitrary code execution.

## Protect AI's Guardian

[Protect AI](https://protectai.com/)'s [Guardian](https://protectai.com/guardian) catches both pickle and Keras exploits. Guardian also benefits from reports sent in by their community of bounty [Huntr](https://huntr.com/)s.

<!-- insert image of report -->
