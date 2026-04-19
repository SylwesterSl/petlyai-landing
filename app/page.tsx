use client";

import { useEffect, useMemo } from "react";
import Head from "next/head";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * PetlyAI — strona główna (landing).
 *
 * Wszystkie nakładki (overlay) są w kodzie, a CMS dostarcza:
 *  - obrazy (arc, dog_left, cat, footer_bg, site_favicon, ...)
 *  - treści (seo_title / seo_description / seo_keywords)
 *  - przycisk Udostępnij (share_button_label / share_button_url / share_title / share_text)
 *
 * UWAGA: nazwa pliku/komponentu zależy od Twojego frameworka:
 *  - Next.js App Router  -> app/page.tsx (export default function Page)
 *  - Next.js Pages Router -> pages/index.tsx
 *  - Vite/React           -> src/pages/Index.tsx
 *
 * Klucze pobierane z CMS muszą istnieć w tabelach site_content / site_images.
 */

export default function Page() {
  const { content, images, img } = useSiteContent();

  // ── SEO ─────────────────────────────────────────────────────────────────
  const seoTitle = content.seo_title || "PetlyAI";
  const seoDescription = content.seo_description || "PetlyAI — społeczność miłośników zwierząt.";
  const seoKeywords = content.seo_keywords || "petlyai, zwierzęta, pies, kot";
  const faviconUrl = images.site_favicon || images.admin_logo || "/favicon.ico";

  // Aktualizuj <title>, meta description/keywords i favicon dynamicznie z CMS.
  // (Działa zarówno w Next.js App Router jak i w Vite — bezpieczny fallback.)
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = seoTitle;

    const setMeta = (name: string, value: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = value;
    };
    setMeta("description", seoDescription);
    setMeta("keywords", seoKeywords);

    // Favicon
    document.querySelectorAll("link[rel~='icon']").forEach((n) => n.parentNode?.removeChild(n));
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${faviconUrl}${faviconUrl.includes("?") ? "&" : "?"}v=${Date.now()}`;
    document.head.appendChild(link);
  }, [seoTitle, seoDescription, seoKeywords, faviconUrl]);

  // ── PRZYCISK UDOSTĘPNIJ ─────────────────────────────────────────────────
  const shareLabel = content.share_button_label || "Udostępnij 🚀";
  const shareUrl = content.share_button_url || "https://petlyai.pl";
  const shareTitle = content.share_title || "PetlyAI";
  const shareText = content.share_text || "Sprawdź PetlyAI 🐾";

  const handleShare = () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      (navigator as any)
        .share({ title: shareTitle, text: shareText, url: shareUrl })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Jeśli używasz Next.js Pages Router, ten <Head> ustawi SEO już przy SSR. */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="icon" href={faviconUrl} />
      </Head>

      <main className="bg-[#0F172A] text-white overflow-x-hidden">
        {/* ============================ HERO ============================ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-24 pb-32 overflow-hidden">
          {/* HERO arcs (overlay) */}
          <img
            src={img("arc", "arc.png")}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[3%] bottom-[-31%] w-[700px] opacity-90 blur-sm z-0"
          />
          <img
            src={img("arc", "arc.png")}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[3.5%] bottom-[-29%] w-[650px] opacity-90 blur-sm z-0 scale-x-[-1]"
          />

          <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {content.hero_title || "PetlyAI"}
          </h1>
          <p className="relative z-10 mt-4 text-base md:text-lg text-center text-white/80 max-w-2xl">
            {content.hero_subtitle || "Społeczność miłośników zwierząt z asystentem AI"}
          </p>

          {content.hero_cta_primary && (
            <a
              href={content.hero_cta_link || "#"}
              className="relative z-10 mt-8 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-full font-semibold"
            >
              {content.hero_cta_primary}
            </a>
          )}
        </section>

        {/* ============================ CTA ============================ */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {content.cta_title || "Dołącz do PetlyAI"}
            </h2>
            <p className="text-white/80">{content.cta_subtitle || ""}</p>
          </div>

          {/* CTA animals (overlay) */}
          <img
            src={img("dog_left", "dog.png")}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[-60px] bottom-[90px] w-[300px] md:w-[440px] z-20"
          />
          <img
            src={img("cat", "cat.png")}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-20px] bottom-[100px] w-[300px] md:w-[400px] z-20"
          />
        </section>

        {/* ============================ FOOTER ============================ */}
        <footer className="relative pt-20 pb-10 px-4 overflow-hidden">
          {/* Footer background (overlay) */}
          <img
            src={img("footer_bg", "footer-bg.jpg")}
            alt=""
            aria-hidden
            className="absolute bottom-0 left-0 w-full h-full object-cover opacity-90 z-0"
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="font-bold mb-2">{content.footer_col1_title || "PetlyAI"}</h3>
              <p className="text-sm text-white/70">{content.footer_col1_text || ""}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">{content.footer_col2_title || "Społeczność"}</h3>
            </div>
            <div>
              <h3 className="font-bold mb-2">{content.footer_col3_title || "Pomoc"}</h3>
            </div>

            {/* Kolumna „Pobierz” + przycisk Udostępnij */}
            <div>
              <h3 className="font-bold mb-2">{content.footer_col4_title || "Pobierz"}</h3>
              <p className="text-sm text-white/70 mb-3">
                {content.footer_col4_text || "Aplikacja PetlyAI dostępna wkrótce."}
              </p>

              {/* Główne CTA (np. App Store / Google Play link tekstowy z CMS) */}
              {content.hero_cta_primary && (
                <a
                  href={content.hero_cta_link || "#"}
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full text-white text-sm"
                >
                  {content.hero_cta_primary}
                </a>
              )}

              {/* === PRZYCISK UDOSTĘPNIJ (zarządzany w CMS) === */}
              <button
                type="button"
                onClick={handleShare}
                className="mt-3 block bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full text-white text-sm"
              >
                {shareLabel}
              </button>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
