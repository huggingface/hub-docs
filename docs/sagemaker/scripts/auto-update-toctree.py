import glob
import os
from pathlib import Path


def update_toctree_yaml():
    output_file = "source/_toctree.yml"
    dirnames = ["sagemaker-sdk"]

    with open(output_file, "a") as f:
        f.write("# GENERATED CONTENT DO NOT EDIT!\n")
        f.write("- title: Examples\n")
        f.write("  sections:\n")

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
            f.write("     - title: SageMaker SDK\n")
            # f.write(f"       local: examples/{dirname}-index\n")
            f.write("       isExpanded: true\n")

            for idx, (base, title) in enumerate(file_entries):
                if idx == 0:
                    f.write("       sections:\n")
                f.write(f"          - local: examples/{base}\n")
                f.write(f'            title: "{title}"\n')

        f.write("# END GENERATED CONTENT\n")


if __name__ == "__main__":
    update_toctree_yaml()
