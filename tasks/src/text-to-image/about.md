
# Text-to-image

## Task Description

Deep learning research has achieved several significant technological advances in the domains of Computer Vision (CV) and Natural Language Processing (NLP) over the past few decades. In these hitherto distinct domains, researchers now seem interested in fusing semantic and visual information. Numerous studies have been done on text-to-image synthesis methods, which convert the textual description (keywords or sentences) that is input into realistic visuals.

## Metrics to evaluate the text-to-image models

### Inception Score (IS)

> The _inception score_ involves using a pre-trained deep learning neural network model for image classification to classify the generated images.
> **Resources**
> [[Paper](https://arxiv.org/pdf/1606.03498.pdf)]
> [[Python Code (Pytorch)](https://github.com/sbarratt/inception-score-pytorch)]
> [[Python Code (Tensorflow)](https://github.com/senmaoy/Inception-Score-FID-on-CUB-and-OXford)]
> [[Ref.Code(AttnGAN)](https://github.com/taoxugit/AttnGAN)]

### Fréchet Inception Distance (FID)

> The Fréchet inception distance (FID) is **a metric used to assess the quality of images created by a generative model**, like a generative adversarial network (GAN).

### R-Precision

> R-precision is defined as the proportion of the top-R retrieved documents that are relevant, where R is the number of relevant documents for the current query.
> **Resources**
> [[Paper](https://openaccess.thecvf.com/content_cvpr_2018/papers/Xu_AttnGAN_Fine-Grained_Text_CVPR_2018_paper.pdf)]
> [[Ref.Code(CPGAN)](https://github.com/dongdongdong666/CPGAN)]

### L `<sub>`2 error

> L2 loss, also known as Squared Error Loss, is the squared difference between a prediction and the actual value, calculated for each example in a dataset
> **Resources**
> [[Paper](https://papers.nips.cc/paper/7290-text-adaptive-generative-adversarial-networks-manipulating-images-with-natural-language.pdf)]

### Learned Perceptual Image Patch Similarity (LPIPS)

> Evaluate the distance between image patches. Higher means further/more different. Lower means more similar.
> **Resources**
> [[Paper](https://arxiv.org/abs/1801.03924)]
> [[Python Code](https://github.com/richzhang/PerceptualSimilarity)]
>
