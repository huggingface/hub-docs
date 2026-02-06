# Model(s) Release Checklist

The [Hugging Face Hub](https://huggingface.co/models) is the go-to platform for sharing machine learning models.
A well-executed release can boost your model's visibility and impact. This section covers **essential** steps for a concise, informative, and user-friendly model release.

## ⏳ Preparing Your Model for Release

### Upload Model Weights

When uploading models to the Hub, follow these best practices:

- **Use separate repositories for different model weights**:
   Create individual repositories for each variant of the same architecture. This lets you group them into a [collection](https://huggingface.co/docs/hub/en/collections), which are easier to navigate than directory listings. It also improves visibility because each model has its own URL (`hf.co/org/model-name`), makes search easier, and provides download counts for each one of your models. A great example is the recent [Qwen3-VL collection](https://huggingface.co/collections/Qwen/qwen3-vl) which features various variants of the VL architecture.

- **Prefer [`safetensors`](https://huggingface.co/docs/safetensors/en/index) over `pickle` for weight serialization.**:
   `safetensors` is safer and faster than Python’s `pickle` or `pth`. If you have a `.bin` pickle file, use the [weight conversion tool](https://huggingface.co/docs/safetensors/en/convert-weights) to convert it.

### Write a Comprehensive Model Card

A well-crafted model card (the `README.md` in your repository) is essential for discoverability, reproducibility, and effective sharing. Make sure to cover:

1. **Metadata Configuration**:
   The [metadata section](https://huggingface.co/docs/hub/model-cards#model-card-metadata) (YAML) at the top of your model card is key for search and categorization. Include:
   ```yaml
   ---
   pipeline_tag: text-generation    # Specify the task
   library_name: transformers       # Specify the library
   language:
     - en                           # List languages your model supports
   license: apache-2.0              # Specify a license
   datasets:
     - username/dataset             # List datasets used for training
   base_model: username/base-model  # If applicable (your model is a fine-tune, quantized, merged version of another model)
   tags:                            # Add extra tags which would make the repo searchable using the tag
     - tag1 
     - tag2
   ---
   ```

   If you create the `README.md` in the Web UI, you’ll see a form with the most important metadata fields we recommend 🤗.

   | ![metadata template on the hub ui](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/metadata-template.png) |
   | :--: |
   | Metadata Form on the Hub UI |

2. **Detailed Model Description**:
   Provide a clear explanation of what your model does, its architecture, and its intended use cases. Help users quickly decide if it fits their needs.

3. **Usage Examples**:
   Provide clear, copy-and-run code snippets for inference, fine-tuning, or other common tasks. Keep edits needed by users to a minimum.

   *Bonus*: Add a well-structured `notebook.ipynb` in the repo showing inference or fine-tuning, so users can open it in [Google Colab and Kaggle Notebooks](https://huggingface.co/docs/hub/en/notebooks) directly.

   | ![colab and kaggle button](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/colab-kaggle.png) |
   | :--: |
   | Google and Kaggle Usage Buttons |

4. **Technical Specifications**:
   Include training parameters, hardware needs, and other details that help users run the model effectively.

5. **Performance Metrics**:
   Share benchmarks and evaluation results. Include quantitative metrics and qualitative examples to show strengths and limitations.

6. **Limitations and Biases**:
   Document known limitations, biases, and ethical considerations so users can make informed choices.

To make the process more seamless, click **Import model card template** to pre-fill the `README.md`s with placeholders.

| ![model card template button on the hub ui](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/model-card-template-button.png) | ![model card template on the hub](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/model-card-template.png) |
|:--: | :--: |
| The button to import the model card template | A section of the imported template |

### Enhance Model Discoverability and Usability

To maximize reach and usability:

1. **Library Integration**:
   Add support for one of the many [libraries integrated with the Hugging Face Hub](https://huggingface.co/docs/hub/models-libraries) (such as `transformers`, `diffusers`, `sentence-transformers`, `timm`). This integration significantly increases your model's accessibility and provides users with code snippets for working with your model.
   
   For example, to specify that your model works with the `transformers` library:
   ```yaml
   ---
   library_name: transformers
   ---
   ```

   | ![code snippet tab](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/code-snippet.png) |
   | :--: |
   | Code snippet tab |

   You can also [register your own model library](https://huggingface.co/docs/hub/en/models-adding-libraries) or add Hub support to your library and codebase, so the users know how to download model weights from the Hub.

   We wrote an extensive guide on uploading best practices [here](https://huggingface.co/docs/hub/models-uploading).

   > [!NOTE]
   > Using a registered library also allows you to track downloads of your model over time.

2. **Correct Metadata**:
   - **Pipeline Tag:** Choose the correct [pipeline tag](https://huggingface.co/docs/hub/model-cards#specifying-a-task--pipelinetag-) so your model shows up in the right searches and widgets.

   Examples of common pipeline tags:
   - `text-generation` - For language models that generate text
   - `text-to-image` - For text-to-image generation models
   - `image-text-to-text` - For vision-language models (VLMs) that generate text
   - `text-to-speech` - For models that generate audio from text
  
   - **License:**
   License information is crucial for users to understand how they can use the model.

3. **Research Papers**:
   If your model has associated papers, cite them in the model card. They will be [cross-linked automatically](https://huggingface.co/docs/hub/model-cards#linking-a-paper).

   ```markdown
   ## References
   
   * [Model Paper](https://arxiv.org/abs/xxxx.xxxxx)
   ```

4. **Collections**:
   If you're releasing multiple related models or variants, organize them into a [collection](https://huggingface.co/docs/hub/collections). Collections help users discover related models and understand relationships across versions.

5. **Demos**:
   Create a [Hugging Face Space](https://huggingface.co/docs/hub/spaces) with an interactive demo. This lets users try your model without writing code. You can also [link the model](https://huggingface.co/docs/hub/spaces-config-reference) from the Space to make it appear on the model page UI.

   ```markdown
   ## Demo
   
   Try this model directly in your browser: [Space Demo](https://huggingface.co/spaces/username/model-demo)
   ```
   
   When you create a demo, download the model from its Hub repository (not external sources like Google Drive). This cross-links artifacts and improves visibility

6. **Quantized Versions**:
   Consider uploading quantized versions (for example, GGUF) on a separate repository to improve accessibility for users with limited compute. Link these versions using the [`base_model` metadata field](https://huggingface.co/docs/hub/model-cards#specifying-a-base-model) on the quantized model cards, and document performance differences.

   ```yaml
   ---
   base_model: username/original-model
   base_model_relation: quantized
   ---
   ```

   | ![model tree showcasing relations](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/release-checklist/model-tree.png) |
   | :--: |
   | Model tree showing quantized versions |

7. **Linking Datasets on the Model Page**:
   Link datasets in your metadata so they appear directly on your model page.

   ```yaml
   ---
   datasets:
   - username/dataset
   - username/dataset-2
   ---
   ```

8. **New Model Version**:
   If your model is an update of an existing one, specify it on the older model's card. This will [display a banner](https://huggingface.co/docs/hub/en/model-cards#specifying-a-new-version) on the older page linking to the update.

   ```yaml
   ---
   new_version: username/updated-model
   ---
   ```

9. **Visual Examples**:
   For image or video generation models, include examples directly on your model page using the [`<Gallery>` card component](https://huggingface.co/docs/hub/en/model-cards-components#the-gallery-component).

   ```markdown
   <Gallery>
   ![Example 1](./images/example1.png)
   ![Example 2](./images/example2.png)
   </Gallery>
   ```

10. **Carbon Emissions**:
   If possible, specify the [carbon emissions](https://huggingface.co/docs/hub/model-cards-co2) from training.
   
   ```yaml
   ---
   co2_eq_emissions:
     emissions: 123.45
     source: "CodeCarbon"
     training_type: "pre-training"
     geographical_location: "US-East"
     hardware_used: "8xA100 GPUs"
   ---
   ```

### Access Control and Visibility

1. **Visibility Settings**:
   When ready to share your model, switch it to public in your [model settings](https://huggingface.co/docs/hub/repositories-settings). Before doing so, double-check that all documentation and code examples to ensure they're accurate and complete.

2. **Gated Access**:
   If your model needs controlled access, use the [gated access feature](https://huggingface.co/docs/hub/models-gated) and clearly state the conditions users must meet. This is important for models with dual-use concerns or commercial restrictions.

## 🏁 After Releasing Your Model

A successful model release extends beyond the initial publication. To maintain quality and maximize impact:

### Maintenance and Community Engagement

1. **Verify Functionality**:
   After release, test all code snippets in a clean environment to confirm they work as expected. This ensures users can run your model without errors or confusion.

   For example, if your model is a `transformers` compatible LLM:
   ```python
   from transformers import pipeline

   # This should run without errors
   pipe = pipeline("text-generation", model="your-username/your-model")
   result = pipe("Your test prompt")
   print(result)
   ```

2. **Share Share Share**:
   Most users discover models through social media, chat channels (like Slack or Discord), or newsletters. Share your model links in these spaces, and also add them to your website or GitHub repositories.
   
   The more visits and likes your model receives, the higher it appears on the [Hugging Face Trending section](https://huggingface.co/models?sort=trending), bringing even more visibility

3. **Community Interaction**:
   Use the Community tab to answer questions, address feedback, and resolve issues promptly. Clarify confusion, accept helpful suggestions, and close off-topic threads to keep discussions focused.

### Tracking Usage and Impact

1. **Usage Metrics**:
   [Track downloads](https://huggingface.co/docs/hub/en/models-download-stats) and likes to understand your model’s reach and adoption. You can view total download metrics in your model’s settings.

2. **Review Community Contributions**:
   Regularly check your model’s repository for contributions from other users. Community pull requests and discussions can provide useful feedback, ideas, and opportunities for collaboration.

## 🏢 Enterprise Features

[Hugging Face Team & Enterprise](https://huggingface.co/enterprise) subscription offers additional capabilities for teams and organizations:

1. **Access Control**:
   Set [resource groups](https://huggingface.co/docs/hub/security-resource-groups) to manage access for specific teams or users. This ensures the right permissions and secure collaboration across your organization.

2. **Storage Region**:
   Choose the data storage region (US or EU) for your model files to meet regional data regulations and compliance requirements.

3. **Advanced Analytics**:
   Use [Enterprise Analytics features](https://huggingface.co/docs/hub/enterprise-analytics) to gain deeper insights into model usage patterns, downloads, and adoption trends across your organization.

4. **Extended Storage**:
   Access additional private storage capacity to host more models and larger artifacts as your model portfolio expands.

5. **Organization Blog Posts**:
   Enterprise organizations can now [publish blog articles directly on Hugging Face](https://huggingface.co/blog/huggingface/blog-articles-for-orgs). This lets you share model releases, research updates, and announcements with the broader community, all from your organization’s profile.

By following these guidelines and examples, you’ll make your model release on Hugging Face clear, useful, and impactful. This helps your work reach more people, strengthens the AI community, and increases your model’s visibility.

We can’t wait to see what you share next! 🤗