import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";

export default defineConfig({
    integrations: [
        starlight({
            title: {
                en: "Starlight Cooler Credit",
                de: "Starlight Coolere Anerkennung",
            },
            logo: {
                light: "./src/assets/logo-light.png",
                dark: "./src/assets/logo-dark.png",
                replacesTitle: true,
            },
            editLink: {
                baseUrl: "https://github.com/trueberryless-org/starlight-cooler-credit/edit/main/docs/",
            },
            locales: {
                root: {
                    lang: "en",
                    label: "English",
                },
                de: {
                    lang: "de",
                    label: "Deutsch",
                },
            },
            plugins: [
                starlightLinksValidator(),
                starlightCoolerCredit({
                    credit: "Starlight Blog",
                }),
                starlightPluginsDocsComponents({
                    pluginName: "starlight-cooler-credit",
                    showcaseProps: {
                        entries: [],
                    },
                }),
            ],
            sidebar: [
                {
                    label: "Start Here",
                    translations: {
                        de: "Loslegen",
                    },
                    items: [{ slug: "getting-started" }, { slug: "configuration" }],
                },
            ],
            social: {
                github: "https://github.com/trueberryless-org/starlight-cooler-credit",
            },
        }),
    ],
});
