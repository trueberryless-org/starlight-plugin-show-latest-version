---
"starlight-plugin-show-latest-version": minor
---

Add version support for NPM and GitLab.

⚠️ **BREAKING CHANGE:** The configuration interface changed.

Please follow the steps below to use the plugin like before or read the [documentation](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#source) for the newly defined API.

Change the removed `repo` configuration to the new [`source`](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#source) configuration object:

```diff
 // astro.config.ts
 starlightPluginShowLatestVersion({
-  repo: "${slug}",
+  source: {
+    type: "github",
+    slug: "${slug}",
+  },
 }),
```

Note that you can now use `"npm"`, `"github"` or `"gitlab"` as the source type. This means that the plugin can be better customised to where you publish and release your packages.