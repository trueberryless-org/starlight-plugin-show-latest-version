import type { ViteUserConfig } from "astro";

import type { StarlightPluginShowLatestVersionConfig } from "..";

export function vitePluginStarlightPluginShowLatestVersionConfig(
  config: StarlightPluginShowLatestVersionConfig
  // context: StarlightPluginShowLatestVersionContext
): VitePlugin {
  const modules = {
    "virtual:starlight-plugin-show-latest-version-config": `export default ${JSON.stringify(
      config
    )}`,
  } satisfies Record<string, string>;

  const moduleResolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
      resolveVirtualModuleId(key),
      key,
    ])
  );

  return {
    name: "vite-plugin-starlight-plugin-show-latest-version-config",
    load(id) {
      const moduleId = moduleResolutionMap[id];
      return moduleId ? modules[moduleId] : undefined;
    },
    resolveId(id) {
      return id in modules ? resolveVirtualModuleId(id) : undefined;
    },
  };
}

function resolveVirtualModuleId<TModuleId extends string>(
  id: TModuleId
): `\0${TModuleId}` {
  return `\0${id}`;
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
