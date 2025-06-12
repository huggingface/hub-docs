# How-to: Automatically assign new repos to a Resource Group (TypeScript)

<Tip warning={true}>
Resource Groups are part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Organizations using Resource Groups for fine-grained access control may want to ensure that every new repository is automatically assigned to a default resource group. This is crucial for maintaining security and compliance, as it prevents new repos from being unassigned and potentially accessible to the wrong members.

This guide will walk you through setting up an automated system using **Hub Webhooks** and a **Hugging Face Space** to listen for new repository creation events and assign them to a specified Resource Group. This version of the guide uses a TypeScript and Node.js stack.

### Prerequisites

*   **Admin access** to an Enterprise Hub organization.
*   A **Resource Group** already created within your organization.
*   A Hugging Face **User Access Token** with `write` or `admin` permissions for the organization. You can create one in your [settings](https://huggingface.co/settings/tokens).

### Step 1: Create the Webhook Listener Space

We need a service to listen for webhook events and perform an action. A Docker Space running a simple [Express.js](https://expressjs.com/) application is perfect for this.

1.  **Create a new Docker Space**. You can do this from the [new Space page](https://huggingface.co/new-space). Choose "Docker" as the Space SDK.

2.  Create a `package.json` file to manage dependencies:

    ```json
    {
      "name": "resource-group-assigner",
      "version": "1.0.0",
      "description": "Assigns new repos to a resource group",
      "main": "server.ts",
      "scripts": {
        "start": "ts-node-dev --respawn server.ts"
      },
      "author": "",
      "license": "Apache-2.0",
      "dependencies": {
        "express": "^4.19.2",
        "node-fetch": "^3.3.2"
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.12.12",
        "ts-node-dev": "^2.0.0",
        "typescript": "^5.4.5"
      }
    }
    ```

3.  Create a `server.ts` file. This code sets up a web server that listens for incoming webhooks.

    ```typescript
    import express, { Request, Response, NextFunction } from 'express';
    import fetch from 'node-fetch';

    // --- Configuration ---
    // Load from Space secrets
    const { WEBHOOK_SECRET, HF_TOKEN, RESOURCE_GROUP_ID, HF_ENDPOINT } = process.env;
    const HUB_URL = HF_ENDPOINT || "https://huggingface.co";

    if (!WEBHOOK_SECRET || !HF_TOKEN || !RESOURCE_GROUP_ID) {
      throw new Error("Missing one or more required environment variables: WEBHOOK_SECRET, HF_TOKEN, RESOURCE_GROUP_ID");
    }

    const app = express();
    app.use(express.json());

    // --- Webhook validation middleware ---
    const validateWebhook = (req: Request, res: Response, next: NextFunction) => {
      const webhookSecret = req.header("X-Webhook-Secret");
      if (!webhookSecret) {
        return res.status(400).send("X-Webhook-Secret header is missing");
      }
      if (webhookSecret !== WEBHOOK_SECRET) {
        return res.status(401).send("Invalid webhook secret");
      }
      next();
    };

    // --- Webhook endpoint ---
    app.post("/webhook", validateWebhook, async (req: Request, res: Response) => {
      const payload = req.body;

      // Check if it's a repo creation event
      if (payload.event?.action === "create" && payload.event?.scope === "repo") {
        const repo = payload.repo;
        if (!repo?.name || !repo?.type) {
          return res.status(400).json({ status: "error", message: "Missing repo info in payload" });
        }
        
        const repoId = repo.name;
        // repo.type is one of "model", "dataset", "space". The API endpoint needs it plural.
        const repoTypePlural = repo.type + "s"; 

        console.log(`New repository created: ${repoId} (type: ${repo.type}). Assigning to resource group.`);

        try {
          const apiRes = await fetch(`${HUB_URL}/api/${repoTypePlural}/${repoId}/resource-group`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HF_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ resourceGroupId: RESOURCE_GROUP_ID }),
          });

          if (!apiRes.ok) {
            const errorBody = await apiRes.text();
            throw new Error(`API request failed with status ${apiRes.status}: ${errorBody}`);
          }
          
          console.log(`Successfully assigned ${repoId} to resource group ${RESOURCE_GROUP_ID}.`);
          return res.status(200).json({ status: "success" });
        } catch (e) {
          const error = e as Error;
          console.error(`Error assigning repo to resource group: ${error.message}`);
          return res.status(500).json({ status: "error", message: `Failed to assign repo to resource group: ${error.message}` });
        }
      }

      return res.status(200).json({ status: "event_not_handled" });
    });

    app.get("/", (req: Request, res: Response) => {
      res.send("Webhook listener is running.");
    });

    const PORT = process.env.PORT || 7860;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```
    
    *Note: We are calling the Hub's REST API endpoint directly with `fetch` to assign the repository to a resource group.*

4.  Create a `Dockerfile`.

    ```Dockerfile
    FROM node:18-slim
    
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    ENV PORT=7860
    EXPOSE 7860
    
    CMD ["npm", "start"]
    ```

5.  **Add Secrets to your Space.** Go to your Space's **Settings** tab and add the following secrets:
    *   `HF_TOKEN`: Your Hugging Face User Access Token.
    *   `WEBHOOK_SECRET`: A long, random string you create. This will be used to secure your webhook.
    *   `RESOURCE_GROUP_ID`: The ID of the resource group you want to assign repos to (see next step).

    <div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-secrets-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-secrets-dark.png"/>
    </div>

### Step 2: Get your Resource Group ID

Navigate to your organization's settings page, then to the **Resource Groups** tab. Click on the resource group you want to use as the default. The ID is the last part of the URL in your browser's address bar.

For example, if the URL is `https://huggingface.co/organizations/my-org/settings/resource-groups/657a1b...`, then your `RESOURCE_GROUP_ID` is `657a1b...`.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-id-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-id-dark.png"/>
</div>

Copy this ID and add it as the `RESOURCE_GROUP_ID` secret in your Space.

### Step 3: Create the Webhook

Now, let's create the webhook that will trigger our Space.

1.  Go to your **organization's settings** page and click on the **Webhooks** tab.
2.  Click **Add a new webhook**.
3.  For **Target repositories**, enter `*` to watch all repositories in the organization.
4.  For the **Webhook URL**, enter the direct URL of your Space, followed by `/webhook`. For example: `https://your-user-your-space-name.hf.space/webhook`.
5.  For the **Secret**, enter the same value you used for the `WEBHOOK_SECRET` in your Space.
6.  Under **"Which events would you like to trigger this webhook?"**, select only **Repo**.
7.  Click **Add webhook**.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-webhook-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/resource-group-webhook-dark.png"/>
</div>

### Step 4: Test it!

You're all set! To test the integration:

1.  Create a new model, dataset, or Space in your organization.
2.  Check the logs of your listener Space. You should see an incoming request and a confirmation message that the repo was assigned.
3.  Go to the settings of the newly created repository. It should now be assigned to your target resource group.

You can also check the **Activity** tab of your webhook's settings to see the history of events sent and debug any issues.

### Conclusion

You have successfully set up an automated system to assign any new repository in your organization to a default resource group. This ensures better access control management and compliance from the moment a repository is created. You can extend the logic in the listener Space to handle more complex scenarios, such as assigning repositories to different resource groups based on their name or type.
