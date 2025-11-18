# Documentation updates aligned with recent changelog entries

## Hugging Face Hub docs

1. **SSO / Okta** – Mention that the official Hugging Face App now exists on the Okta Integration Network with a pre-validated SAML configuration (OIDC/SCIM/JIT coming soon) so organizations can add it from the network instead of building a generic app.
2. **Community tab** – Document that repo owners can set the default sorting of their Discussions/PRs (Trending / Most Reactions / Recently Created) and describe the emoji autocomplete (`:` trigger) when writing comments.
3. **Repository storage** – Note that the Files & Versions tab in repo views now displays the total size of the current branch/folder in near real-time.
4. **Dataset Viewer** – Add guidance about the new inline JSON rendering (expandable structures, copyable text) and link to representative datasets such as `interstellarninja/hermes_reasoning_tool_use`.
5. **GGUF** – Describe the GGUF Metadata Editor (shown via the “GGUF Editor” label for files up to 10 GB) that lets you edit metadata fields like chat templates in-browser using Xet.
6. **Models landing page** – Highlight the expanded filters on the Models page (tasks, parameter count, library, supported applications, inference providers) so explorers know how to narrow results before opening a repo.
7. **Paper Pages** – Explain how authors can tag organizations when submitting papers, mention the org-specific `/papers` pages, and cover the Trending Papers carousel plus AI-generated one-sentence abstracts on Daily Papers.
8. **Organizations overview** – Clarify that a settings-level context switcher lets users toggle between their personal account and each organization, and mention the new profile repository listing pages on user/org profiles.
9. **ZeroGPU/Jobs** – Introduce the new `hf jobs run …` service for scalable compute jobs (CPU/GPU, billed by second) alongside ZeroGPU in the advanced compute docs.
10. **Xet introduction** – Call out that new users/orgs default onto Xet storage, include the `hf.co/join/xet` migration link, and mention the >25 % traffic stat to reinforce adoption.

## Inference providers docs

11. **Pricing / billing** – Document the Enterprise-level Inference Providers dashboard accessible via organization settings for detailed usage/cost tracking across providers and team members.

These notes match the entries on `hf.co/changelog`; implement them where the referenced docs live.
