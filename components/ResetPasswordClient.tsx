"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const APP_STORE_URL = "#appstore"; // TODO: podmień na finalny link App Store
const GOOGLE_PLAY_URL = "#googleplay"; // TODO: podmień na finalny link Google Play

function detectPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";

  const userAgent = navigator.userAgent || "";

  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";

  return "desktop";
}

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();

  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">(
    "desktop"
  );
  const [showFallback, setShowFallback] = useState(false);

  const deepLink = useMemo(() => {
    const token = searchParams.get("token") || searchParams.get("code") || "";
    const base = "petlyai://reset-password";

    return token ? `${base}?token=${encodeURIComponent(token)}` : base;
  }, [searchParams]);

  useEffect(() => {
    const detectedPlatform = detectPlatform();

    setPlatform(detectedPlatform);

    if (detectedPlatform === "desktop") {
      setShowFallback(true);
      return;
    }

    const start = Date.now();
    let didHide = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        didHide = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.location.href = deepLink;

    const timer = window.setTimeout(() => {
      if (!didHide && Date.now() - start < 2500) {
        setShowFallback(true);
      }
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [deepLink]);

  const handleOpenApp = () => {
    window.location.href = deepLink;

    window.setTimeout(() => {
      setShowFallback(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <button
        type="button"
        onClick={handleOpenApp}
        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_-8px_rgba(168,85,247,0.6)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(168,85,247,0.8)] active:scale-[0.98] md:text-lg"
      >
        Otwórz aplikację
      </button>

      <p className="max-w-md text-sm opacity-70">
        Jeśli aplikacja jest zainstalowana, otworzy się automatycznie.
      </p>

      {showFallback && (
        <div className="mt-4 w-full max-w-md border-t border-white/10 pt-8">
          <p className="mb-5 text-base font-medium md:text-lg">
            Nie masz aplikacji? Pobierz ją:
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {(platform === "ios" || platform === "desktop") && (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:bg-white/15"
              >
                <span aria-hidden="true">🍎</span>
                App Store
              </a>
            )}

            {(platform === "android" || platform === "desktop") && (
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:bg-white/15"
              >
                <span aria-hidden="true">▶</span>
                Google Play
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
