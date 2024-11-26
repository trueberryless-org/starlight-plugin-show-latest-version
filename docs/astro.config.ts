import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightPluginShowLatestVersion from "starlight-plugin-show-latest-version";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";

export default defineConfig({
  integrations: [
    starlight({
      title: "Starlight Cooler Credit",
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
          repo: "trueberryless-org/starlight-plugin-show-latest-version",
        }),
        starlightPluginsDocsComponents({
          pluginName: "starlight-plugin-show-latest-version",
          showcaseProps: {
            entries: [
              {
                thumbnail: "./src/assets/rainsberger.ca.webp",
                href: "https://www.rainsberger.ca",
                title: "Sarah Rainsberger",
              },
            ],
          },
        }),
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [{ slug: "getting-started" }, { slug: "configuration" }],
        },
      ],
      social: {
        github:
          "https://github.com/trueberryless-org/starlight-plugin-show-latest-version",
      },
    }),
  ],
});
