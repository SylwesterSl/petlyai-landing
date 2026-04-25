"use client";
import { useEffect, useState } from "react";
import { cms, type CmsPopup } from "@/lib/cms";

const STORAGE_KEY = "cms_popup_seen";

const wasSeen = (id: string): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as string[]).includes(id);
  } catch { return false; }
};

const markSeen = (id: string) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(id)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, id]));
  } catch { /* ignore */ }
};

interface Props { pageSlug?: string }

const PopupManager = ({ pageSlug }: Props) => {
  const [active, setActive] = useState<CmsPopup | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let q = cms.from("site_popups").select("*").eq("is_active", true).order("position");
      if (pageSlug) q = q.or(`page_slug.is.null,page_slug.eq.${pageSlug}`);
      const { data } = await q;
      if (cancelled || !data) return;
      const next = (data as CmsPopup[]).find((p) => !p.show_once || !wasSeen(p.id));
      if (!next) return;
      const t = setTimeout(() => setActive(next), Math.max(0, next.delay));
      return () => clearTimeout(t);
    })();
    return () => { cancelled = true; };
  }, [pageSlug]);

  if (!active) return null;

  const close = () => {
    if (active.show_once) markSeen(active.id);
    setActive(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={close}>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} aria-label="Zamknij" className="absolute right-3 top-3 text-slate-500 hover:text-slate-900">×</button>
        {active.image_url && <img src={active.image_url} alt="" className="mb-4 w-full rounded-xl object-cover" />}
        <h3 className="mb-2 text-xl font-semibold">{active.title}</h3>
        <div className="mb-4 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: active.content }} />
        {active.button_link && (
          <a href={active.button_link} className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" onClick={close}>
            {active.button_text || "OK"}
          </a>
        )}
      </div>
    </div>
  );
};

export default PopupManager;
