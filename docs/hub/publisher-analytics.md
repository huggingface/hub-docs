# Publisher Analytics

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

## Publisher Analytics Dashboard

Track all your repository activity with a detailed downloads overview that shows total downloads for all the Models and Datasets published by your organization. Toggle between "All Time" and "Last Month" views to gain insights across your repositories over different periods.

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise-analytics.png" alt="screenshot of the Dataset Viewer on a private dataset owned by a Team or Enterprise organization."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise-analytics-dark.png" alt="screenshot of the Dataset Viewer on a private dataset owned by a Team or Enterprise organization."/>
</div>

### Per-repo breakdown

Explore the metrics of individual repositories with the per-repository drill-down table. Utilize the built-in search feature to quickly locate specific repositories. Each row also features a time-series graph that illustrates the trend of downloads over time.

## Export Publisher Analytics as CSV

Download a comprehensive CSV file containing analytics for all your repositories, including model and dataset download activity.

You can also access this data programmatically via the following API endpoint:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://huggingface.co/organizations/YOUR_ORG_NAME/settings/publisher-analytics/download-breakdown" \
  --output breakdown.csv
```

### Response Structure

The CSV file is made of daily download records for each of your models and datasets.

```csv
repoType,repoName,total,timestamp,downloads
model,huggingface/CodeBERTa-small-v1,4362460,2021-01-22T00:00:00.000Z,4
model,huggingface/CodeBERTa-small-v1,4362460,2021-01-23T00:00:00.000Z,7
model,huggingface/CodeBERTa-small-v1,4362460,2021-01-24T00:00:00.000Z,2
dataset,huggingface/documentation-images,2167284,2021-11-27T00:00:00.000Z,3
dataset,huggingface/documentation-images,2167284,2021-11-28T00:00:00.000Z,18
dataset,huggingface/documentation-images,2167284,2021-11-29T00:00:00.000Z,7
```

### Repository Object Structure

Each record in the CSV contains:

- `repoType`: The type of repository (e.g., "model", "dataset")
- `repoName`: Full repository name including organization (e.g., "huggingface/documentation-images")
- `total`: Cumulative number of downloads for this repository
- `timestamp`: ISO 8601 formatted date (UTC)
- `downloads`: Number of downloads for that day

Records are ordered chronologically and provide a daily granular view of download activity for each repository.

> [!NOTE]
> Download figures are **not** deduplicated by user. If you need unique download counts, refer to the [Unique downloaders and more granular logs](#unique-downloaders-and-more-granular-logs) section.

## Blog Analytics

If your organization publishes blog posts on the Hub, you can download the daily traffic of every published post from the **Blog Analytics** tab of your organization's Publisher Analytics settings (next to the **Repo Analytics** and **Advanced Gating** tabs). Click **Download CSV** to get the data for all posts since their publication date.

You can also access this data programmatically via the following endpoint:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://huggingface.co/organizations/YOUR_ORG_NAME/settings/publisher/blog-analytics/export" \
  --output blog-analytics.csv
```

### Response Structure

Each row of the CSV holds the traffic of one blog post on one day:

```csv
blogTitle,blogUrl,publishedAt,date,humanViews,humanVisitors,agentViews
"My first blog post",https://huggingface.co/blog/YOUR_ORG_NAME/my-first-blog-post,2026-05-12,2026-05-12,1520,1104,
"My first blog post",https://huggingface.co/blog/YOUR_ORG_NAME/my-first-blog-post,2026-05-12,2026-06-01,87,71,23
```

- `blogTitle`: Title of the blog post
- `blogUrl`: URL of the blog post
- `publishedAt`: Publication date of the blog post (`YYYY-MM-DD`)
- `date`: Day the traffic was recorded (`YYYY-MM-DD`)
- `humanViews`: Number of page views from people on that day
- `humanVisitors`: Number of unique visitors on that day
- `agentViews`: Number of page views from AI agents on that day. Agent views are only counted since June 2026, so this column is empty for earlier days.

> [!NOTE]
> Unique visitors are counted per day, so they should not be summed across days to get a total number of unique visitors.

Each export is recorded in your organization's [audit logs](./audit-logs) as an `org.blog_analytics.export` event.

## Unique downloaders and more granular logs

> [!WARNING]
> This feature is an add-on for the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

As an advanced feature, Hugging Face can export anonymized, request-level access logs for all of the models and datasets published by your organization. Each line represents a single download-related request, giving you full granularity over your models and datasets' download data.

Your team is responsible for ingesting these logs and running computations on them. The export intentionally includes raw HTTP status codes and methods so you can classify `HEAD`, partial-content, redirect, and other request patterns based on your own analytics needs.

| Column         | Description                                             |
| -------------- | ------------------------------------------------------- |
| `timestamp`    | Request timestamp                                       |
| `status`       | HTTP status code (for example `200`, `206`, `302`, `307`, `304`) |
| `method`       | HTTP method (for example `GET`, `HEAD`)                 |
| `repoName`     | Full repo name (e.g. `nvidia/segformer-b0`)             |
| `repoType`     | Repository type: `model`, `dataset`, or `space`         |
| `hashedUserId` | Non-reversible hash of user ID (if authenticated)       |
| `hashedIp`     | Non-reversible hash of IP address (if unauthenticated)  |
| `country`      | Country ISO code                                        |
| `region`       | Region or city name                                     |
| `userAgent`    | HTTP User-Agent header                                  |


As it requires setting up a custom data export pipeline on our side (custom Elastic index, etc), this is only available as an add-on to Enterprise Plus.
