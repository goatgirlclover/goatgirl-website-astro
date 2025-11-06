import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import { readFile } from 'node:fs/promises';
import { markdownToTxt } from 'markdown-to-txt';
const parser = new MarkdownIt();

export async function GET(context) {
    const changelog = await readFile('./src/content/changelog.md', 'utf-8');
    const regex = /^-\s/gm;
    const entries = changelog.split(regex).filter((s) => s.trim().length > 0);

    const items = entries.map(entry => {
        const firstDashIndex = entry.indexOf(' - ');
        const date = entry.substring(0, firstDashIndex).trim();
        const dateWithTime = date + "T12:00:00+00:00"; // hopefully correct occasional 1-day offset?
        const body = entry.substring(firstDashIndex + 2).trim();

        return {
            title: "changelog: " + new Date(dateWithTime).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric", }),
            pubDate: new Date(dateWithTime),
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