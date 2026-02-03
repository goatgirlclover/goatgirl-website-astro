import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const entries = await getCollection('gallery');
	return rss({
		title: "goatpupclover gallery",
		description: "furry draws on the internet!",
		site: context.site,
		items: entries.map((entry) => ({
			title: entry.data.title,
            description: entry.data.description,
            link: entry.data.path,
            pubDate: new Date(Date.parse(entry.data.rssDate)),
            content: `<img src="${entry.data.imagePath}" alt="${entry.data.altText}" width="${entry.data.imageWidth}" height="${entry.data.imageHeight}" /><p>${entry.data.description}</p>`,
		})),
	});
}