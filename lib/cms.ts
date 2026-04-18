import { supabase } from "./supabase";

export type SiteContent = Record<string, string>;
export type SiteImages = Record<string, string>;

export interface SiteNavItem {
  id: string; label: string; href: string; position: number; visible: boolean;
}
export interface SiteFeature {
  id: string; section: string; title: string; description: string;
  icon: string; gradient: string; icon_color: string;
  link: string | null; position: number; visible: boolean;
}
export interface SiteSection {
  id: string; key: string; label: string; visible: boolean; position: number;
}

export interface CmsData {
  content: SiteContent;
  images: SiteImages;
  navigation: SiteNavItem[];
  features: SiteFeature[];
  sections: SiteSection[];
}

export async function getCmsData(): Promise<CmsData> {
  const [contentRes, navRes, featRes, secRes, imgRes] = await Promise.all([
    supabase.from("site_content").select("*"),
    supabase.from("site_navigation").select("*").order("position"),
    supabase.from("site_features").select("*").order("position"),
    supabase.from("site_sections").select("*").order("position"),
    supabase.from("site_images").select("*"),
  ]);

  const content: SiteContent = {};
  contentRes.data?.forEach((r: any) => { content[r.key] = r.value; });

  const images: SiteImages = {};
  imgRes.data?.forEach((r: any) => { if (r.public_url) images[r.key] = r.public_url; });

  return {
    content,
    images,
    navigation: (navRes.data ?? []) as SiteNavItem[],
    features: (featRes.data ?? []) as SiteFeature[],
    sections: (secRes.data ?? []) as SiteSection[],
  };
}

// Helpers (identyczne jak w panelu admina)
export const c = (content: SiteContent, key: string) => content[key] ?? "";
export const img = (images: SiteImages, key: string, fallbackFilename: string) =>
  images[key] || `/images/${fallbackFilename}`;
export const isSectionVisible = (sections: SiteSection[], key: string) => {
  const s = sections.find((sec) => sec.key === key);
  return s ? s.visible : true;
};
