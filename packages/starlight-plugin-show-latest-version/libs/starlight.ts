import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";

export function overrideStarlightComponent(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  override: keyof NonNullable<StarlightUserConfig["components"]>,
  component: string
) {
  if (components?.[override]) {
    logger.warn(
      `It looks like you already have a \`${override}\` component override in your Starlight configuration.`
    );
    logger.warn(
      `To use \`starlight-plugin-show-latest-version\`, either remove your override or update it to render the content from \`starlight-plugin-show-latest-version/components/${component}.astro\`.`
    );
    if (component === "DynamicVersionBadge") {
      logger.warn(
        "Notice that the `DynamicVersionBadge` component must be rendered AFTER the original Starlight `SiteTitle` component in the DOM. This ensures proper layout and behavior within the application."
      );
    }

    return {};
  }

  return {
    [override]: `starlight-plugin-show-latest-version/overrides/${override}.astro`,
  };
}
