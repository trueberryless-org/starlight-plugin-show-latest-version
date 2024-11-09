import type { StarlightCoolerCreditConfig } from "./config";

export default function getCreditText(
    config: StarlightCoolerCreditConfig,
    type: "title" | "href" | "description",
    translate: (key: any) => string
): string | undefined {
    if (typeof config.credit === "string") {
        if (type == "href") {
            if (config.credit === "Astro") {
                return "https://docs.astro.build/";
            } else if (config.credit === "Starlight") {
                return "https://starlight.astro.build/";
            }
        }
        if (type == "title" && config.credit === "Starlight") {
            return translate(`builtWithStarlight.label`);
        }
        return translate(`starlightCoolerCredit.${config.credit.toLowerCase()}.${type}`);
    } else {
        // For custom credit objects, return the specified property directly
        return config.credit[type];
    }
}
