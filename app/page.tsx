"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain } from "lucide-react";

// ============================================================================
// SUPABASE CLIENT (PetlyAI Lovable Cloud — same backend as admin panel)
// ============================================================================
const SUPABASE_URL = "https://vncvpsobkgvpwcxzvsfr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3Zwc29ia2d2cHdjeHp2c2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDg5MTYsImV4cCI6MjA5MTkyNDkxNn0.5Ej8c7x_CNJJ4N_0QbbBSHEqDb4CHD3a1NzsXDpezvM";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// TYPES
// ============================================================================
type SiteContent = Record<string, string>;
type SiteImages = Record<string, string>;

interface SiteNavItem {
  id: string;
  label: string;
  href: string;
  position: number;
  visible: boolean;
}

interface SiteFeature {
  id: string;
  section: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  icon_color: string;
  link: string | null;
  position: number;
  visible: boolean;
}

interface SiteSection {
  id: string;
  key: string;
  label: string;
  visible: boolean;
  position: number;
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain,
};

// ============================================================================
// PAGE
// ============================================================================
export default function Page() {
  const [content, setContent] = useState<SiteContent>({});
  const [images, setImages] = useState<SiteImages>({});
  const [navigation, setNavigation] = useState<SiteNavItem[]>([]);
  const [features, setFeatures] = useState<SiteFeature[]>([]);
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [contentRes, navRes, featRes, secRes, imgRes] = await Promise.all([
        supabase.from("site_content").select("*"),
        supabase.from("site_navigation").select("*").order("position"),
        supabase.from("site_features").select("*").order("position"),
        supabase.from("site_sections").select("*").order("position"),
        supabase.from("site_images").select("*"),
      ]);

      if (contentRes.data) {
        const map: SiteContent = {};
        contentRes.data.forEach((r: any) => { map[r.key] = r.value; });
        setContent(map);
      }
      if (imgRes.data) {
        const map: SiteImages = {};
        imgRes.data.forEach((r: any) => { if (r.public_url) map[r.key] = r.public_url; });
        setImages(map);
      }
      if (navRes.data) setNavigation(navRes.data as any);
      if (featRes.data) setFeatures(featRes.data as any);
      if (secRes.data) setSections(secRes.data as any);
      setLoading(false);
    })();
  }, []);

  // ------ Dynamic SEO + Favicon ------
  useEffect(() => {
    if (!Object.keys(content).length) return;

    if (content.seo_title) document.title = content.seo_title;

    const setMeta = (name: string, val: string) => {
      if (!val) return;
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = val;
    };
    setMeta("description", content.seo_description || "");
    setMeta("keywords", content.seo_keywords || "");

    const fav = images.site_favicon || images.admin_logo;
    if (fav) {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = fav;
    }
  }, [content, images]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  // ------ Helpers ------
  const c = (key: string) => content[key] ?? "";
  const img = (key: string, fallbackFilename: string) =>
    images[key] || `/images/${fallbackFilename}`;
  const isSectionVisible = (key: string) => {
    const s = sections.find((sec) => sec.key === key);
    return s ? s.visible : true;
  };
  const renderIcon = (iconName: string, className: string) => {
    const Icon = iconMap[iconName] || PawPrint;
    return <Icon className={className} />;
  };

  const howItWorks = features.filter((f) => f.section === "how_it_works" && f.visible);
  const featureCards = features.filter((f) => f.section === "features" && f.visible);
  const visibleNav = navigation.filter((n) => n.visible);

  // ------ Share handler ------
  const shareUrl = c("share_button_url") || "https://petlyai.pl";
  const shareTitle = c("share_title") || "PetlyAI";
  const shareText = c("share_text") || "Sprawdź PetlyAI 🐾";
  const shareLabel = c("share_button_label") || "Udostępnij 🚀";

  const handleShare = () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      (navigator as any).share({ title: shareTitle, text: shareText, url: shareUrl }).catch(() => {});
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <main className="relative text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img src={img("bg", "bg.jpg")} alt="" className="w-full h-full object-cover" />
        <img src={img("stars", "stars.png")} alt="" className="absolute inset-0 w-full h-full opacity-60" />
        <img src={img("gradient_glow", "gradient-glow.png")} alt="" className="absolute inset-0 w-full h-full opacity-70" />
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6">
        <a href="/">
          <div className="relative z-50 flex items-center gap-3 cursor-pointer group">
            <img src={img("logo", "logo.png")} alt="PetlyAI" className="w-24 md:w-36 h-auto object-contain transition group-hover:scale-110 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
          </div>
        </a>
        <nav className="hidden md:flex gap-8 text-sm opacity-80">
          {visibleNav.map((n) => (
            <a key={n.id} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a href={c("header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full">
          {c("header_cta")}
        </a>
      </header>

      {/* HERO */}
      {isSectionVisible("hero") && (
        <>
          {/* ===== MOBILE HERO (visible < md) ===== */}
          <section className="md:hidden text-center mt-8 px-4 relative flex flex-col items-center">
            {/* Top centered phone (right one) */}
            <img
              src={img("phone_right", "phone-right.png")}
              alt=""
              className="w-[220px] sm:w-[260px] mx-auto rotate-[4deg] drop-shadow-[0_10px_30px_rgba(236,72,153,0.35)]"
            />

            {/* Title */}
            <h1 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight">
              {c("hero_title_line1")}<br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {c("hero_title_line2")}
              </span><br />
              {c("hero_title_line3")}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-sm opacity-70 max-w-sm">{c("hero_subtitle")}</p>

            {/* CTAs */}
            <div className="mt-5 flex justify-center gap-3 flex-wrap">
              <a href={c("header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2.5 rounded-full text-sm hover:scale-105 transition">
                {c("hero_cta_primary")}
              </a>
              <a href="#funkcje" className="border px-5 py-2.5 rounded-full text-sm hover:bg-white/10 transition">
                {c("hero_cta_secondary")}
              </a>
            </div>

            {/* Bottom centered phone (left one) with small arcs around it */}
            <div className="relative mt-8 w-full flex justify-center">
              <img
                src={img("arc", "arc.png")}
                alt=""
                className="pointer-events-none absolute left-[-10%] bottom-[-10%] w-[60%] opacity-70 blur-sm"
              />
              <img
                src={img("arc", "arc.png")}
                alt=""
                className="pointer-events-none absolute right-[-10%] bottom-[-10%] w-[60%] opacity-70 blur-sm scale-x-[-1]"
              />
              <img
                src={img("phone_left", "phone-left.png")}
                alt=""
                className="relative w-[220px] sm:w-[260px] rotate-[-8deg] drop-shadow-[0_10px_30px_rgba(168,85,247,0.35)] z-10"
              />
            </div>
          </section>

          {/* ===== DESKTOP HERO (visible >= md) — original layout untouched ===== */}
          <section className="hidden md:flex text-center mt-20 px-4 relative min-h-[550px] flex-col justify-start">
            <img src={img("arc", "arc.png")} alt="" className="pointer-events-none absolute left-[3%] bottom-[-31%] w-[700px] opacity-90 blur-sm z-0" />
            <img src={img("arc", "arc.png")} alt="" className="pointer-events-none absolute right-[3.5%] bottom-[-29%] w-[650px] opacity-120 blur-sm z-0 scale-x-[-1]" />
            <img src={img("phone_left", "phone-left.png")} alt="" className="absolute left-[5%] top-[-14%] w-[580px] rotate-[-8deg] z-20" />
            <img src={img("phone_right", "phone-right.png")} alt="" className="absolute right-[7%] top-[-12%] w-[560px] rotate-[4deg] z-20" />

            <h1 className="text-6xl font-bold leading-tight">
              {c("hero_title_line1")}<br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {c("hero_title_line2")}
              </span><br />
              {c("hero_title_line3")}
            </h1>

            <p className="mt-4 opacity-70">{c("hero_subtitle")}</p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <a href={c("header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full hover:scale-105 transition">
                {c("hero_cta_primary")}
              </a>
              <a href="#funkcje" className="border px-6 py-3 rounded-full hover:bg-white/10 transition">
                {c("hero_cta_secondary")}
              </a>
            </div>
          </section>
        </>
      )}

      {/* JAK TO DZIAŁA */}
      {isSectionVisible("how_it_works") && (
        <section className="mt-16 text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{c("how_it_works_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((f) => (
              <div key={f.id} className="group relative p-[1.5px] rounded-2xl transition duration-300 hover:scale-105">
                <div className={`p-[1.5px] rounded-2xl bg-gradient-to-r ${f.gradient}`}>
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-400/10 blur-xl opacity-40 group-hover:opacity-70 transition duration-300" />
                    <div className="relative z-10 text-center">
                      <div className="relative mb-6 flex justify-center">
                        <div className="absolute w-16 h-16 bg-pink-500/30 blur-2xl rounded-full" />
                        {renderIcon(f.icon, `relative w-16 h-16 ${f.icon_color} drop-shadow-[0_0_15px_rgba(236,72,153,0.9)]`)}
                      </div>
                      <h3 className="font-semibold text-lg">{f.title}</h3>
                      <p className="text-sm opacity-70 mt-2">{f.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CO OFERUJE */}
      {isSectionVisible("features") && (
        <section className="relative mt-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{c("features_title")}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {featureCards.map((f) => (
              <a key={f.id} href={f.link || "#"}>
                <div className={`group relative p-[1px] rounded-2xl bg-gradient-to-r ${f.gradient} hover:scale-105 transition duration-300 cursor-pointer`}>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${f.gradient} opacity-40 blur-xl group-hover:opacity-70 transition`} />
                  <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                    {renderIcon(f.icon, `w-12 h-12 ${f.icon_color} drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]`)}
                    <div className="text-left">
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm opacity-70">{f.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {isSectionVisible("cta") && (
        <section className="mt-0 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-10 pb-0 relative">
          <div className="max-w-xl relative left-[-20px] top-[-100px] text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {c("cta_title_line1")}<br />
              {c("cta_title_line2")}
            </h2>
            <p className="mt-5 text-lg opacity-80">{c("cta_description")}</p>
            <a href={c("header_cta_href") || "#"} className="inline-block mt-12 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full hover:scale-110 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition">
              {c("cta_button")}
            </a>
          </div>
          <div className="relative z-10 w-[420px] md:w-[600px] left-[90px] top-[-20px]">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 blur-3xl opacity-50" />
            <img src={img("phones_group", "phones-group.png")} alt="" className="relative z-10 w-[300px] md:w-[550px] scale-110 md:scale-125 hover:scale-130 transition" />
          </div>
          <img src={img("dog_left", "dog-left.png")} alt="" className="pointer-events-none absolute left-[-60px] bottom-[90px] w-[300px] md:w-[440px] z-20" />
          <img src={img("cat", "cat.png")} alt="" className="pointer-events-none absolute right-[-20px] bottom-[100px] w-[300px] md:w-[400px] z-20" />
        </section>
      )}

      {/* FOOTER */}
      {isSectionVisible("footer") && (
        <footer className="mt-[-180px] py-4 px-4 relative overflow-hidden text-white">
          <img src={img("footer_bg", "footer-bg.jpg")} alt="" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-90 -z-10 scale-110" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            <div className="flex flex-col items-start">
              <img src={img("logo", "logo.png")} alt="PetlyAI" className="w-28 md:w-36 h-auto object-contain mb-3" />
              <p className="text-sm opacity-70 max-w-xs">{c("footer_description")}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">{c("footer_col1_title")}</p>
              <div className="flex flex-col gap-2 text-sm opacity-70">
                {[1, 2, 3].map((i) => {
                  const label = c(`footer_col1_link${i}_label`);
                  const href = c(`footer_col1_link${i}_href`) || "#";
                  return label ? <a key={i} href={href} className="hover:text-pink-400 transition cursor-pointer">{label}</a> : null;
                })}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">{c("footer_col2_title")}</p>
              <div className="flex flex-col gap-2 text-sm opacity-70">
                {[1, 2, 3].map((i) => {
                  const label = c(`footer_col2_link${i}_label`);
                  const href = c(`footer_col2_link${i}_href`) || "#";
                  return label ? <a key={i} href={href} className="hover:text-pink-400 transition cursor-pointer">{label}</a> : null;
                })}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">{c("footer_col3_title")}</p>
              <a href={c("header_cta_href") || "#"} className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full hover:scale-110 transition duration-300 shadow-lg">
                {c("hero_cta_primary")}
              </a>
              <button
                onClick={handleShare}
                className="mt-3 block bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full text-white text-sm hover:scale-105 transition"
              >
                {shareLabel}
              </button>
              <p className="text-xs opacity-60 mt-2">{c("footer_download_text")}</p>
            </div>
          </div>
          <div className="text-center text-xs opacity-60 mt-10 relative z-10">
            {c("footer_copyright")}
          </div>
        </footer>
      )}
    </main>
  );
}
