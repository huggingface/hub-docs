## For API-Inference docs:

From https://github.com/huggingface/hub-docs/pull/1413:
* Use `<inference> for getting started
* Add some screenshots: supported models
* Add flow chart of how API works
* Add table with all tasks
* Add missing tasks: depth estimation and zero shot image classification
* Some tasks have no warm models, should we remove them for now? E.g. https://huggingface.co/models?inference=warm&pipeline_tag=fill-mask&sort=trending BUT many are cold and working, so actually linking to both could make sense - internal issue https://github.com/huggingface-internal/moon-landing/issues/10966
* See also this [google doc](https://docs.google.com/document/d/1xy5Ug4C_qGbqp4x3T3rj_VOyjQzQLlyce-L6I_hYi94/edit?usp=sharing)
* Add CI to auto-generate the docs when handlebars template are updated