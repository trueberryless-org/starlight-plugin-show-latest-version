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
import fetchVersion from "./libs/utils";

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
        /**
         * This is the entry point of your Starlight plugin.
         * The `setup` hook is called when Starlight is initialized (during the Astro `astro:config:setup` integration
         * hook).
         * To learn more about the Starlight plugin API and all available options in this hook, check the Starlight
         * plugins reference.
         *
         * @see https://starlight.astro.build/reference/plugins/
         */
        logger.info(
          "Hello from the starlight-plugin-show-latest-version plugin!"
        );

        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "SiteTitle"
            ),
          },
        });

        // const context = await fetchVersion(config);

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
