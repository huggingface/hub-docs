# Spaces Configuration Reference

Spaces are configured through the `YAML` block at the top of the **README.md** file at the root of the repository. All the accepted parameters are listed below.

**`title`** : _string_
Display title for the Space.

**`emoji`** : _string_
Space emoji (emoji-only character allowed).

**`colorFrom`** : _string_
Color for Thumbnail gradient (red, yellow, green, blue, indigo, purple, pink, gray).

**`colorTo`** : _string_
Color for Thumbnail gradient (red, yellow, green, blue, indigo, purple, pink, gray).

**`sdk`** : _string_
Can be either `gradio`, `streamlit` or `static`.

**`python_version`**: _string_
Any valid Python `3.x` or `3.x.x` version.
Defaults to `3.8.9`.

**`sdk_version`** : _string_
Specify the version of the selected SDK (Streamlit or Gradio).
All versions of Gradio are supported.
Streamlit versions are supported from `0.79.0` to `1.2.0`.

**`app_file`** : _string_
Path to your main application file (which contains either `gradio` or `streamlit` Python code, or `static` html code).
Path is relative to the root of the repository.

**`models`** : _List[string]_
HF model IDs (like `gpt2` or `deepset/roberta-base-squad2`) used in the Space.
Will be parsed automatically from your code if not specified here.

**`datasets`** : _List[string]_
HF dataset IDs (like `common_voice` or `oscar-corpus/OSCAR-2109`) used in the Space.
Will be parsed automatically from your code if not specified here.

**`pinned`** : _boolean_
Whether the Space stays on top of your profile. Can be useful if you have a lot of Spaces so you and others can quickly see your best Space.
