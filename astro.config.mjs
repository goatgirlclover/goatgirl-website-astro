// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import genericBuildFilenames from "astro-generic-build-filenames";
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://goatgirl.nekoweb.org',

  image: { service: passthroughImageService(), },

  integrations: [genericBuildFilenames()],

  markdown: {
    rehypePlugins: [rehypeExternalLinks],
    
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-high-contrast',
      },
    },
  },
});