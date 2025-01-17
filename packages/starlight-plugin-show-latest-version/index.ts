import type {
  StarlightPlugin,
  StarlightUserConfig,
} from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";
import {
  type StarlightPluginShowLatestVersionConfig,
  validateConfig,
  type StarlightPluginShowLatestVersionUserConfig,
} from "./libs/config";
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
      setup: async ({
        addIntegration,
        updateConfig: updateStarlightConfig,
        config: starlightConfig,
        logger,
      }) => {
        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...(config.showInSiteTitle !== "false"
              ? overrideStarlightComponent(
                  starlightConfig.components,
                  logger,
                  "SiteTitle"
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

function overrideStarlightComponent(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  component: keyof NonNullable<StarlightUserConfig["components"]>
) {
  if (components?.[component]) {
    logger.warn(
      `It looks like you already have a \`${component}\` component override in your Starlight configuration.`
    );
    logger.warn(
      `To use \`starlight-plugin-show-latest-version\`, either remove your override or update it to render the content from \`starlight-plugin-show-latest-version/overrides/${component}.astro\`.`
    );

    return {};
  }

  return {
    [component]: `starlight-plugin-show-latest-version/overrides/${component}.astro`,
  };
}
