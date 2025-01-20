// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import payload from "payload";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { ReactNode } from "react";

export type LayoutType = "default" | "landing" | "blog";

const layouts: Record<LayoutType, ({ children }: { children: ReactNode }) => JSX.Element> = {
	default: ({ children }) => <div>{children}</div>, // Example default layout
	landing: ({ children }) => <main className="landing">{children}</main>, // Example landing page layout
	blog: ({ children }) => <article>{children}</article>, // Example blog post layout
};
async function getPage(slug: string) {
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
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
	const slug = params.slug.join("/");
	const page = await getPage(slug);

	if (!page) {
		return {};
	}

	return {
		title: page.seo?.title || page.title,
		description: page.seo?.description,
	};
}

export default async function Page({ params }: { params: { slug: string[] } }) {
	const slug = params.slug.join("/");
	const page = await getPage(slug);

	if (!page) {
		notFound();
	}

	const layoutKey: LayoutType = (page.layout as LayoutType) || "default";

	const Layout = layouts[layoutKey];

	return <Layout>{children}</Layout>;
}
