import type { Metadata } from "next";
import {
  getContent,
  getImages,
  getFeatures,
  getFooter,
  getNavbar,
  getLegacyNav,
  getPage,
  getTiles,
  listPages,
  c,
  img,
  type CmsTile,
  type SiteFeature,
} from "@/lib/cms";
import { ShareButton } from "@/components/ShareButton";
import PopupManager from "@/components/PopupManager";

export const revalidate = 60;
export const dynamicParams = true;

type CmsRouteParams = { slug: string };
type CmsRouteProps = { params: CmsRouteParams | Promise<CmsRouteParams> };

const getRouteSlug = async (params: CmsRouteProps["params"]) => {
  const resolved = await params;
  return resolved.slug;
};

const normalizePath = (value: string) => {
  const clean = value.split("?")[0].split("#")[0];
  return clean.startsWith("/") ? clean : `/${clean}`;
};

const titleFromSlug = (slug: string) =>
  slug
    .replace(/^\//, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const pageDefaults: Record<string, { title: string; subtitle: string; points: string[] }> = {
  "/profile": {
    title: "Profile zwierząt",
    subtitle: "Twórz profile i historię pupila w jednym pięknym miejscu.",
    points: ["Wizytówka pupila", "Historia i wspomnienia", "Wygodne zarządzanie danymi"],
  },
  "/dodaj-pupila": {
    title: "Dodaj swojego pupila",
    subtitle: "Utwórz profil i dziel się przygodami swojego zwierzaka.",
    points: ["Szybki start", "Dane, zdjęcia i opis", "Gotowe miejsce na rozwój profilu"],
  },
  "/media": {
    title: "Zdjęcia i chwile",
    subtitle: "Dodawaj zdjęcia i filmy, aby zachować najważniejsze momenty.",
    points: ["Galeria wspomnień", "Zdjęcia i krótkie historie", "Chwile zawsze pod ręką"],
  },
};

const getLinkedItem = (slug: string, tiles: CmsTile[], features: SiteFeature[]) => {
  const path = normalizePath(slug);
  const tile = tiles.find((item) => item.link && normalizePath(item.link) === path);
  const feature = features.find((item) => item.link && normalizePath(item.link) === path);
  const defaults = pageDefaults[path];

  return {
    title: tile?.title || feature?.title || defaults?.title || titleFromSlug(path) || "PetlyAI",
    subtitle:
      tile?.description ||
      feature?.description ||
      defaults?.subtitle ||
      "Ta podstrona jest częścią ekosystemu PetlyAI i może być uzupełniana z CMS.",
    points: defaults?.points || ["Spójny wygląd z landing page", "Treść możliwa do rozbudowy w CMS", "Gotowa sekcja dla użytkowników"],
  };
};

