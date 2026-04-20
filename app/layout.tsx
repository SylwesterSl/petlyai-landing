// app/layout.tsx — wklej do projektu landing (petlyai.pl)
// Dynamicznie czyta SEO + OG z CMS (Lovable Cloud / Supabase).
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import "./globals.css";

const SUPABASE_URL = "https://vncvpsobkgvpwcxzvsfr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3Zwc29ia2d2cHdjeHp2c2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDg5MTYsImV4cCI6MjA5MTkyNDkxNn0.5Ej8c7x_CNJJ4N_0QbbBSHEqDb4CHD3a1NzsXDpezvM";

export const revalidate = 60; // odświeżaj meta co 60 s

async function loadSeo() {
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const [{ data: content }, { data: images }] = await Promise.all([
    sb.from("site_content").select("key,value").eq("section", "seo"),
    sb.from("site_images").select("key,public_url,updated_at").in("key", ["og_image", "site_favicon"]),
  ]);

  const c = Object.fromEntries((content ?? []).map((r) => [r.key, r.value]));
  const ogImg = images?.find((i) => i.key === "og_image");
  const favicon = images?.find((i) => i.key === "site_favicon");

  // cache-buster oparty o updated_at — wymusza odświeżenie OG po zmianie
  const ogUrl = ogImg?.public_url
    ? `${ogImg.public_url}?v=${encodeURIComponent(ogImg.updated_at ?? Date.now())}`
    : undefined;

  return {
    title: c.seo_title || "PetlyAI",
    description: c.seo_description || "",
    keywords: c.seo_keywords || "",
    url: c.seo_og_url || "https://petlyai.pl",
    ogImage: ogUrl,
    favicon: favicon?.public_url,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await loadSeo();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    metadataBase: new URL(seo.url),
    alternates: { canonical: seo.url },
    icons: seo.favicon ? { icon: seo.favicon } : undefined,
    openGraph: {
      type: "website",
      url: seo.url,
      title: seo.title,
      description: seo.description,
      siteName: "PetlyAI",
      locale: "pl_PL",
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
