# Set URL query and hash

On a Space page (`https://huggingface.co/spaces/<user>/<app>`), the actual application page (`https://*.hf.space/`) is embedded in an iframe. The query string and the hash attached to the parent page URL are propagated to the embedded app at the initial load, so the embedded app can read these values without special consideration.

Contrarily, updating the query string and the hash of the parent page URL from the embedded app is not straightforward.
If you want to do it in a Static or Docker Space, you have to write JS code as below, sending a message to the parent page which has `queryString` and/or `hash` key.

```js
const queryString = "...";
const hash = "...";

window.parent.postMessage({
    queryString,
    hash,
}, "*");
```
