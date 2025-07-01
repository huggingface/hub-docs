# Static HTML Spaces

Spaces also accommodate custom HTML for your app instead of using Streamlit or Gradio. Set `sdk: static` inside the `YAML` block at the top of your Spaces **README.md** file. Then you can place your HTML code within an **index.html** file.

Here are some examples of Spaces using custom HTML:

* [Smarter NPC](https://huggingface.co/spaces/mishig/smarter_npc): Display a PlayCanvas project with an iframe in Spaces.
* [Huggingfab](https://huggingface.co/spaces/pierreant-p/huggingfab): Display a Sketchfab model in Spaces.
* [Diffuse the rest](https://huggingface.co/spaces/huggingface-projects/diffuse-the-rest): Draw and diffuse the rest

## Adding a build step before serving

Static Spaces support adding a custom build step before serving your static assets. This is useful for frontend frameworks like React, Svelte and Vue that require a build process before serving the application. The build command runs automatically when your Space is updated.

Add `app_build_command` inside the `YAML` block at the top of your Spaces **README.md** file, and `app_file`.

For example:
- `app_build_command: npm run build`
- `app_file: dist/index.html`

Example spaces: 

- [Svelte App](https://huggingface.co/spaces/julien-c/vite-svelte)
- [React App](https://huggingface.co/spaces/coyotte508/static-vite)


Under the hood, it will [launch a build](https://huggingface.co/spaces/huggingface/space-build), storing the generated files in a special `refs/convert/build` ref.

## Space variables

Custom [environment variables](./spaces-overview#managing-secrets) can be passed to your Space. OAuth information such as the client ID and scope are also available as environment variables, if you have [enabled OAuth](./spaces-oauth) for your Space.

To use these variables in JavaScript, you can use the `window.huggingface.variables` object. For example, to access the `OAUTH_CLIENT_ID` variable, you can use `window.huggingface.variables.OAUTH_CLIENT_ID`.

Here is an example of a Space using custom environment variables and oauth enabled and displaying the variables in the HTML:

* [Static Variables](https://huggingface.co/spaces/huggingfacejs/static-variables)