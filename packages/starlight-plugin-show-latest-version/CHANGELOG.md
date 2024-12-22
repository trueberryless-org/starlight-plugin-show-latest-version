# starlight-plugin-show-latest-version

## 0.2.0

### Minor Changes

- [#12](https://github.com/trueberryless-org/starlight-plugin-show-latest-version/pull/12) [`c4c5257`](https://github.com/trueberryless-org/starlight-plugin-show-latest-version/commit/c4c525794ba68fe9f33d16194c6802632f5cba77) Thanks [@trueberryless](https://github.com/trueberryless)! - Adds support for Astro v5, drops support for Astro v4.

  ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now `0.30.0`.

  Please follow the [upgrade guide](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.30.0) to update your project.

  Note that the [`legacy.collections` flag](https://docs.astro.build/en/reference/legacy-flags/#collections) is not supported by this plugin and you should update your collections to use Astro's new Content Layer API.

### Patch Changes

- [`e29e231`](https://github.com/trueberryless-org/starlight-plugin-show-latest-version/commit/e29e2318eb36400ee5752017487518f07d091e31) Thanks [@trueberryless](https://github.com/trueberryless)! - Change Client JS to insert Raw HTML into div so it doesn't need rendering

## 0.1.1

### Patch Changes

- [`d84a498`](https://github.com/trueberryless-org/starlight-plugin-show-latest-version/commit/d84a4981b81d3c4402834028e0f96f23be4c5a4e) Thanks [@trueberryless](https://github.com/trueberryless)! - Remove virtual export functionality because it's much harder than I though, maybe not even possible.

## 0.1.0

### Minor Changes

- [`ab7b842`](https://github.com/trueberryless-org/starlight-plugin-show-latest-version/commit/ab7b842691b74692c513ecd5e4557112a7eccca6) Thanks [@trueberryless](https://github.com/trueberryless)! - Release first minor version. Latest version in site title and virtual module export.
