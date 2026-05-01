import { createClient } from "@supabase/supabase-js";

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const cms = createClient(URL_, ANON, { auth: { persistSession: false } });

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  is_published: boolean;
  updated_at: string;
  show_in_navbar?: boolean;
  show_in_footer?: boolean;
  nav_position?: number;
  footer_position?: number;
  footer_group?: string | null;
}

export interface CmsPopup {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  delay: number;
  show_once: boolean;
  page_slug: string | null;
  position: number;
}

export interface CmsTile {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
  position: number;
  icon?: string | null;
  gradient?: string | null;
  icon_color?: string | null;
}

export const getPage = async (slug: string): Promise<CmsPage | null> => {
  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  const { data } = await cms.from("site_pages").select("*").eq("slug", normalized).eq("is_published", true).maybeSingle();
  return (data as CmsPage) ?? null;
};

export const listPages = async (): Promise<Pick<CmsPage, "slug">[]> => {
  const { data } = await cms.from("site_pages").select("slug").eq("is_published", true);
  return (data as Pick<CmsPage, "slug">[]) ?? [];
};

export const getActivePopups = async (pageSlug?: string): Promise<CmsPopup[]> => {
  let q = cms.from("site_popups").select("*").eq("is_active", true).order("position");
  if (pageSlug) q = q.or(`page_slug.is.null,page_slug.eq.${pageSlug}`);
  const { data } = await q;
  return (data as CmsPopup[]) ?? [];
};

export const getTiles = async (): Promise<CmsTile[]> => {
  const { data } = await cms.from("site_tiles").select("*").eq("visible", true).order("position");
  return (data as CmsTile[]) ?? [];
};

export interface NavItem { slug: string; title: string; nav_position: number }
export interface FooterItem { slug: string; title: string; footer_group: string | null; footer_position: number }

export const getNavbar = async (): Promise<NavItem[]> => {
  const { data } = await cms.from("site_pages")
    .select("slug, title, nav_position")
    .eq("is_published", true)
    .eq("show_in_navbar", true)
    .order("nav_position", { ascending: true });
  return (data as NavItem[]) ?? [];
};

export const getFooter = async (): Promise<FooterItem[]> => {
  const { data } = await cms.from("site_pages")
    .select("slug, title, footer_group, footer_position")
    .eq("is_published", true)
    .eq("show_in_footer", true)
    .order("footer_position", { ascending: true });
  return (data as FooterItem[]) ?? [];
};

// ---------- Legacy helpers used by the rich landing page ----------

export interface SiteFeature {
  id: string;
  section: string;
  title: string;
  description: string;
  icon: string;
  icon_color: string;
  gradient: string;
  link: string | null;
  position: number;
  visible: boolean;
}

export interface SiteSection { key: string; visible: boolean; position: number }
export interface SiteImage { key: string; public_url: string | null }
export interface SiteNavItem { id: string; label: string; href: string; position: number; visible: boolean }

export const getContent = async (): Promise<Record<string, string>> => {
  const { data } = await cms.from("site_content").select("key,value");
  const map: Record<string, string> = {};
  (data ?? []).forEach((r: { key: string; value: string }) => { map[r.key] = r.value; });
  return map;
};

export const getImages = async (): Promise<Record<string, string>> => {
  const { data } = await cms.from("site_images").select("key,public_url");
  const map: Record<string, string> = {};
  (data ?? []).forEach((r: SiteImage) => { if (r.public_url) map[r.key] = r.public_url; });
  return map;
};

export const getFeatures = async (): Promise<SiteFeature[]> => {
  const { data } = await cms.from("site_features").select("*").order("position");
  return (data as SiteFeature[]) ?? [];
};

export const getSections = async (): Promise<SiteSection[]> => {
  const { data } = await cms.from("site_sections").select("key,visible,position");
  return (data as SiteSection[]) ?? [];
};

export const getLegacyNav = async (): Promise<SiteNavItem[]> => {
  const { data } = await cms.from("site_navigation").select("*").eq("visible", true).order("position");
  return (data as SiteNavItem[]) ?? [];
};

export const c = (map: Record<string, string>, key: string) => map[key] ?? "";
export const img = (map: Record<string, string>, key: string, fallback: string) =>
  map[key] ?? `/images/${fallback}`;
export const isSectionVisible = (sections: SiteSection[], key: string) => {
  const s = sections.find((x) => x.key === key);
  return s ? s.visible : true;
};

// ---------- Galeria ----------
export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  alt: string | null;
  position: number;
  visible: boolean;
}

export const getGallery = async (): Promise<GalleryItem[]> => {
  const { data } = await cms
    .from("site_gallery")
    .select("*")
    .eq("visible", true)
    .order("position", { ascending: true });
  return (data as GalleryItem[]) ?? [];
};
