// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";

interface Props {
	params: {
		slug: string[];
	};
}

async function getPage(slug: string) {
	const payload = await getPayloadClient();

	try {
		const pages = await payload.find({
			collection: "pages",
			where: {
				slug: {
					equals: slug,
				},
			},
		});

		if (!pages.docs[0]) {
			return null;
		}

		return pages.docs[0];
	} catch (error) {
		console.error(`Error fetching page ${slug}:`, error);
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = params.slug.join("/");
	const page = await getPage(slug);

	if (!page) {
		return {
			title: "Page Not Found",
			description: "The requested page could not be found",
		};
	}

	return {
		title: page.title,
		description: page.meta?.description || "",
	};
}

export default async function Page({ params }) {
	const slug = params.slug.join("/");
	const page = await getPage(slug);

	if (!page) {
		notFound();
	}

	return (
		<main>
			<h1>{page.title}</h1>
			{page.content !== undefined && page.content !== null ? <div dangerouslySetInnerHTML={{ __html: page.content }} /> : <div>No content available</div>}
		</main>
	);
}
