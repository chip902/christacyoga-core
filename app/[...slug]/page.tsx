// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { initPayload } from "@/lib/payload";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { LandingLayout } from "../layouts/LandingLayout";
import { BlogLayout } from "../layouts/BlogLayout";

const layouts = {
	default: DefaultLayout,
	landing: LandingLayout,
	blog: BlogLayout,
} as const;

async function getPage(slug: string) {
	try {
		// Make sure to initialize payload before using it
		const payloadClient = await initPayload();

		// Now we can safely use the initialized client
		const pages = await payloadClient.find({
			collection: "pages",
			where: {
				slug: {
					equals: slug,
				},
			},
		});

		return pages.docs[0];
	} catch (error) {
		console.error("Error fetching page:", error);
		return null;
	}
}

async function getSlugFromParams(params: { slug: string[] }) {
	// Ensure params are fully resolved
	const resolvedParams = await Promise.resolve(params);
	return resolvedParams.slug.join("/");
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
	const slug = await getSlugFromParams(params);
	const page = await getPage(slug);

	if (!page) {
		return {};
	}

	return {
		title: page.seo?.title || page.title,
		description: page.seo?.description,
	};
}

export default async function Page({ params }) {
	const slug = await getSlugFromParams(params);
	const page = await getPage(slug);

	if (!page) {
		notFound();
	}

	const Layout = layouts[page.layout as keyof typeof layouts] || DefaultLayout;

	return (
		<Layout>
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.content }} />
		</Layout>
	);
}
