# Environment Datasets

Environment datasets are dataset repositories that can be used to create environments for training and evaluation. When a dataset includes a valid `environment.yaml`, the Hub shows an Environment badge, adds framework/library chips for supported frameworks, generates usage snippets, and exposes the parsed declarations at:

```text
/api/datasets/{repo_id}/environments
```

## Add environment.yaml

Add `environment.yaml` to the root of the dataset repository:

```yaml
spec_version: hf-env-0.1
environments:
  - id: terminal-bench-2
    title: Terminal-Bench 2.0
    config_name: harbor_tasks
    splits: [train, validation]
    frameworks:
      harbor:
        min_version: ">=0.1.0"
      verifiers:
        min_version: ">=0.1.14"
        adapter: verifiers.v1.packages.tasksets.HarborTaskset
```

Required top-level fields:

- `spec_version`: currently `hf-env-0.1`.
- `environments`: a non-empty list of environment declarations.

Required per-environment fields:

- `id`: a stable identifier within the dataset repository.
- `frameworks`: one or more supported framework declarations.

Optional per-environment fields:

- `title`: display name for the environment.
- `config_name`: matching Dataset Viewer or `datasets.load_dataset` config.
- `splits`: valid split names for the environment subset.
- `dataset`: repo, config, split, path, or index locations.
- `runtime`: isolation, resource, network, and secret expectations.
- `reward`: scalar or object reward convention.

## Supported Frameworks

The v1 manifest supports `harbor`, `verifiers`, and `openenv`.

### Harbor

Use `harbor` for filesystem task bundles. A Harbor task directory contains `instruction.md` and `task.toml`, with optional runtime files such as `environment/Dockerfile`, `tests/test.sh`, and `solution/solve.sh`.

The Hub can generate a command like:

```shell
harbor run \
    --dataset hf://datasets/harborframework/terminal-bench-2.0/terminal-bench-2 \
    --agent oracle
```

### Verifiers

Use `verifiers` for Dataset Viewer-compatible row tables. Rows should contain either `prompt` chat messages or a `question` string. Optional fields include `answer`, `info`, `task_id`, `system_prompt`, `max_turns`, `sandbox`, `program`, and `toolsets`.

```python
import verifiers as vf

taskset = vf.HarborTaskset(
    config=vf.HarborTasksetConfig(
        dataset="hf://datasets/harborframework/terminal-bench-2.0",
        split="train",
    )
)
env = vf.Env(taskset=taskset, harness=vf.OpenCode())
```

### OpenEnv

Use `openenv` for an OpenEnv runtime package, Space, or container image. For a Space-backed environment:

```yaml
spec_version: hf-env-0.1
environments:
  - id: coding-env
    frameworks:
      openenv:
        manifest: openenv.yaml
        mode: space
        space_id: openenv/coding_env
```

```python
from openenv import AutoEnv

env = AutoEnv.from_env("openenv/coding_env", trust_remote_code=False)
```

For a container-backed environment, use `mode: container` and provide an `image`:

```yaml
openenv:
  manifest: openenv.yaml
  mode: container
  image: registry/repo:tag
```
