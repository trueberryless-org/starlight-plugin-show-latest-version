---
"starlight-plugin-show-latest-version": patch
---

Make override of Starlight `SiteTitle.astro` optional. You now have to opt-in by setting the new `showInSiteTitle` configuration option to `true` because it does not get overridden by default. 

In order to migrate, you have to add some [server adapter](https://docs.astro.build/en/guides/on-demand-rendering/#server-adapters), e.g. you can add the [Node adapter](https://docs.astro.build/en/guides/integrations-guide/node/) by running one of the following commands:

```bash
npx astro add node
pnpm astro add node
yarn astro add node
```

This will automatically configure the Node adapter for you.

Read more about this configuration option [here](https://starlight-plugin-show-latest-version.trueberryless.org/configuration/#showinsitetitle).
