import { PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain } from "lucide-react";
import { getCmsData, c, img, isSectionVisible, type SiteFeature } from "@/lib/cms";

// Rewaliduj co 60s — zmiany w CMS pojawią się automatycznie
export const revalidate = 60;

const iconMap: Record<string, any> = {
  PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain,
};

const renderIcon = (name: string, className: string) => {
  const Icon = iconMap[name] || PawPrint;
  return <Icon className={className} />;
};

export default async function Page() {
  const { content, images, navigation, features, sections } = await getCmsData();

  const howItWorks = features.filter((f) => f.section === "how_it_works" && f.visible);
  const featureCards = features.filter((f) => f.section === "features" && f.visible);
  const visibleNav = navigation.filter((n) => n.visible);

  const renderHowItWorksCard = (f: SiteFeature) => (
    <div key={f.id} className="group relative p-[1.5px] rounded-2xl hover:scale-105 transition duration-300">
      <div className={`p-[1.5px] rounded-2xl bg-gradient-to-r ${f.gradient}`}>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-400/10 blur-xl opacity-40 group-hover:opacity-70 transition" />
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
  );

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
          {visibleNav.map((n) => (
            <a key={n.id} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a href={c(content, "header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full">
          {c(content, "header_cta")}
        </a>
      </header>

      {/* HERO */}
      {isSectionVisible(sections, "hero") && (
        <section className="text-center mt-20 px-4 relative min-h-[550px] flex flex-col justify-start">
          {/* ŁUKI — lewy + odbity prawy */}
          <img
            src={img(images, "arc", "arc.png")}
            alt=""
            className="pointer-events-none absolute left-[3%] bottom-[-31%] w-[700px] opacity-90 blur-sm z-0"
          />
          <img
            src={img(images, "arc", "arc.png")}
            alt=""
            className="pointer-events-none absolute right-[3.5%] bottom-[-29%] w-[650px] opacity-120 blur-sm z-0 scale-x-[-1]"
          />

          <img src={img(images, "phone_left", "phone-left.png")} alt="" className="absolute left-[5%] top-[-14%] w-[320px] md:w-[580px] rotate-[-8deg] z-20" />
          <img src={img(images, "phone_right", "phone-right.png")} alt="" className="absolute right-[7%] top-[-12%] w-[320px] md:w-[560px] rotate-[4deg] z-20" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {c(content, "hero_title_line1")}<br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {c(content, "hero_title_line2")}
            </span><br />
            {c(content, "hero_title_line3")}
          </h1>
          <p className="mt-4 opacity-70">{c(content, "hero_subtitle")}</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <a href={c(content, "header_cta_href") || "#"} className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full">
              {c(content, "hero_cta_primary")}
            </a>
            <a href="#funkcje" className="border px-6 py-3 rounded-full">
              {c(content, "hero_cta_secondary")}
            </a>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {isSectionVisible(sections, "how_it_works") && (
        <section className="mt-16 text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{c(content, "how_it_works_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howItWorks.map(renderHowItWorksCard)}
          </div>
        </section>
      )}

      {/* FEATURES */}
      {isSectionVisible(sections, "features") && (
        <section className="relative mt-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{c(content, "features_title")}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {featureCards.map(renderFeatureCard)}
          </div>
        </section>
      )}

      {/* CTA */}
      {isSectionVisible(sections, "cta") && (
        <section className="relative mt-0 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-10 pb-0">
          <div className="max-w-xl relative left-[-20px] top-[-100px] text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {c(content, "cta_title_line1")}<br />
              {c(content, "cta_title_line2")}
            </h2>
            <p className="mt-5 text-lg opacity-80">{c(content, "cta_description")}</p>
            <a href={c(content, "header_cta_href") || "#"} className="inline-block mt-12 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full hover:scale-110 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition">
              {c(content, "cta_button")}
            </a>
          </div>
          <div className="relative z-10 w-[420px] md:w-[600px] left-[90px] top-[-20px]">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 blur-3xl opacity-50" />
            <img src={img(images, "phones_group", "phones-group.png")} alt="" className="relative z-10 w-[300px] md:w-[550px] scale-110 md:scale-125 hover:scale-130 transition" />
          </div>

          {/* ZWIERZAKI — pies lewa, kot prawa */}
          <img
            src={img(images, "dog_left", "dog-left.png")}
            alt=""
            className="pointer-events-none absolute left-[-60px] bottom-[90px] w-[300px] md:w-[440px] z-20"
          />
          <img
            src={img(images, "cat", "cat.png")}
            alt=""
            className="pointer-events-none absolute right-[-20px] bottom-[100px] w-[300px] md:w-[400px] z-20"
          />
        </section>
      )}

     {/* FOOTER */}
      {isSectionVisible(sections, "footer") && (
        <footer className="mt-10 py-8 px-4 relative text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <img src={img(images, "logo", "logo.png")} alt="PetlyAI" className="w-28 md:w-36 mb-3" />
              <p className="text-sm opacity-70 max-w-xs">{c(content, "footer_description")}</p>
            </div>
            {[1, 2].map((col) => (
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
            ))}
            <div>
              <p className="font-semibold mb-2">{c(content, "footer_col3_title")}</p>
              <a href={c(content, "header_cta_href") || "#"} className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full">
                {c(content, "hero_cta_primary")}
              </a>
              <p className="text-xs opacity-60 mt-2">{c(content, "footer_download_text")}</p>
            </div>
          </div>
          <div className="text-center text-xs opacity-60 mt-10">{c(content, "footer_copyright")}</div>
        </footer>
      )}
    </main>
  );
}
