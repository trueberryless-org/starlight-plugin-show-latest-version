import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightPluginShowLatestVersion from "starlight-plugin-show-latest-version";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";

import node from "@astrojs/node";

export default defineConfig({
  integrations: [
    starlight({
      title: "Starlight Plugin Show Latest Version",
      logo: {
        light: "./src/assets/logo-light.png",
        dark: "./src/assets/logo-dark.png",
        replacesTitle: true,
      },
      editLink: {
        baseUrl:
          "https://github.com/trueberryless-org/starlight-plugin-show-latest-version/edit/main/docs/",
      },
      plugins: [
        starlightLinksValidator(),
        starlightPluginShowLatestVersion({
          source: {
            type: "github",
            slug: "trueberryless-org/starlight-plugin-show-latest-version",
          },
        }),
        starlightPluginsDocsComponents({
          pluginName: "starlight-plugin-show-latest-version",
          showcaseProps: {
            entries: [],
          },
        }),
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { slug: "getting-started" },
            { slug: "configuration" },
            { slug: "version-extraction-algorithm" },
          ],
        },
        {
          label: "Demo",
          link: "/demo",
        },
      ],
      social: {
        github:
          "https://github.com/trueberryless-org/starlight-plugin-show-latest-version",
      },
    }),
  ],
  adapter: node({
    mode: "standalone",
  }),
});
