"use client";

import { useEffect, useMemo, useState } from "react";
import { Smartphone, Apple, Play, KeyRound, ShieldCheck } from "lucide-react";

/**
 * Klient-komponent dla /reset-password.
 *
 * Flow:
 *  1. Próbujemy otworzyć aplikację przez deep link: petlyai://reset-password
 *     (zachowujemy ewentualny token z query string, np. ?token=xyz → petlyai://reset-password?token=xyz)
 *  2. Jeśli po ~1.5 s strona nadal jest widoczna (document.visibilityState === "visible"),
 *     zakładamy, że aplikacja nie jest zainstalowana → pokazujemy fallback ze sklepami.
 *  3. Na desktopie deep link i tak nie zadziała — od razu pokazujemy sklepy + QR-podpowiedź.
 *
 * UWAGA: Linki do App Store / Google Play są placeholderami (#appstore / #googleplay) —
 * podmień je na produkcyjne URL-e PetlyAI, gdy będą dostępne.
 */

const APP_STORE_URL = "#appstore"; // TODO: wstaw pełny URL App Store
const GOOGLE_PLAY_URL = "#googleplay"; // TODO: wstaw pełny URL Google Play
const DEEP_LINK_BASE = "petlyai://reset-password";

type DeviceKind = "ios" | "android" | "desktop";

function detectDevice(): DeviceKind {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  return "desktop";
}

export default function ResetPasswordClient() {
  const [device, setDevice] = useState<DeviceKind>("desktop");
  const [showFallback, setShowFallback] = useState(false);
  const [attempted, setAttempted] = useState(false);

  // Zachowaj parametry z URL-a (np. token resetu) i przepnij je do deep linku
  const deepLink = useMemo(() => {
    if (typeof window === "undefined") return DEEP_LINK_BASE;
    const search = window.location.search || "";
    return search ? `${DEEP_LINK_BASE}${search}` : DEEP_LINK_BASE;
  }, []);

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const tryOpenApp = () => {
    setAttempted(true);

    if (device === "desktop") {
      // Na desktopie nie ma sensu udawać deep linku — od razu pokaż sklepy.
      setShowFallback(true);
      return;
    }

    const start = Date.now();
    let timeout: number | undefined;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // Aplikacja przejęła kontrolę — czyścimy timeout i nie pokazujemy fallbacku.
        if (timeout) window.clearTimeout(timeout);
        document.removeEventListener("visibilitychange", onVisibility);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Próbujemy otworzyć aplikację
    window.location.href = deepLink;

    // Jeśli po 1500 ms nadal jesteśmy widoczni → brak aplikacji.
    timeout = window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibility);
      const elapsed = Date.now() - start;
      if (document.visibilityState === "visible" && elapsed >= 1400) {
        setShowFallback(true);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Główna sekcja informacyjna */}
      <div className="flex flex-col items-center text-center gap-5">
        <span className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)]">
          <KeyRound className="w-8 h-8 text-white" />
        </span>

        <p className="text-base md:text-lg opacity-85 max-w-xl leading-relaxed">
          Logowanie i zmiana hasła w PetlyAI odbywa się{" "}
          <span className="font-semibold text-white">wyłącznie w aplikacji mobilnej</span>.
          Kliknij poniżej, aby otworzyć aplikację i dokończyć resetowanie hasła.
        </p>

        <button
          type="button"
          onClick={tryOpenApp}
          className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_30px_rgba(236,72,153,0.45)] hover:scale-[1.03] active:scale-[0.99] transition"
        >
          <Smartphone className="w-5 h-5" />
          <span>Otwórz aplikację</span>
        </button>

        <div className="flex items-center gap-2 text-xs opacity-60 mt-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Bezpieczna zmiana hasła odbywa się w aplikacji PetlyAI.</span>
        </div>
      </div>

      {/* Fallback — sklepy z aplikacjami */}
      {(showFallback || device === "desktop") && (
        <div className="mt-2 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Nie masz aplikacji? Pobierz ją poniżej
          </h2>
          <p className="text-sm opacity-75 mb-5">
            {device === "desktop"
              ? "Reset hasła jest dostępny wyłącznie w aplikacji mobilnej. Pobierz PetlyAI na swój telefon."
              : "Wygląda na to, że aplikacja nie jest jeszcze zainstalowana. Pobierz ją z oficjalnego sklepu:"}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {(device === "ios" || device === "desktop") && (
              <a
                href={APP_STORE_URL}
                className="flex-1 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white/10 border border-white/15 hover:border-pink-400/60 hover:bg-white/15 transition"
              >
                <Apple className="w-6 h-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[11px] opacity-70">Pobierz w</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>
            )}
            {(device === "android" || device === "desktop") && (
              <a
                href={GOOGLE_PLAY_URL}
                className="flex-1 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white/10 border border-white/15 hover:border-purple-400/60 hover:bg-white/15 transition"
              >
                <Play className="w-6 h-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[11px] opacity-70">Pobierz z</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
            )}
          </div>

          {attempted && device !== "desktop" && (
            <p className="text-xs opacity-60 mt-4">
              Aplikacja powinna otworzyć się automatycznie. Jeśli nic się nie wydarzyło — prawdopodobnie nie jest jeszcze zainstalowana.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
