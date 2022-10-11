## Use Cases

Document question answering models can be used to extract information directly from document images. 

### Document Parsing

You can use Document question answering models to parse forms. For example, you can extract the name, address, and other information from a form. You can also use the model to extract information from a table, or even a resume.

### Invoice Information Extraction

You can use Document question answering models to extract information from invoices. For example, you can extract the invoice number, the invoice date, the total amount, the VAT number, and the invoice recipient.

## Inference

You can infer with Document QA models with the 🤗 Transformers library using the [`document-question-answering` pipeline](https://huggingface.co/docs/transformers/en/main_classes/pipelines#transformers.DocumentQuestionAnsweringPipeline). If no model checkpoint is given, the pipeline will be initialized with [`impira/layoutlm-document-qa`](https://huggingface.co/impira/layoutlm-document-qa). This pipeline answers the question(s) given as inputs by using the document(s). A document is defined as an image and an optional list of (word, box) tuples which represent the text in the document. If the word_boxes are not provided, it will use the Tesseract OCR engine (if available) to extract the words and boxes automatically for LayoutLM-like models which require them as input. For Donut, no OCR is run.

```python
from transformers import pipeline
from PIL import Image

pipe = pipeline("document-question-answering", model="naver-clova-ix/donut-base-finetuned-docvqa")

question = "What is the purchase amount?"
image = Image.open("your-document.png")

pipe(image=image, question=question)

## [{'answer': '20,000$'}]
```

## Useful Resources

Would you like to learn more about Document QA? Awesome! Here are some curated resources that you may find helpful!

- [Document Visual Question Answering (DocVQA) challenge](https://rrc.cvc.uab.es/?ch=17)
- [DocVQA: A Dataset for Document Visual Question Answering](https://arxiv.org/abs/2007.00398) (Dataset paper)
- [ICDAR 2021 Competition on Document Visual Question Answering](https://lilianweng.github.io/lil-log/2020/10/29/open-domain-question-answering.html) (Conference paper)
- [HuggingFace's Document Question Answering pipeline](https://huggingface.co/docs/transformers/en/main_classes/pipelines#transformers.DocumentQuestionAnsweringPipeline)
- [Github repo: DocQuery - Document Query Engine Powered by Large Language Models](https://github.com/impira/docquery)

### Notebooks

- [Fine-tuning Donut on DocVQA dataset](https://github.com/NielsRogge/Transformers-Tutorials/tree/0ea77f29d01217587d7e32a848f3691d9c15d6ab/Donut/DocVQA)
- [Fine-tuning LayoutLMv2 on DocVQA dataset](https://github.com/NielsRogge/Transformers-Tutorials/tree/1b4bad710c41017d07a8f63b46a12523bfd2e835/LayoutLMv2/DocVQA)

