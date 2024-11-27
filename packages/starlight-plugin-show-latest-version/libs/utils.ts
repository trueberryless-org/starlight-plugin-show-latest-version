import { SEMVER_PATTERN } from "../consts/semantic.version.pattern";
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

    const tagName = data.tag_name || "";
    if (!tagName) {
      return { versionAvailable: false }; // No release available
    }

    const match = tagName.match(config.regexPattern ?? SEMVER_PATTERN);

    if (!match) {
      return { versionAvailable: false }; // No valid version found
    }

    const versionWithoutPrefix = match.groups?.version || "";
    const [versionMajor = 0, versionMinor = 0, versionPatch = 0] =
      versionWithoutPrefix.split(".").map(Number);

    const prerelease = match.groups?.prerelease;
    const isPrereleaseVersion = !!prerelease;
    const version = isPrereleaseVersion
      ? `${versionWithoutPrefix}-${prerelease}`
      : `v${versionWithoutPrefix}`;

    const prefixMatch = tagName.match(/^(.*?)v?[0-9]/);
    const prefix = prefixMatch ? prefixMatch[1] : undefined;
    const hasVPrefix = tagName.startsWith("v") || tagName.includes("@v");

    return {
      versionAvailable: true,
      version,
      versionWithoutPrefix,
      versionPatch,
      versionMinor,
      versionMajor,
      prerelease,
      isPrereleaseVersion,
      prefix,
      hasVPrefix,
      isStableVersion: !isPrereleaseVersion,
    };
  } catch (error) {
    console.error(error);
    return { versionAvailable: false }; // Fallback: no version available
  }
}
