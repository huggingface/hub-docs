# Static HTML Spaces

Spaces also accommodate custom HTML for your app instead of using Streamlit or Gradio. Set `sdk: static` inside the `YAML` block at the top of your Spaces **README.md** file. Then you can place your HTML code within an **index.html** file.

Here are some examples of Spaces using custom HTML:

* [Smarter NPC](https://huggingface.co/spaces/mishig/smarter_npc): Display a PlayCanvas project with an iframe in Spaces.
* [Huggingfab](https://huggingface.co/spaces/pierreant-p/huggingfab): Display a Sketchfab model in Spaces.

## Space variables

Custom [environment variables](./spaces-overview#managing-secrets) can be passed to your Space. OAuth information such as the client ID and scope are also available as environment variables, if you have [enabled OAuth](./spaces-oauth) for your Space.

To use these variables in JavaScript, you can use the `window.huggingface.variables` object. For example, to access the `OAUTH_CLIENT_ID` variable, you can use `window.huggingface.variables.OAUTH_CLIENT_ID`.

Here is an example of a Space using custom environment variables and oauth enabled and displaying the variables in the HTML:

* [Static Variables](https://huggingface.co/spaces/huggingfacejs/static-variables)