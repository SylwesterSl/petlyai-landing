// app/layout.tsx — wklej do projektu landing (petlyai.pl)
// SEO + OG czytane z CMS, ALE og:image ZAWSZE z własnej domeny (stabilny URL dla WhatsApp/Facebook).
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import "./globals.css";

const SUPABASE_URL = "https://mslnptcmvciwyxwqjvmi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbG5wdGNtdmNpd3l4d3Fqdm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzMzMTYsImV4cCI6MjA4OTc0OTMxNn0.8-6sGetqRaub5T-A0M5ttY5-ZKlNt2tCF1GKK85P_XY";

// Stały, publiczny URL OG image — serwowany z naszej domeny (bez CDN/storage Lovable).
// Plik musi istnieć w /public/images/og-image.jpg w projekcie landingu.
const OG_IMAGE_URL = "https://petlyai.pl/images/og-image.jpg";

export const revalidate = 60;

async function loadSeo() {
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const [{ data: content }, { data: images }] = await Promise.all([
    sb.from("site_content").select("key,value").eq("section", "seo"),
    sb.from("site_images").select("key,public_url").eq("key", "site_favicon"),
  ]);

  const c = Object.fromEntries((content ?? []).map((r) => [r.key, r.value]));
  const favicon = images?.find((i) => i.key === "site_favicon");

  return {
    title: c.seo_title || "PetlyAI",
    description: c.seo_description || "",
    keywords: c.seo_keywords || "",
    url: c.seo_og_url || "https://petlyai.pl",
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
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE_URL],
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
