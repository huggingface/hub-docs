# How to handle URL parameters in Spaces

You can use URL query parameters as a data sharing mechanism, for instance to be able to deep-link into an app with a specific state.

On a Space page (`https://huggingface.co/spaces/<user>/<app>`), the actual application page (`https://*.hf.space/`) is embedded in an iframe. The query string and the hash attached to the parent page URL are propagated to the embedded app on initial load, so the embedded app can read these values without special consideration.


In contrast, updating the query string and the hash of the parent page URL from the embedded app is slightly more complex.
If you want to do this in a Static or Docker Space, you need to add the following JS code that sends a message to the parent page that has a `queryString` and/or `hash` key.

```js
const queryString = "...";
const hash = "...";

window.parent.postMessage({
    queryString,
    hash,
}, "https://huggingface.co");
```
