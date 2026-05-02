"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const APP_STORE_URL = "#appstore"; // TODO: podmień na finalny link App Store
const GOOGLE_PLAY_URL = "#googleplay"; // TODO: podmień na finalny link Google Play

function detectPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "desktop";
}

export default function ConfirmEmailClient() {
  const searchParams = useSearchParams();
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
  const [showFallback, setShowFallback] = useState(false);

  const deepLink = useMemo(() => {
    const token = searchParams.get("token") || searchParams.get("code") || "";
    const base = "petlyai://confirm-email";
    return token ? `${base}?token=${encodeURIComponent(token)}` : base;
  }, [searchParams]);

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    if (p === "desktop") {
      setShowFallback(true);
      return;
    }

    const start = Date.now();
    let didHide = false;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") didHide = true;
    };
    document.addEventListener("visibilitychange", onVisibility);

    window.location.href = deepLink;

    const timer = window.setTimeout(() => {
      if (!didHide && Date.now() - start < 2500) {
        setShowFallback(true);
      }
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [deepLink]);

  const handleOpenApp = () => {
    window.location.href = deepLink;
    window.setTimeout(() => setShowFallback(true), 1500);
  };

  return (
    <div className="flex flex-col items-center text-center gap-8">
      <button
        onClick={handleOpenApp}
        className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base md:text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        Otwórz aplikację
      </button>

      <p className="text-sm opacity-70 max-w-md">
        Jeśli aplikacja jest zainstalowana, otworzy się automatycznie.
      </p>

      {showFallback && (
        <div className="mt-4 pt-8 border-t border-white/10 w-full max-w-md animate-fade-in">
          <p className="text-base md:text-lg font-medium mb-5">
            Nie masz aplikacji? Pobierz ją:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(platform === "ios" || platform === "desktop") && (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-white font-medium transition-all"
              >
                <span>🍎</span> App Store
              </a>
            )}
            {(platform === "android" || platform === "desktop") && (
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-white font-medium transition-all"
              >
                <span>▶</span> Google Play
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
