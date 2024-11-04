# Security & Compliance

The Inference API is not designed for heavy production requirements. For production needs, explore [Inference Endpoints](https://ui.endpoints.huggingface.co/) for dedicated resources, autoscaling, advanced security features, and more.

## Data Security/Privacy

Hugging Face does not store any user data for training purposes. Tokens sent to the API might be stored in a short-term (few minutes) cache mechanism to speed-up repeated requests. Logs are stored for debugging for up to 30 days. Any additional data in terms of user data or tokens are not stored. 

Serverless Inference API use TLS/SSL to encrypt the data in transit.

## Hub Security

The Hugging Face Hub, which Serverless Inference API is part, is SOC2 Type 2 certified. For more on Hub security: https://huggingface.co/docs/hub/security

<img width="150" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-soc-1.jpg">
