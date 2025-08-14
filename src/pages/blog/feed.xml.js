import { getCollection, render } from 'astro:content';
import rss from '@astrojs/rss';

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: "goatgirlclover blog",
		description: "furry yaps on the internet!",
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
			link: `/blog/post/${post.id}/`,
		})),
	});
}