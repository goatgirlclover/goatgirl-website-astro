import rehypeExternalLinksPlugin from 'rehype-external-links';
import type { Plugin } from 'unified';

export const rehypeExternalLinks: [Plugin<any[], any>, any] = [
  rehypeExternalLinksPlugin, { target: '_blank', rel: ['noopener', 'noreferrer'], },
];