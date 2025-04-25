import glob
import os
import re
from pathlib import Path


def update_toctree_yaml():
    input_file = "source/_toctree.yml"
    output_file = "source/_toctree.yml"
    dirnames = ["sagemaker-sdk"]

    # Read the existing content
    with open(input_file, "r") as f:
        content = f.read()

    # Find the position between tutorials and reference sections
    tutorials_end = content.find("- sections:\n    - local: reference/inference-toolkit")
    if tutorials_end == -1:
        print("Error: Could not find the reference section in the file")
        return

    # Generate the new content
    new_content = []
    new_content.append("# GENERATED CONTENT DO NOT EDIT!")
    new_content.append("- title: Examples")
    new_content.append("  sections:")

    for dirname in dirnames:
        # Get sorted files excluding index
        files = sorted(glob.glob(f"source/examples/{dirname}-*.mdx"))
        files = [f for f in files if not f.endswith(f"{dirname}-index.mdx")]

        file_entries = []
        for file_path in files:
            with open(file_path, "r") as mdx_file:
                first_line = mdx_file.readline().strip()
                if first_line.startswith("# "):
                    title = first_line[2:].strip()
                    base_name = Path(file_path).stem
                    file_entries.append((base_name, title))
                else:
                    print(f"⚠️ Skipping {Path(file_path).name} - missing H1 title")
                    continue

        # Write directory section
        new_content.append("     - title: SageMaker SDK")
        new_content.append("       isExpanded: false")

        for idx, (base, title) in enumerate(file_entries):
            if idx == 0:
                new_content.append("       sections:")
            new_content.append(f"          - local: examples/{base}")
            new_content.append(f'            title: "{title}"')

    new_content.append("# END GENERATED CONTENT")

    # Insert the new content
    updated_content = content[:tutorials_end] + "\n" + "\n".join(new_content) + "\n" + content[tutorials_end:]

    # Write the updated content back to the file
    with open(output_file, "w") as f:
        f.write(updated_content)


if __name__ == "__main__":
    update_toctree_yaml()
