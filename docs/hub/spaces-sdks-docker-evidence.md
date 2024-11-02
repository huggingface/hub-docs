# Evidence on Spaces

**Evidence** is an open-source framework designed for building data-driven applications, reports, and dashboards using SQL and Markdown. With Evidence, you can quickly create decision-support tools, reports, and interactive dashboards without relying on traditional drag-and-drop business intelligence (BI) platforms. 

Evidence enables you to:
- Write reports and dashboards directly in Markdown with SQL-backed components.
- Integrate data from multiple sources, including SQL databases and APIs.
- Use templated pages to automatically generate multiple pages based on a single template.
- Deploy reports seamlessly to various hosting solutions.

Visit [Evidence’s documentation](https://docs.evidence.dev/) for guides, examples, and best practices for using Evidence to create data products.

## Deploy Evidence on Spaces

You can deploy Evidence on Hugging Face Spaces with just a few clicks:

<a  href="https://huggingface.co/spaces/evidence-dev/template-app">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>

Once created, the Space will display `Building` status. Refresh the page if the status doesn't automatically update to `Running`.

Your Evidence app will automatically be deployed on Hugging Face Spaces. 

## Editing your Evidence app from the CLI

To edit your app, clone the Space and edit the files locally.

```bash
git clone https://huggingface.co/spaces/your-username/your-space-name 
cd your-space-name
npm install
npm run sources
npm run dev
```

You can then modify pages/index.md to change the content of your app.

## Editing your Evidence app from VS Code

The easiest way to develop with Evidence is using the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Evidence.evidence-vscode):

1. Install the extension from the VS Code Marketplace
2. Open the Command Palette (Ctrl/Cmd + Shift + P) and enter `Evidence: Copy Existing Project`
3. Paste the URL of the Hugging Face Spaces Evidence app you'd like to copy (e.g. `https://huggingface.co/spaces/your-username/your-space-name`) and press Enter
4. Select the folder you'd like to clone the project to and press Enter
5. Press `Start Evidence` in the bottom status bar

Check out the docs for [alternative install methods](https://docs.evidence.dev/getting-started/install-evidence), Github Codespaces, and alongside dbt.

## Learning More

- [Docs](https://docs.evidence.dev/)
- [Github](https://github.com/evidence-dev/evidence)
- [Slack Community](https://slack.evidence.dev/)
- [Evidence Home Page](https://www.evidence.dev)