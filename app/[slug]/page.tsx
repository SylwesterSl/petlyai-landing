import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, PawPrint, Heart, Star } from "lucide-react";
import { getPage, listPages } from "@/lib/cms";

export const revalidate = 60;
export const dynamicParams = true;

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
  const title = page?.seo_title || page?.title || prettifySlug(slug);
  const description =
    page?.seo_description ||
    "PetlyAI — inteligentny portal dla właścicieli zwierząt. Profile pupili, społeczność, AI asystent.";
  const ogImage = page?.og_image || "https://petlyai.pl/images/og-image.jpg";
  const url = `https://petlyai.pl/${slug}`;
  return {
    title: `${title} | PetlyAI`,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      url,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    alternates: { canonical: url },
  };
}

function prettifySlug(slug: string) {
  return slug
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  const title = page?.title || prettifySlug(slug);
  const subtitle =
    page?.seo_description ||
    "Ta sekcja jest częścią portalu PetlyAI. Treść pojawi się tu wkrótce.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0420] text-white">
      {/* Galaxy background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.25),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.2),transparent_55%),radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[url('/images/stars.svg')] opacity-30 mix-blend-screen" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-pink-500/25 blur-[120px]" />
      </div>

      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12 md:pt-20">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="transition hover:text-white">
            Strona główna
          </Link>
          <span>/</span>
          <span className="text-white/90">{title}</span>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-transparent p-8 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(168,85,247,0.45)] md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-pink-300" />
              PetlyAI Portal
            </div>

            <h1 className="mt-6 bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,0.45)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]"
              >
                Wróć do strony głównej
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Skontaktuj się
              </Link>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        {page?.content ? (
          <article className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(99,102,241,0.4)] md:p-12">
            <div
              className="prose prose-invert max-w-none prose-headings:bg-gradient-to-r prose-headings:from-pink-200 prose-headings:to-purple-200 prose-headings:bg-clip-text prose-headings:text-transparent prose-a:text-pink-300 hover:prose-a:text-pink-200 prose-strong:text-white prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>
        ) : (
          <section className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { Icon: PawPrint, title: "Część portalu", desc: "Spójny wygląd na każdej podstronie." },
              { Icon: Heart, title: "Stworzone z miłością", desc: "Dla psów, kotów i ich opiekunów." },
              { Icon: Star, title: "Treść wkrótce", desc: "Pracujemy nad zawartością tej sekcji." },
            ].map(({ Icon, title: t, desc }) => (
              <div
                key={t}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-pink-300" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{t}</h3>
                <p className="mt-2 text-sm text-white/65">{desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* CTA bottom */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 p-8 text-center backdrop-blur-2xl md:p-12">
          <h2 className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            Zostań częścią społeczności PetlyAI
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Dołącz do tysięcy opiekunów, którzy dbają o swoje pupile mądrzej dzięki AI.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-purple-700 shadow-[0_0_30px_rgba(255,255,255,0.35)] transition hover:scale-105"
          >
            Zaczynamy
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
