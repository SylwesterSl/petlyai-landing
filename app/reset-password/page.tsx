import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordClient from "@/components/ResetPasswordClient";
import { ShareButton } from "@/components/ShareButton";
import {
  getContent,
  getImages,
  getFooter,
  getNavbar,
  getLegacyNav,
  c,
  img,
} from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Reset hasła — PetlyAI",
  description: "Aby ustawić nowe hasło, otwórz aplikację PetlyAI na swoim telefonie.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage() {
  const [content, images, navPages, footerPages, legacyNav] = await Promise.all([
    getContent(),
    getImages(),
    getNavbar(),
    getFooter(),
    getLegacyNav(),
  ]);

  const navItems =
    navPages.length > 0
      ? navPages.map((n) => ({ id: n.slug, label: n.title, href: n.slug }))
      : legacyNav.map((n) => ({ id: n.id, label: n.label, href: n.href }));

  const footerGroups = footerPages.reduce<
    Record<string, { slug: string; title: string }[]>
  >((acc, p) => {
    const group = p.footer_group ?? "Linki";
    (acc[group] ??= []).push({ slug: p.slug, title: p.title });
    return acc;
  }, {});

  const footerGroupNames = Object.keys(footerGroups);

  const shareLabel = c(content, "share_button_label") || "Udostępnij 🚀";
  const shareUrl = c(content, "share_button_url") || "https://petlyai.pl";

  return (
    <main className="relative text-white overflow-hidden min-h-screen">
      {/* GALAXY BACKGROUND — identyczny jak na działających podstronach */}
      <div className="fixed inset-0 -z-10">
        <img
          src={img(images, "bg", "bg.jpg")}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <img
          src={img(images, "stars", "stars.png")}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-60"
        />
        <img
          src={img(images, "gradient_glow", "gradient-glow.png")}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-70"
        />
      </div>

      {/* HEADER — skopiowany z działających podstron */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 relative z-30">
        <a href="/">
          <img
            src={img(images, "logo", "logo.png")}
            alt="PetlyAI"
            className="w-24 md:w-36 h-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex gap-8 text-sm opacity-80">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={n.href}
              className="hover:text-pink-400 transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={c(content, "header_cta_href") || "#"}
          className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full"
        >
          {c(content, "header_cta") || "Pobierz"}
        </a>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          Reset hasła
        </h1>

        <p className="mt-5 text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          Aby ustawić nowe hasło, otwórz aplikację PetlyAI na swoim telefonie.
        </p>
      </section>

      {/* ŚRODEK RESETU HASŁA */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-10 md:mt-14 mb-20">
        <div className="p-6 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.3)]">
          <Suspense fallback={null}>
            <ResetPasswordClient />
          </Suspense>
        </div>
      </section>

      {/* FOOTER — skopiowany z działających podstron */}
      <footer className="mt-32 md:mt-40 pt-16 pb-8 px-4 relative text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={img(images, "footer_bg", "footer-bg.jpg")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="hidden md:block pointer-events-none">
          <img
            src={img(images, "dog_left", "dog-left.png")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 z-30 w-[200px] lg:w-[240px] xl:w-[280px] h-auto"
            style={{ bottom: "calc(100% - 60px)" }}
          />
          <img
            src={img(images, "cat", "cat.png")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 z-30 w-[170px] lg:w-[210px] xl:w-[250px] h-auto"
            style={{ bottom: "calc(100% - 50px)" }}
          />
        </div>

        <div className="md:hidden flex justify-between items-end -mt-20 mb-4 px-2 relative z-30">
          <img
            src={img(images, "dog_left", "dog-left.png")}
            alt=""
            aria-hidden="true"
            className="w-[32%] max-w-[140px] h-auto"
          />
          <img
            src={img(images, "cat", "cat.png")}
            alt=""
            aria-hidden="true"
            className="w-[28%] max-w-[120px] h-auto"
          />
        </div>

        <div className="relative max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-10">
          <div className="mb-7 md:mb-0">
            <img
              src={img(images, "logo", "logo.png")}
              alt="PetlyAI"
              className="w-28 md:w-36 mb-3"
            />
            <p className="text-sm opacity-70 max-w-xs">
              {c(content, "footer_description")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-7 md:contents">
            {footerGroupNames.length > 0 ? (
              footerGroupNames.slice(0, 2).map((group) => (
                <div key={group}>
                  <p className="font-semibold mb-2">{group}</p>
                  <div className="flex flex-col gap-2 text-sm opacity-70">
                    {footerGroups[group].map((l) => (
                      <a
                        key={l.slug}
                        href={l.slug}
                        className="hover:text-pink-400"
                      >
                        {l.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              [1, 2].map((col) => (
                <div key={col}>
                  <p className="font-semibold mb-2">
                    {c(content, `footer_col${col}_title`)}
                  </p>
                  <div className="flex flex-col gap-2 text-sm opacity-70">
                    {[1, 2, 3].map((i) => {
                      const label = c(content, `footer_col${col}_link${i}_label`);
                      const href = c(content, `footer_col${col}_link${i}_href`) || "#";

                      return label ? (
                        <a
                          key={i}
                          href={href}
                          className="hover:text-pink-400"
                        >
                          {label}
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <p className="font-semibold mb-2">
              {c(content, "footer_col3_title") || "Pobierz"}
            </p>

            <div className="flex items-center justify-between gap-3 md:block">
              <a
                href={c(content, "header_cta_href") || "#"}
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full"
              >
                {c(content, "hero_cta_primary") || "Pobierz aplikację"}
              </a>

              <div className="md:hidden">
                <ShareButton label={shareLabel} url={shareUrl} />
              </div>
            </div>

            <p className="text-xs opacity-60 mt-2">
              {c(content, "footer_download_text")}
            </p>

            <div className="hidden md:block mt-3">
              <ShareButton label={shareLabel} url={shareUrl} />
            </div>
          </div>
        </div>

        <div className="text-center text-xs opacity-60 mt-10">
          {c(content, "footer_copyright")}
        </div>
      </footer>
    </main>
  );
}

