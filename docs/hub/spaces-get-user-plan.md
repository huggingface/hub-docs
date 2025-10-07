# How to get a user's plan and status in Spaces

From inside a Space's iframe, you can check if a user is logged in or not on the main site, and if they have a PRO subscription or if one of their orgs has a paid subscription.

```js
window.addEventListener("message", (event) => {
    if (event.data.type === "USER_PLAN") {
        console.log("plan", event.data.plan);
    }
})

window.parent.postMessage({
    type: "USER_PLAN_REQUEST"
}, "https://huggingface.co");
```

`event.data.plan` will be of type:

```ts
{
    user: "anonymous",
    org: undefined
} | {
    user: "pro" | "free",
    org: undefined | "team" | "enterprise" | "plus" | "academia"
}
```

You will get both the user's status (logged out = `"anonymous"`) and their <a href="https://huggingface.co/pricing">plan</a>.

## Examples

- https://huggingface.co/spaces/huggingfacejs/plan