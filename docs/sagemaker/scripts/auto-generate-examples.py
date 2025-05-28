import os
import re

BRANCH_NAME = os.getenv("SAGEMAKER_BRANCH", "main")


def process_readme_files():
    print(
        "Processing README.md files generated from the Jupyter Notebooks in docs/sagemaker/notebooks/sagemaker-sdk..."
    )
    os.makedirs("source/examples", exist_ok=True)

    # NOTE: at the moment only `sagemaker-sdk` but left here to easily include new files from other sources
    for dirname in {"sagemaker-sdk"}:
        for root, _, files in os.walk(f"notebooks/{dirname}"):
            for file in files:
                if file == "sagemaker-notebook.md":
                    process_file(root, file, dirname)


def process_file(root, file, dirname):
    parsed_dirname = (
        dirname if not dirname.__contains__("/") else dirname.replace("/", "-")
    )

    file_path = os.path.join(root, file)
    subdir = root.replace(f"notebooks/{dirname}/", "")
    base = os.path.basename(subdir)

    # NOTE: temporarily disabled
    if file_path == f"examples/{dirname}/README.md":
        target = f"source/examples/{parsed_dirname}-index.mdx"
    else:
        target = f"source/examples/{parsed_dirname}-{base}.mdx"

    print(f"Processing {file_path} to {target}")
    with open(file_path, "r") as f:
        content = f.read()

    # For Juypter Notebooks, remove the comment i.e. `<!--` and the `--!>` but keep the metadata
    content = re.sub(r"<!-- (.*?) -->", r"\1", content, flags=re.DOTALL)

    # Replace image and link paths
    content = re.sub(
        r"\(\./(imgs|assets)/([^)]*\.png)\)",
        rf"(https://raw.githubusercontent.com/huggingface/hub-docs/refs/heads/{BRANCH_NAME}/docs/sagemaker/"
        + root
        + r"/\1/\2)",
        content,
    )
    content = re.sub(
        r"\(\.\./([^)]+)\)",
        rf"(https://github.com/huggingface/hub-docs/tree/{BRANCH_NAME}/docs/sagemaker/notebooks/"
        + dirname
        + r"/\1)",
        content,
    )
    content = re.sub(
        r"\(\.\/([^)]+)\)",
        rf"(https://github.com/huggingface/hub-docs/tree/{BRANCH_NAME}/docs/sagemaker/"
        + root
        + r"/\1)",
        content,
    )

    def replacement(match):
        block_type = match.group(1)
        content = match.group(2)

        # Remove '> ' from the beginning of each line
        lines = [line[2:] for line in content.split("\n") if line.strip()]

        # Determine the Tip type
        tip_type = " warning" if block_type == "WARNING" else ""

        # Construct the new block
        new_block = f"<Tip{tip_type}>\n\n"
        new_block += "\n".join(lines)
        new_block += "\n\n</Tip>\n"

        return new_block

    # Regular expression to match the specified blocks
    pattern = r"> \[!(NOTE|WARNING)\]\n((?:>.*(?:\n|$))+)"

    # Perform the transformation
    content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

    # Remove any remaining '>' or '> ' at the beginning of lines
    content = re.sub(r"^>[ ]?", "", content, flags=re.MULTILINE)

    # Check for remaining relative paths
    if re.search(r"\(\.\./|\(\./", content):
        print("WARNING: Relative paths still exist in the processed file.")
        print(
            "The following lines contain relative paths, consider replacing those with GitHub URLs instead:"
        )
        for i, line in enumerate(content.split("\n"), 1):
            if re.search(r"\(\.\./|\(\./", line):
                print(f"{i}: {line}")
    else:
        print("No relative paths found in the processed file.")

    # Calculate the example URL
    example_url = f"https://github.com/huggingface/hub-docs/tree/{BRANCH_NAME}/{root}"
    if file.__contains__("sagemaker-notebook"):
        example_url += "/sagemaker-notebook.ipynb"

    # Add the final note
    content += f"\n\n---\n<Tip>\n\n📍 Find the complete example on GitHub [here]({example_url})!\n\n</Tip>"

    with open(target, "w") as f:
        f.write(content)


if __name__ == "__main__":
    process_readme_files()
