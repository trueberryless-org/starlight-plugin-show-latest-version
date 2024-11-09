import type { StarlightPlugin, StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";
import { Translations } from "./translations";

export default function starlightCoolerCredit(): StarlightPlugin {
    const config = validateConfig(userConfig);

    return {
        name: "starlight-cooler-credit",
        hooks: {
            setup({ addIntegration, updateConfig: updateStarlightConfig, config: starlightConfig, logger, injectTranslations }) {
                /**
                 * This is the entry point of your Starlight plugin.
                 * The `setup` hook is called when Starlight is initialized (during the Astro `astro:config:setup` integration
                 * hook).
                 * To learn more about the Starlight plugin API and all available options in this hook, check the Starlight
                 * plugins reference.
                 *
                 * @see https://starlight.astro.build/reference/plugins/
                 */
                logger.info("Hello from the starlight-cooler-credit plugin!");

                injectTranslations(Translations);

                updateStarlightConfig({
                    components: {
                        ...starlightConfig.components,
                        ...overrideStarlightComponent(starlightConfig.components, logger, "PageSidebar"),
                    },
                });

                addIntegration({
                    name: "starlight-cooler-credit-integration",
                    hooks: {
                        "astro:config:setup": ({ updateConfig }) => {
                            updateConfig({
                                vite: {
                                    plugins: [
                                        vitePluginStarlightCoolerCreditConfig(config, {
                                            description: starlightConfig.description,
                                            site: astroConfig.site,
                                            title: starlightConfig.title,
                                            titleDelimiter: starlightConfig.titleDelimiter,
                                            trailingSlash: astroConfig.trailingSlash,
                                        }),
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
        logger.warn(`It looks like you already have a \`${component}\` component override in your Starlight configuration.`);
        logger.warn(
            `To use \`starlight-blog\`, either remove your override or update it to render the content from \`starlight-blog/overrides/${component}.astro\`.`
        );

        return {};
    }

    return {
        [component]: `starlight-blog/overrides/${component}.astro`,
    };
}
