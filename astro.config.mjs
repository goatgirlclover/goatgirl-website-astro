// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import { unified } from "@astrojs/markdown-remark";
import { rehypeExternalLinks } from "./src/plugins/rehype-external-links.ts";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

import { loadEnv } from "vite";
import nekoweb from "@indiefellas/astro-adapter-nekoweb";

const { NEKOWEB_API_KEY, NEKOWEB_COOKIE } = loadEnv(
  // @ts-expect-error
  process.env.NODE_ENV ?? "production",
  // @ts-expect-error
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://goatpup.party",

  image: { service: passthroughImageService() },

  markdown: {
    processor: unified({
      rehypePlugins: [rehypeExternalLinks, rehypeAstroRelativeMarkdownLinks],
    }),

    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-high-contrast",
      },
    },
  },

  adapter: nekoweb({
    apiKey: NEKOWEB_API_KEY,
    cookie: NEKOWEB_COOKIE,
    siteName: "goatgirl",
    domain: "goatpup.party",
  }),

  trailingSlash: "always",
});
