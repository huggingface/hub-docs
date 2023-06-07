# Cookie limitations in Spaces

In Hugging Face Spaces, applications have certain limitations when using cookies. This is primarily due to the structure of the Spaces' pages (`https://huggingface.co/spaces/<user>/<app>`), which contain applications hosted on a different domain (`*.hf.space`) within an iframe. For security reasons, modern browsers tend to restrict the use of cookies from iframe pages hosted on a different domain than the parent page.

## Impact on Hosting Streamlit Apps with Docker SDK

One instance where these cookie restrictions can become problematic is when hosting Streamlit applications using the Docker SDK. By default, Streamlit enables cookie-based XSRF protection. As a result, certain components that submit data to the server, such as `st.file_uploader()`, will not work properly on HF Spaces where cookie usage is restricted.

To work around this issue, you would need to set the `server.enableXsrfProtection` option in Streamlit to `false`. There are two ways to do this:

1. Command line argument: The option can be specified as a command line argument when running the Streamlit application. Here is the example command:
   ```shell
   streamlit run app.py --server.enableXsrfProtection false
   ```

2. Configuration file: Alternatively, you can specify the option in the Streamlit configuration file `.streamlit/config.toml`. You would write it like this:
   ```toml
   [server]
   enableXsrfProtection = false
   ```

<Tip>
When you are using the Streamlit SDK, you don't need to worry about this because the SDK does it for you.
</Tip>
