import { z } from "astro/zod";

const contextSchema = z.object({
  version: z.string(),
  versionWithoutPrefix: z.string(),
  versionPatch: z.number(),
  versionMinor: z.number(),
  versionMajor: z.number(),
});

export type StarlightPluginShowLatestVersionContext = z.infer<
  typeof contextSchema
>;
