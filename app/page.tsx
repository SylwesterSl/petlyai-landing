import {
  PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain, Sparkles, Users, Star, Bell, MessageCircle,
  Image as ImageIcon, Stethoscope, Activity, Award, BookOpen, Calendar, Map, ShieldCheck,
  Cat, Dog, Bone, Bird, Fish, Smile, Gift, Music, Zap,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import PopupManager from "@/components/PopupManager";
import {
  getContent, getImages, getFeatures, getSections,
  getNavbar, getFooter, getLegacyNav, getTiles,
  c, img, isSectionVisible, type SiteFeature,
} from "@/lib/cms";

export const revalidate = 60;

export const metadata = {
  title: "PetlyAI — Twój pupil w jednej aplikacji",
  description:
    "PetlyAI to aplikacja dla miłośników zwierząt: profile pupili, AI dla zdrowia i zachowania, społeczność i ranking.",
  alternates: { canonical: "https://petlyai.pl/" },
  openGraph: {
    title: "PetlyAI — Twój pupil w jednej aplikacji",
    description: "Profile pupili, AI dla zdrowia i zachowania, społeczność i ranking.",
    url: "https://petlyai.pl/",
    images: ["https://petlyai.pl/images/og-image.jpg"],
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain,
  Sparkles, Users, Star, Bell, MessageCircle, Image: ImageIcon,
  Stethoscope, Activity, Award, BookOpen, Calendar, Map, ShieldCheck,
  Cat, Dog, Bone, Bird, Fish, Smile, Gift, Music, Zap,
};
const renderIcon = (name: string, className: string) => {
  const Icon = iconMap[name] || PawPrint;
  return <Icon className={className} />;
};

// Paleta gradientów + ikon do auto-stylowania kafelków CMS (gdy nie mają własnych)
const tilePalette: { gradient: string; iconBg: string; iconColor: string; icon: string }[] = [
  { gradient: "from-pink-500/30 to-purple-500/30",   iconBg: "from-pink-500 to-purple-500",     iconColor: "text-white", icon: "PawPrint" },
  { gradient: "from-orange-500/30 to-pink-500/30",   iconBg: "from-orange-500 to-pink-500",     iconColor: "text-white", icon: "Camera" },
  { gradient: "from-blue-500/30 to-cyan-500/30",     iconBg: "from-blue-500 to-cyan-500",       iconColor: "text-white", icon: "ThumbsUp" },
  { gradient: "from-yellow-500/30 to-orange-500/30", iconBg: "from-yellow-500 to-orange-500",   iconColor: "text-white", icon: "Trophy" },
  { gradient: "from-purple-500/30 to-indigo-500/30", iconBg: "from-purple-500 to-indigo-500",   iconColor: "text-white", icon: "Brain" },
  { gradient: "from-pink-500/30 to-rose-500/30",     iconBg: "from-pink-500 to-rose-500",       iconColor: "text-white", icon: "Heart" },
  { gradient: "from-emerald-500/30 to-teal-500/30",  iconBg: "from-emerald-500 to-teal-500",    iconColor: "text-white", icon: "Sparkles" },
  { gradient: "from-violet-500/30 to-fuchsia-500/30",iconBg: "from-violet-500 to-fuchsia-500",  iconColor: "text-white", icon: "Star" },
  { gradient: "from-sky-500/30 to-blue-500/30",      iconBg: "from-sky-500 to-blue-500",        iconColor: "text-white", icon: "Users" },
];

export default async function Page() {
  const [content, images, features, sections, navPages, footerPages, legacyNav, tiles] =
    await Promise.all([
      getContent(), getImages(), getFeatures(), getSections(),
      getNavbar(), getFooter(), getLegacyNav(), getTiles(),
    ]);

  const howItWorks = features.filter((f) => f.section === "how_it_works" && f.visible);
  // Featured cards: prefer site_tiles (new CMS); fallback to site_features.
  const tileCards = tiles.length > 0 ? tiles : null;
  const featureCards = features.filter((f) => f.section === "features" && f.visible);

  // Top navbar: prefer site_pages (new CMS); fallback to site_navigation.
  const navItems = navPages.length > 0
    ? navPages.map((n) => ({ id: n.slug, label: n.title, href: n.slug }))
    : legacyNav.map((n) => ({ id: n.id, label: n.label, href: n.href }));

  // Group footer links from site_pages by footer_group.
  const footerGroups = footerPages.reduce<Record<string, { slug: string; title: string }[]>>((acc, p) => {
    const g = p.footer_group ?? "Linki";
    (acc[g] ??= []).push({ slug: p.slug, title: p.title });
    return acc;
  }, {});
  const footerGroupNames = Object.keys(footerGroups);

  const shareLabel = c(content, "share_button_label") || "Udostępnij 🚀";
  const shareUrl = c(content, "share_button_url") || "https://petlyai.pl";

  const renderHowItWorksCard = (f: SiteFeature, idx: number = 0) => {
    const palette = tilePalette[idx % tilePalette.length];
    const gradient = f.gradient && f.gradient.trim() ? f.gradient : palette.gradient;
    const iconColor = f.icon_color && f.icon_color.trim() ? f.icon_color : palette.iconColor;

    const inner = (
      <div className={`group relative p-[1.5px] rounded-2xl hover:scale-105 transition duration-300 ${f.link ? "cursor-pointer" : ""}`}>
        <div className={`p-[1.5px] rounded-2xl bg-gradient-to-r ${gradient}`}>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative z-10 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-xl opacity-40 group-hover:opacity-70 transition`} />
            <div className="relative z-10 text-center">
              <div className={`relative mb-6 flex justify-center ${iconColor}`}>
                <div className="absolute w-16 h-16 blur-2xl rounded-full opacity-40 bg-current" />
                {renderIcon(f.icon, `relative w-16 h-16 ${iconColor} drop-shadow-[0_0_15px_currentColor]`)}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm opacity-70 mt-2">{f.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
    return f.link ? (
      <a key={f.id} href={f.link} className="block">{inner}</a>
    ) : (
      <div key={f.id}>{inner}</div>
    );
  };

  const renderFeatureCard = (f: SiteFeature) => (
    <a key={f.id} href={f.link || "#"}>
      <div className={`group relative p-[1px] rounded-2xl bg-gradient-to-r ${f.gradient} hover:scale-105 transition cursor-pointer`}>
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
  );

  return (
    <main className="relative text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img src={img(images, "bg", "bg.jpg")} alt="" className="w-full h-full object-cover" />
        <img src={img(images, "stars", "stars.png")} alt="" className="absolute inset-0 w-full h-full opacity-60" />
        <img src={img(images, "gradient_glow", "gradient-glow.png")} alt="" className="absolute inset-0 w-full h-full opacity-70" />
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6">
        <a href="/">
          <img src={img(images, "logo", "logo.png")} alt="PetlyAI" className="w-24 md:w-36 h-auto object-contain" />
        </a>
        <nav className="hidden md:flex gap-8 text-sm opacity-80">
          {navItems.map((n) => (
            <a key={n.id} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a href={c(content, "header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full">
          {c(content, "header_cta")}
        </a>
      </header>

      {/* HERO */}
      {isSectionVisible(sections, "hero") && (
        <>
          <section className="md:hidden text-center px-4 relative -mt-10 flex flex-col items-center">
            <img src={img(images, "phone_right", "phone-right.png")} alt="" className="w-[100%] max-w-[460px] rotate-[4deg] mt-4 -mb-10 z-20" />
            <h1 className="text-3xl font-bold leading-tight mt-6">
              {c(content, "hero_title_line1")}<br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{c(content, "hero_title_line2")}</span><br />
              {c(content, "hero_title_line3")}
            </h1>
            <p className="mt-3 opacity-70 text-sm px-2">{c(content, "hero_subtitle")}</p>
            <div className="mt-4 flex justify-center gap-3 flex-wrap">
              <a href={c(content, "header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full text-sm">{c(content, "hero_cta_primary")}</a>
              <a href="#funkcje" className="border px-6 py-3 rounded-full text-sm">{c(content, "hero_cta_secondary")}</a>
            </div>
            <img src={img(images, "phone_left", "phone-left.png")} alt="" className="w-[95%] max-w-[440px] rotate-[-8deg] -mt-8 -mb-12 z-20" />
          </section>

          {/* Hero w trybie desktop. Dla telefonów z "widokiem komputerowym" (coarse pointer)
              powiększamy telefony i mocniej rozsuwamy je na boki, żeby napis miał miejsce. */}
          <style>{`
            @media (pointer: coarse) and (max-width: 1600px) {
              .hero-phone-left  { width: 480px !important; margin-right: -50px !important; }
              .hero-phone-right { width: 470px !important; margin-left: -55px !important; }
              .hero-text { padding-left: 1rem; padding-right: 1rem; }
            }
            /* Łuki (arc) widoczne tylko na prawdziwym desktopie - ukryte na telefonach w widoku komputerowym */
            @media (pointer: coarse) {
              .hero-arc { display: none !important; }
            }
          `}</style>
          <section className="hidden md:flex relative items-center justify-center gap-0 px-6 mt-10">
            <img src={img(images, "arc_left", "arc.png")} alt="" aria-hidden="true" className="hero-arc pointer-events-none select-none absolute left-[14%] bottom-[75px] w-[520px] z-10 opacity-90" />
            <img src={img(images, "arc_right", "arc.png")} alt="" aria-hidden="true" className="hero-arc pointer-events-none select-none absolute right-[14%] bottom-[80px] w-[520px] z-10 opacity-90 scale-x-[-1]" />
            <img src={img(images, "phone_left", "phone-left.png")} alt="" className="hero-phone-left relative w-[500px] rotate-[-8deg] z-20 -mr-12" />
            <div className="hero-text relative z-30 text-center px-2">
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
                {c(content, "hero_title_line1")}<br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{c(content, "hero_title_line2")}</span><br />
                {c(content, "hero_title_line3")}
              </h1>
              <p className="mt-4 opacity-70">{c(content, "hero_subtitle")}</p>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <a href={c(content, "header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full">{c(content, "hero_cta_primary")}</a>
                <a href="#funkcje" className="border px-6 py-3 rounded-full">{c(content, "hero_cta_secondary")}</a>
              </div>
            </div>
            <img src={img(images, "phone_right", "phone-right.png")} alt="" className="hero-phone-right relative w-[480px] rotate-[4deg] z-20 -ml-12" />
          </section>
        </>
      )}

      {/* HOW IT WORKS */}
      {isSectionVisible(sections, "how_it_works") && (
        <section className="mt-4 md:mt-16 text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">{c(content, "how_it_works_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((f, idx) => renderHowItWorksCard(f, idx))}
          </div>
        </section>
      )}

      {/* FEATURES — CMS site_tiles (preferred) lub fallback site_features */}
      {isSectionVisible(sections, "features") && (
        <section id="funkcje" className="relative mt-12 md:mt-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">{c(content, "features_title")}</h2>
          {tileCards ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tileCards.map((t, idx) => {
                const p = tilePalette[idx % tilePalette.length];
                // Use CMS values when set; fall back to the auto palette.
                const tAny = t as unknown as { gradient?: string | null; icon?: string | null; icon_color?: string | null };
                const gradient = tAny.gradient && tAny.gradient.trim() ? tAny.gradient : p.gradient;
                const iconBg = tAny.gradient && tAny.gradient.trim() ? tAny.gradient : p.iconBg;
                const tileIcon = tAny.icon && tAny.icon.trim() ? tAny.icon : p.icon;
                const iconColor = tAny.icon_color && tAny.icon_color.trim() ? tAny.icon_color : p.iconColor;
                return (
                  <a key={t.id} href={t.link} className="group block text-left">
                    <div className={`relative p-[1.5px] rounded-2xl bg-gradient-to-r ${gradient} hover:scale-[1.03] transition duration-300`}>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-50 blur-xl group-hover:opacity-80 transition`} />
                      <div className="relative z-10 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-start gap-4 min-h-[112px]">
                        <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]`}>
                          {renderIcon(tileIcon, `w-6 h-6 ${iconColor}`)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg leading-tight">{t.title}</h3>
                          {t.description && <p className="text-sm opacity-80 mt-1">{t.description}</p>}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {featureCards.map(renderFeatureCard)}
            </div>
          )}
        </section>
      )}

      {/* CTA */}
      {isSectionVisible(sections, "cta") && (
        <>
          <section className="md:hidden -mt-8 px-4 flex flex-col items-center text-center">
            <img src={img(images, "cat", "cat.png")} alt="" className="w-[70%] max-w-[340px] -mb-16 z-20" />
            <img src={img(images, "phones_group", "phones-group.png")} alt="" className="w-[95%] max-w-[440px] -mt-12 -mb-20 z-10" />
            <img src={img(images, "dog_left", "dog-left.png")} alt="" className="w-[70%] max-w-[340px] -mt-16 -mb-12 z-20" />
            <div className="max-w-xl -mt-4">
              <h2 className="text-3xl font-bold leading-tight">
                {c(content, "cta_title_line1")}<br />
                {c(content, "cta_title_line2")}
              </h2>
              <p className="mt-4 text-base opacity-80">{c(content, "cta_description")}</p>
              <a href={c(content, "header_cta_href") || "#"} className="inline-block mt-6 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full">{c(content, "cta_button")}</a>
            </div>
          </section>

          <section className="hidden md:flex relative overflow-visible mt-0 px-20 pb-24 -mb-16 flex-row items-center justify-center gap-10">
            <img src={img(images, "dog_left", "dog-left.png")} alt="" className="pointer-events-none absolute left-0 bottom-[-110px] z-30 w-[300px] lg:w-[360px] xl:w-[420px]" />
            <div className="max-w-xl text-left">
              <h2 className="text-5xl font-bold leading-tight">
                {c(content, "cta_title_line1")}<br />
                {c(content, "cta_title_line2")}
              </h2>
              <p className="mt-5 text-lg opacity-80">{c(content, "cta_description")}</p>
              <a href={c(content, "header_cta_href") || "#"} className="inline-block mt-12 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full">{c(content, "cta_button")}</a>
            </div>
            <img src={img(images, "phones_group", "phones-group.png")} alt="" className="relative z-10 w-[600px]" />
            <img src={img(images, "cat", "cat.png")} alt="" className="pointer-events-none absolute right-0 bottom-[-95px] z-30 w-[260px] lg:w-[320px] xl:w-[380px]" />
          </section>
        </>
      )}

      {/* FOOTER — linki z site_pages (footer_group) */}
      {isSectionVisible(sections, "footer") && (
        <footer className="mt-10 pt-16 pb-8 px-4 relative text-white overflow-hidden">
          {/* Tło footera — obraz z odcięciem (gwiazdy + łuk) */}
          <img
            src={img(images, "footer_bg", "footer-bg.jpg")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
          {/* Delikatne przyciemnienie dla czytelności tekstu */}
          <div className="absolute inset-0 bg-black/40 -z-10" />
          <div className="relative max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-10">
            <div className="mb-7 md:mb-0">
              <img src={img(images, "logo", "logo.png")} alt="PetlyAI" className="w-28 md:w-36 mb-3" />
              <p className="text-sm opacity-70 max-w-xs">{c(content, "footer_description")}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-7 md:contents">
              {footerGroupNames.length > 0 ? (
                footerGroupNames.slice(0, 2).map((group) => (
                  <div key={group}>
                    <p className="font-semibold mb-2">{group}</p>
                    <div className="flex flex-col gap-2 text-sm opacity-70">
                      {footerGroups[group].map((l) => (
                        <a key={l.slug} href={l.slug} className="hover:text-pink-400">{l.title}</a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                [1, 2].map((col) => (
                  <div key={col}>
                    <p className="font-semibold mb-2">{c(content, `footer_col${col}_title`)}</p>
                    <div className="flex flex-col gap-2 text-sm opacity-70">
                      {[1, 2, 3].map((i) => {
                        const label = c(content, `footer_col${col}_link${i}_label`);
                        const href = c(content, `footer_col${col}_link${i}_href`) || "#";
                        return label ? <a key={i} href={href} className="hover:text-pink-400">{label}</a> : null;
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div>
              <p className="font-semibold mb-2">{c(content, "footer_col3_title") || "Pobierz"}</p>
              <div className="flex items-center justify-between gap-3 md:block">
                <a href={c(content, "header_cta_href") || "#"} className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full">{c(content, "hero_cta_primary")}</a>
                <div className="md:hidden"><ShareButton label={shareLabel} url={shareUrl} /></div>
              </div>
              <p className="text-xs opacity-60 mt-2">{c(content, "footer_download_text")}</p>
              <div className="hidden md:block mt-3"><ShareButton label={shareLabel} url={shareUrl} /></div>
            </div>
          </div>
          <div className="text-center text-xs opacity-60 mt-10">{c(content, "footer_copyright")}</div>
        </footer>
      )}

      {/* CMS POPUPS */}
      <PopupManager pageSlug="/" />
    </main>
  );
}
