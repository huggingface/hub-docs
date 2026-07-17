import glob
import os
from pathlib import Path
import re
import subprocess


def get_git_date(file_path: str) -> str | None:
    """Return a file's most recent Git commit date as YYYY-MM-DD."""
    if not os.path.exists(file_path):
        return None

    try:
        date = subprocess.check_output(
            ["git", "log", "-1", "--format=%ad", "--date=short", "--", file_path],
            stderr=subprocess.STDOUT,
            text=True,
        ).strip()
    except (OSError, subprocess.CalledProcessError):
        return None

    return date or None


def parse_metadata(content: str) -> dict[str, str]:
    """Parse a YAML-like metadata block, optionally wrapped in an HTML comment."""
    metadata_match = re.search(
        r"^\s*(?:<!--\s*)?---\s*\n(.*?)\n---\s*(?:\s*-->)?",
        content,
        re.DOTALL | re.MULTILINE,
    )
    if not metadata_match:
        return {}

    return {
        key.strip(): value.strip()
        for key, value in re.findall(r"(\w+):\s*(.+)", metadata_match.group(1))
    }


def strip_metadata_block(content: str) -> str:
    """Remove the first YAML-like metadata block from generated MDX."""
    return re.sub(
        r"^\s*(?:<!--\s*)?---\s*\n.*?\n---\s*(?:\s*-->)?\s*\n",
        "",
        content,
        count=1,
        flags=re.DOTALL | re.MULTILINE,
    ).strip()


def get_notebook_path(file_path: str, dirname: str) -> str:
    """Return the source notebook corresponding to a generated example page."""
    prefix = f"{dirname}-"
    base_name = Path(file_path).stem
    if base_name.startswith(prefix):
        base_name = base_name.removeprefix(prefix)
    return f"notebooks/{dirname}/{base_name}/sagemaker-notebook.ipynb"


def inject_author_date(content: str, author: str | None, date: str | None) -> str:
    """Place optional author and update details immediately below the H1."""
    details = []
    if author:
        details.append(f"<small>Written by {author}</small>")
    if date:
        details.append(f"<small>Last updated {date}</small>")
    if not details:
        return content

    match = re.search(r"^(# .+)$", content, re.MULTILINE)
    if not match:
        return content

    author_date = f"<p>{'<br>'.join(details)}</p>"
    return content[: match.end()] + f"\n\n{author_date}" + content[match.end() :]


def process_example_metadata(file_path: str, dirname: str) -> str:
    """Remove source metadata and add author/date information to an example."""
    with open(file_path, "r+") as mdx_file:
        content = mdx_file.read()
        metadata = parse_metadata(content)
        content = strip_metadata_block(content)
        content = inject_author_date(
            content,
            metadata.get("author") or metadata.get("authors"),
            get_git_date(get_notebook_path(file_path, dirname)),
        )

        mdx_file.seek(0)
        mdx_file.write(content + "\n")
        mdx_file.truncate()

    return content


def update_toctree_yaml():
    input_file = "source/_toctree.yml"
    output_file = "source/_toctree.yml"
    dirnames = ["sagemaker-sdk"]

    # Read the existing content
    with open(input_file, "r") as f:
        content = f.read()

    # Find the position between tutorials and reference sections
    tutorials_end = content.find(
        "- sections:\n    - local: reference/inference-toolkit"
    )
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
            content = process_example_metadata(file_path, dirname)
            title_match = re.search(r"^# (.+)", content, re.MULTILINE)
            if title_match:
                title = title_match.group(1).strip()
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
    updated_content = (
        content[:tutorials_end]
        + "\n"
        + "\n".join(new_content)
        + "\n"
        + content[tutorials_end:]
    )

    # Write the updated content back to the file
    with open(output_file, "w") as f:
        f.write(updated_content)


if __name__ == "__main__":
    update_toctree_yaml()
