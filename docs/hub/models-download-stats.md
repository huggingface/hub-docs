# Models Download Stats

## How are download stats generated for models?

Counting the number of downloads for models is not a trivial task as a single model repository might contain multiple files, including multiple model weight files (e.g., with sharded models), and different formats depending on the library. To avoid double counting downloads (e.g., counting a single download of a model as multiple downloads), the Hub uses a set of query files that are employed for download counting. 

Every HTTP request to these files, including `GET` and `HEAD` will be counted as a download. By default, when no library is specified, the Hub uses `config.json` as the default query file. Otherwise, the query file depends on each library, and the Hub might examine files such as `pytorch_model.bin` and `adapter_config.json`.
