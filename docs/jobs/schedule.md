# Schedule Jobs

Schedule and manage jobs that will run on HF infrastructure.

Use `hf jobs uv run ` or [`hf jobs run`] with a schedule of `@annually`, `@yearly`, `@monthly`, `@weekly`, `@daily`, `@hourly`, or a CRON schedule expression (e.g., `"0 9 * * 1"` for 9 AM every Monday):

```bash
# Schedule a job that runs every hour
>>> hf jobs scheduled uv run @hourly python -c "print('This runs every hour!')"

# Use the CRON syntax
>>> hf jobs scheduled uv run "*/5 * * * *" python -c "print('This runs every five minutes!')"

# Schedule with GPU
>>> hf jobs scheduled uv run --flavor a10g-small --with torch @hourly python -c 'import torch; print(f"This code ran with the following GPU: {torch.cuda.get_device_name()}")'

# Schedule with a Docker image
>>> hf jobs scheduled run @hourly python:3.12 python -c "print('This runs every hour!')"
```

Use the same parameters as `hf jobs uv run` and `hf jobs run` to pass environment variables, secrets, timeout, etc.

Manage scheduled jobs using `hf jobs scheduled ps`, `hf jobs scheduled inspect`, `hf jobs scheduled suspend`, `hf jobs scheduled resume`, and `hf jobs scheduled delete`:

```python
# List your active scheduled jobs
>>> hf jobs scheduled ps

# List all your scheduled jobs (including suspended jobs)
>>> hf jobs scheduled ps -a

# Inspect the status of a job
>>> hf jobs scheduled inspect <scheduled-job-id>

# Suspend (pause) a scheduled job
>>> hf jobs scheduled suspend <scheduled-job-id>

# Resume a scheduled job
>>> hf jobs scheduled resume <scheduled-job-id>

# Delete a scheduled job
>>> hf jobs scheduled delete <scheduled-job-id>
```
