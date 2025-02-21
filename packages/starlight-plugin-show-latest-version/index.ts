import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightPluginShowLatestVersionConfig,
  validateConfig,
  type StarlightPluginShowLatestVersionUserConfig,
} from "./libs/config";
import { vitePluginStarlightPluginShowLatestVersionConfig } from "./libs/vite";
import { overrideStarlightComponent } from "./libs/starlight";

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
