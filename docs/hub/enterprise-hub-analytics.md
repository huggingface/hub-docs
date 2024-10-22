# Analytics

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

## Analytics Dashboard

Track all your repository activity with a detailed downloads overview that shows total downloads for all your Models and Datasets. Toggle between "All Time" and "Last Month" views to gain insights into your repository's downloads over different periods.

<div class="flex justify-center">
<img class="block dark:hidden !m-0" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise-analytics.png" alt="screenshot of the Dataset Viewer on a private dataset owned by an Enterprise Hub organization."/>
<img class="hidden dark:block !m-0" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise-analytics-dark.png" alt="screenshot of the Dataset Viewer on a private dataset owned by an Enterprise Hub organization."/>
</div>

### Per-repo breakdown

Explore the metrics of individual repositories with the per-repository drill-down table. Utilize the built-in search feature to quickly locate specific repositories. Each row also features a time-series graph that illustrates the trend of downloads over time.

## Export Analytics as JSON

Download a comprehensive JSON file containing analytics for all your repositories, including model and dataset download activity.

### Response Structure

```json
[
  {
    "repoType": "model",
    "repoName": "huggingface/CodeBERTa-small-v1",
    "totalDownloads": 4362460,
    "records": [
      {
        "timestamp": "2021-01-22T00:00:00.000Z",
        "downloads": 4
      }
      // ... daily records
    ]
  },
  {
    "repoType": "dataset",
    "repoName": "huggingface/documentation-images",
    "totalDownloads": 2167284,
    "records": [
      {
        "timestamp": "2021-11-27T00:00:00.000Z",
        "downloads": 4
      }
      // ... daily records
    ]
  }
]
```

### Repository Object Structure

Each repository object contains:

- `repoType`: The type of repository (e.g., "model", "dataset")
- `repoName`: Full repository name including organization (e.g., "huggingface/documentation-images")
- `totalDownloads`: Cumulative number of downloads (can be 0 for repositories with no activity)
- `records`: Array of daily download entries (can be empty for repositories with no activity)

### Download History

For repositories with download activity, each record in the `records` array includes:

- `timestamp`: ISO 8601 formatted date (UTC)
- `downloads`: Number of downloads for that day

Records are ordered chronologically and provide a daily granular view of download activity for each repository.
