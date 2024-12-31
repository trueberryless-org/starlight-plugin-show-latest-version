---
"starlight-plugin-show-latest-version": minor
---

Use `server:defer` in the `SiteTitle.astro` override component.

⚠️ **BREAKING CHANGE:** You now have to use some [Astro adapter](https://astro.build/integrations/?search=&categories%5B%5D=adapters) in order to use the override.

If you set the `showInSiteTitle` configuration option to `true`, you have to add an Astro adapter because the plugin override now uses `server:defer` in order to fetch the latest version as a second HTTP request. 

Read more about Astro adapters in the [Adapter API](https://docs.astro.build/en/reference/adapter-reference/), the [configuration](https://docs.astro.build/en/reference/configuration-reference/#adapter) or the [getting started guide of this plugin](https://starlight-plugin-show-latest-version.trueberryless.org/getting-started/#adapter).

Read more about Server Islands in [this blog post](https://astro.build/blog/future-of-astro-server-islands/) or the [Astro documentation](https://docs.astro.build/en/guides/server-islands/).
