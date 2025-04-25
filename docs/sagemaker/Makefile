.PHONY: docs clean help

docs: clean
	@echo "Processing README.md files from examples/gke, examples/cloud-run, and examples/vertex-ai..."
	@mkdir -p source/examples
	@echo "Converting Jupyter Notebooks to MDX..."
	@doc-builder notebook-to-mdx notebooks/sagemaker-sdk/
	@echo "Auto-generating example files for documentation..."
	@python scripts/auto-generate-examples.py
	@echo "Cleaning up generated Markdown Notebook files..."
	@find notebooks/sagemaker-sdk -name "sagemaker-notebook.md" -type f -delete
	@echo "Generating YAML tree structure and appending to _toctree.yml..."
	@python scripts/auto-update-toctree.py
	@echo "YAML tree structure appended to docs/source/_toctree.yml"
	@echo "Documentation setup complete."

clean:
	@echo "Cleaning up generated documentation..."
	@rm -rf source/examples
	@awk '/^# GENERATED CONTENT DO NOT EDIT!/,/^# END GENERATED CONTENT/{next} {print}' source/_toctree.yml > source/_toctree.yml.tmp && mv source/_toctree.yml.tmp source/_toctree.yml
	@echo "Cleaning up generated Markdown Notebook files (if any)..."
	@find notebooks/sagemaker-sdk -name "sagemaker-notebook.md" -type f -delete
	@echo "Cleanup complete."

serve:
	@echo "Serving documentation via doc-builder"
	doc-builder preview sagemaker source/ --not_python_module

help:
	@echo "Usage:"
	@echo "  make docs   - Auto-generate the examples for the docs"
	@echo "  make clean  - Remove the auto-generated docs"
	@echo "  make help   - Display this help message"

