import type { StarlightPluginShowLatestVersionConfig } from "./config";
import type { StarlightPluginShowLatestVersionContext } from "./types";

export default async function fetchVersion(
  config: StarlightPluginShowLatestVersionConfig
): Promise<StarlightPluginShowLatestVersionContext> {
  const repo = config.repo;
  const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

  try {
    const data = await fetch(apiUrl).then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);
      return response.json();
    });

    // Extract and normalize the version
    const tagName = data.tag_name || "";
    const match = tagName.match(/(?:.*@)?(?<version>[0-9]+\.[0-9]+\.[0-9]+)/);

    if (!match) {
      throw new Error(`Failed to parse version from: ${tagName}`);
    }

    const versionWithoutPrefix = match.groups?.version || "";
    const version = `v${versionWithoutPrefix}`;
    const versionPatch = Number(versionWithoutPrefix.split(".")[2] || 0);
    const versionMinor = Number(versionWithoutPrefix.split(".")[1] || 0);
    const versionMajor = Number(versionWithoutPrefix.split(".")[0] || 0);

    return {
      version,
      versionWithoutPrefix,
      versionPatch,
      versionMinor,
      versionMajor,
    };
  } catch (error) {
    console.error(error);
    return {
      version: "v0.0.0",
      versionWithoutPrefix: "0.0.0",
      versionPatch: 0,
      versionMinor: 0,
      versionMajor: 0,
    }; // Fallback version
  }
}
