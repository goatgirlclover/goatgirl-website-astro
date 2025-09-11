// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import genericBuildFilenames from "astro-generic-build-filenames";
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.ts';

import { loadEnv } from "vite";
import nekoweb from '@indiefellas/astro-adapter-nekoweb';

const { NEKOWEB_API_KEY, NEKOWEB_COOKIE } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

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

  
  adapter: nekoweb({
    apiKey: NEKOWEB_API_KEY,
    cookie: NEKOWEB_COOKIE,
    siteName: 'goatgirl',
    domain: 'goatgirl.nekoweb.org'
  })
});