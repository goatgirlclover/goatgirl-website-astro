import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import fs from "fs";

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
    }),
});

export type GalleryEntry = z.infer<typeof GallerySchema>;
const GallerySchema = z.object({
	id: z.string(),
	imagePath: z.string(),
	thumbnailPath: z.string(),
	path: z.string(),
	year: z.number(),

	title: z.string(),
	description: z.string(),
	altText: z.string(),
	rssDate: z.string(),

	imageWidth: z.number(),
	imageHeight: z.number(),
});

const gallery = defineCollection({
	loader: async() => {
		var galleryEntries: GalleryEntry[] = [];
		fs.readdirSync("./src/content/gallery/").forEach(async (file: string) => {
			if (file.endsWith(".txt")) {
				const entryID = file.slice(0, -4);
				const fullFilePath = "./src/content/gallery/" + file;
				const info = fs.readFileSync(fullFilePath, 'utf-8').split(/\r?\n/);
				const resolution = info[4].split('x');

				const parsedEntry:GalleryEntry = ({
					id: entryID,
					imagePath: "/gallery/img/" + entryID + ".png",
					thumbnailPath: "/gallery/thumb/" + entryID + ".jpg",
					path: "/gallery/view/" + entryID + "/",
					year: Number(entryID.substring(0, 4)),

					title: info[0].trim(),
					description: info[1].trim(),
					rssDate: info[2].trim(),
					altText: info[3].trim(),

					imageWidth: Number(resolution[0].trim()),
					imageHeight: Number(resolution[1].trim()),
				})

				galleryEntries.push(parsedEntry);
			}
		});

		return galleryEntries;
    },
	schema: GallerySchema,
}); 

export const collections = { blog, gallery };