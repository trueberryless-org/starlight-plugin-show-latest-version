import type { ViteUserConfig } from "astro";

import type { StarlightPluginShowLatestVersionConfig } from "..";

export function vitePluginStarlightPluginShowLatestVersionConfig(
  config: StarlightPluginShowLatestVersionConfig
): VitePlugin {
  const moduleId = "virtual:starlight-plugin-show-latest-version-config";
  const resolvedModuleId = `\0${moduleId}`;
  const moduleContent = `export default ${JSON.stringify(config)}`;

  return {
    name: "vite-plugin-starlight-plugin-show-latest-version",
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined;
    },
  };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
