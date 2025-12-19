import rss from '@astrojs/rss';
import { readFile } from 'node:fs/promises';
import { markdownToTxt } from 'markdown-to-txt';

export async function GET(context) {
    const changelog = await readFile('./src/content/changelog.md', 'utf-8');
    const regex = /^-\s/gm;
    const entries = changelog.split(regex).filter((s) => s.trim().length > 0);

    const items = entries.map(entry => {
        const firstDashIndex = entry.indexOf(' - ');
        const date = entry.substring(0, firstDashIndex).trim();

        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];

        const dateWithTime = Date.UTC(Number.parseInt(year), Number.parseInt(month), Number.parseInt(day));
        const dateObject = new Date(dateWithTime);
        const body = entry.substring(firstDashIndex + 2).trim();

        return {
            title: "changelog: " + dateObject.toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric", timeZone: 'UTC' }),
            pubDate: dateObject,
            description: markdownToTxt(body.replaceAll("    -", " • ")),
            link: "?changelog-item=" + date,
        };
    });

    return rss({
        title: "goatgirlclover's website changelog",
        description: 'latest updates to my website',
        site: context.site,
        items: items,
    });
}