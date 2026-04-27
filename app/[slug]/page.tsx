import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, listPages } from "@/lib/cms";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await listPages();
  return pages.map((p) => ({ slug: p.slug.replace(/^\//, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Nie znaleziono" };
  const ogImage = page.og_image || "https://petlyai.pl/images/og-image.jpg";
  return {
    title: page.seo_title || page.title,
    description: page.seo_description ?? undefined,
    openGraph: {
      title: page.seo_title || page.title,
      description: page.seo_description ?? undefined,
      images: [ogImage],
      url: `https://petlyai.pl${page.slug}`,
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
    alternates: { canonical: `https://petlyai.pl${page.slug}` },
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">{page.title}</h1>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
