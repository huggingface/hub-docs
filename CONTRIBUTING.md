Documentation Quality Checks
----------------------------

To maintain consistent, reliable documentation, we will now validate markdown files with these two tools:

-   **markdownlint:** this ensures consistent Markdown formatting

-   **lychee:** checks for broken external links

The system will automatically run these checks in CI on every pull request.\
You can also run them locally before submitting your PR.

### **1\. Install markdownlint**

`npm install -g markdownlint-cli`

Run it:

`markdownlint "**/*.md" --config .markdownlint.json`

### **2\. Install and run lychee (link checker)**

#### Install (Rust-based)

`cargo install lychee-cli`

#### Run it:

`lychee --config lychee.toml ./`

### **3\. Before opening a PR**

Run:

`markdownlint "**/*.md"
lychee ./`

Fix any issues shown in the terminal.

This ensures your PR passes CI and keeps our docs consistent.
