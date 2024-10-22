# Third-party scanner: Protect AI

<Tip>
Interested in joining our security partnership / providing scanning information on the Hub? Please get in touch with us over at security@huggingface.co.*
</Tip>

[Protect AI](https://protectai.com/)'s [Guardian](https://protectai.com/guardian) catches pickle, Keras, and other exploits as detailed on their [Knowledge Base page](https://protectai.com/insights/knowledge-base/). Guardian also benefits from reports sent in by their community of bounty [Huntr](https://huntr.com/)s.

<img class="block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/protect-ai-report.png"/>
<em>Example of a report for <a href="https://huggingface.co/mcpotato/42-eicar-street/blob/main/danger.dat">danger.dat</a></em>

We partnered with Protect AI to provide scanning in order to make the Hub safer. The same way files are scanned by our internal scanning system, public repositories' files are scanned by Guardian.

Our frontend has been redesigned specifically for this purpose, in order to accomodate for new scanners:

<img class="block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/third-party-scans-list.png"/>

Here is an example repository you can check out to see the feature in action: [mcpotato/42-eicar-street](https://huggingface.co/mcpotato/42-eicar-street).

## Model security refresher

To share models, we serialize the data structures we use to interact with the models, in order to facilitate storage and transport. Some serialization formats are vulnerable to nasty exploits, such as arbitrary code execution (looking at you pickle), making sharing models potentially dangerous.

As Hugging Face has become a popular platform for model sharing, we’d like to protect the community from this, hence why we have developed tools like [picklescan](https://github.com/mmaitre314/picklescan) and why we integrate third party scanners.

Pickle is not the only exploitable format out there, [see for reference](https://github.com/Azure/counterfit/wiki/Abusing-ML-model-file-formats-to-create-malware-on-AI-systems:-A-proof-of-concept) how one can exploit Keras Lambda layers to achieve arbitrary code execution.

