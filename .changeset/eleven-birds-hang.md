---
"starlight-plugin-show-latest-version": minor
---

Use [`server:defer`](https://docs.astro.build/en/reference/directives-reference/#serverdefer) in the `SiteTitle.astro` override component if [`showInSiteTitle`](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#showinsitetitle) is set to `"deferred"`.

⚠️ **BREAKING CHANGE:** You now have to use some [server adapter](https://docs.astro.build/en/guides/on-demand-rendering/#server-adapters) if you set [`showInSiteTitle`](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#showinsitetitle) to `"deferred"`.

If you set the [`showInSiteTitle` configuration option](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#showinsitetitle) to `"deferred"`, you have to add a [server adapter](https://docs.astro.build/en/guides/on-demand-rendering/#server-adapters) because the plugin override now uses [`server:defer`](https://docs.astro.build/en/reference/directives-reference/#serverdefer) in order to fetch the latest version on-demand.

Read more about Server Islands in [this blog post](https://astro.build/blog/future-of-astro-server-islands/) or the [Astro documentation](https://docs.astro.build/en/guides/server-islands/).