export async function generateStaticParams() {
  const pages = await listPages();
  return pages.map((p) => ({ slug: p.slug.replace(/^\//, "") }));
}

export async function generateMetadata({ params }: CmsRouteProps): Promise<Metadata> {
  const slug = await getRouteSlug(params);
  const [page, tiles, features] = await Promise.all([getPage(slug), getTiles(), getFeatures()]);
  const fallback = getLinkedItem(slug, tiles, features);
  const title = page?.seo_title || page?.title || fallback.title;
  const description = page?.seo_description || fallback.subtitle;
  const ogImage = page?.og_image || "https://petlyai.pl/images/og-image.jpg";
  const canonical = `https://petlyai.pl${normalizePath(page?.slug || slug)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      url: canonical,
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
    alternates: { canonical },
  };
}

export default async function CmsPage({ params }: CmsRouteProps) {
  const slug = await getRouteSlug(params);
  const [page, tiles, features, content, images, navPages, footerPages, legacyNav] =
    await Promise.all([
      getPage(slug),
      getTiles(),
      getFeatures(),
      getContent(),
      getImages(),
      getNavbar(),
      getFooter(),
      getLegacyNav(),
    ]);

  const fallback = getLinkedItem(slug, tiles, features);
  const hasCmsContent = Boolean(page?.content?.trim());
  const title = page?.title || fallback.title;
  const subtitle = page?.seo_description || fallback.subtitle;

  // ----- Nawigacja (1:1 jak homepage) -----
  const navItems =
    navPages.length > 0
      ? navPages.map((n) => ({ id: n.slug, label: n.title, href: n.slug }))
      : legacyNav.map((n) => ({ id: n.id, label: n.label, href: n.href }));

  // ----- Grupy linków w stopce (1:1 jak homepage) -----
  const footerGroups = footerPages.reduce<Record<string, { slug: string; title: string }[]>>(
    (acc, p) => {
      const g = p.footer_group ?? "Linki";
      (acc[g] ??= []).push({ slug: p.slug, title: p.title });
      return acc;
    },
    {},
  );
  const footerGroupNames = Object.keys(footerGroups);

  const shareLabel = c(content, "share_button_label") || "Udostępnij 🚀";
  const shareUrl = c(content, "share_button_url") || "https://petlyai.pl";

  return (
    <main className="relative text-white overflow-hidden min-h-screen">
      {/* GALAXY BACKGROUND — 1:1 jak homepage */}
      <div className="fixed inset-0 -z-10">
        <img src={img(images, "bg", "bg.jpg")} alt="" className="w-full h-full object-cover" />
        <img src={img(images, "stars", "stars.png")} alt="" className="absolute inset-0 w-full h-full opacity-60" />
        <img src={img(images, "gradient_glow", "gradient-glow.png")} alt="" className="absolute inset-0 w-full h-full opacity-70" />
      </div>

      {/* HEADER — 1:1 jak homepage (logo + linki z CMS + przycisk "Pobierz aplikację") */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 relative z-30">
        <a href="/">
          <img src={img(images, "logo", "logo.png")} alt="PetlyAI" className="w-24 md:w-36 h-auto object-contain" />
        </a>
        <nav className="hidden md:flex gap-8 text-sm opacity-80">
          {navItems.map((n) => (
            <a key={n.id} href={n.href} className="hover:text-pink-400 transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={c(content, "header_cta_href") || "#"}
          className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full"
        >
          {c(content, "header_cta")}
        </a>
      </header>

      {/* HERO podstrony */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg opacity-80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </section>

      {/* CONTENT — treść z CMS (lub fallback) */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-10 md:mt-14 mb-20">
        <div className="p-6 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.3)]">
          {hasCmsContent ? (
            <article
              className="cms-article prose prose-invert max-w-none
                         prose-headings:bg-gradient-to-r prose-headings:from-pink-400 prose-headings:to-purple-400 prose-headings:bg-clip-text prose-headings:text-transparent
                         prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                         prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                         prose-p:opacity-90 prose-p:leading-relaxed
                         prose-a:text-pink-300 hover:prose-a:text-pink-200
                         prose-strong:text-white prose-li:opacity-90
                         prose-ul:my-4 prose-ol:my-4
                         prose-hr:border-white/10"
              dangerouslySetInnerHTML={{ __html: page!.content }}
            />
          ) : (
            <div className="text-center">
              <p className="opacity-80 text-base md:text-lg mb-6">
                {fallback.subtitle}
              </p>
              <ul className="grid md:grid-cols-3 gap-4 text-left">
                {fallback.points.map((p) => (
                  <li
                    key={p}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm opacity-90"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="/"
                className="inline-block mt-8 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full"
              >
                Wróć do strony głównej
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER — 1:1 jak homepage (z pieskiem, kotkiem, tłem footera, linkami z CMS) */}
      <footer className="mt-32 md:mt-40 pt-16 pb-8 px-4 relative text-white">
        {/* Tło footera (gwiazdy + łuk) — w osobnym kontenerze z overflow-hidden, żeby tło nie wystawało */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={img(images, "footer_bg", "footer_bg.jpg") || img(images, "footer_bg", "footer-bg.jpg")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Pies i kot — siedzą NA krawędzi footera (lekko nachodzą na footer) */}
        <div className="hidden md:block pointer-events-none">
          <img
            src={img(images, "dog_left", "dog-left.png")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 z-30 w-[200px] lg:w-[240px] xl:w-[280px] h-auto"
            style={{ bottom: "calc(100% - 90px)" }}
          />
          <img
            src={img(images, "cat", "cat.png")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 z-30 w-[170px] lg:w-[210px] xl:w-[250px] h-auto"
            style={{ bottom: "calc(100% - 80px)" }}
          />
        </div>
        <div className="md:hidden flex justify-between items-end -mt-20 mb-4 px-2 relative z-30">
          <img src={img(images, "dog_left", "dog-left.png")} alt="" className="w-[32%] max-w-[140px] h-auto" />
          <img src={img(images, "cat", "cat.png")} alt="" className="w-[28%] max-w-[120px] h-auto" />
        </div>

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
                      <a key={l.slug} href={l.slug} className="hover:text-pink-400">
                        {l.title}
                      </a>
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
                      return label ? (
                        <a key={i} href={href} className="hover:text-pink-400">
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
            <p className="font-semibold mb-2">{c(content, "footer_col3_title") || "Pobierz"}</p>
            <div className="flex items-center justify-between gap-3 md:block">
              <a
                href={c(content, "header_cta_href") || "#"}
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full"
              >
                {c(content, "hero_cta_primary")}
              </a>
              <div className="md:hidden">
                <ShareButton label={shareLabel} url={shareUrl} />
              </div>
            </div>
            <p className="text-xs opacity-60 mt-2">{c(content, "footer_download_text")}</p>
            <div className="hidden md:block mt-3">
              <ShareButton label={shareLabel} url={shareUrl} />
            </div>
          </div>
        </div>
        <div className="text-center text-xs opacity-60 mt-10">
          {c(content, "footer_copyright")}
        </div>
      </footer>

      {/* CMS POPUPS dla tej podstrony */}
      <PopupManager pageSlug={normalizePath(slug)} />
    </main>
  );
}
