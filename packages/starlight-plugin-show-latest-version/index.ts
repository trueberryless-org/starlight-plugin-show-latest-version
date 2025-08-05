import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightPluginShowLatestVersionConfig,
  type StarlightPluginShowLatestVersionUserConfig,
  validateConfig,
} from "./libs/config";
import { overrideStarlightComponent } from "./libs/starlight";
import { vitePluginStarlightPluginShowLatestVersionConfig } from "./libs/vite";

export type {
  StarlightPluginShowLatestVersionConfig,
  StarlightPluginShowLatestVersionUserConfig,
};

export default function starlightPluginShowLatestVersion(
  userConfig?: StarlightPluginShowLatestVersionUserConfig
): StarlightPlugin {
  const config = validateConfig(userConfig);

  return {
    name: "starlight-plugin-show-latest-version",
    hooks: {
      "config:setup"({
        addIntegration,
        updateConfig: updateStarlightConfig,
        config: starlightConfig,
        logger,
      }) {
        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...(config.showInSiteTitle !== "false"
              ? overrideStarlightComponent(
                  starlightConfig.components,
                  logger,
                  "SiteTitle",
                  "DynamicVersionBadge"
                )
              : {}),
          },
        });

        addIntegration({
          name: "starlight-plugin-show-latest-version-integration",
          hooks: {
            "astro:config:setup": ({ updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [
                    vitePluginStarlightPluginShowLatestVersionConfig(config),
                  ],
                },
              });
            },
          },
        });
      },
    },
  };
}
