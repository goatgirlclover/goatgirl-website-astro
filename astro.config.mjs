// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import genericBuildFilenames from "astro-generic-build-filenames";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },

  integrations: [genericBuildFilenames()],
});