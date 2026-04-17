"use client";
import { useEffect } from "react";
import { trackClick } from "../lib/tracker";
import { PawPrint, Camera, Heart, ThumbsUp, Trophy, Brain} from "lucide-react";
import Link from "next/link"
export default function Home() {
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";
  useEffect(() => {
    trackClick("landing_view");
  }, []);
  return (
    <main className="relative text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img src="/images/bg.jpg" alt="" className="w-full h-full object-cover" />
        <img src="/images/stars.png" alt="" className="absolute inset-0 w-full h-full opacity-60" />
        <img src="/images/gradient-glow.png" alt="" className="absolute inset-0 w-full h-full opacity-70" />
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6">
        <Link href="/">
          <div className="relative z-50 flex items-center gap-3 cursor-pointer group">
            <img
              src="/images/logo.png"
              alt="PetlyAI"
              className="w-24 md:w-36 h-auto object-contain transition group-hover:scale-110 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"            />
          </div>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm opacity-80">
          <a href="#">Funkcje</a>
          <a href="#">Jak działa</a>
          <a href="#">Galeria</a>
          <a href="#">Kontakt</a>
        </nav>

        <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full">
          Pobierz
        </button>
      </header>

      {/* HERO */}
      <section className="text-center mt-20 px-4 relative min-h-[550px] flex flex-col justify-start">

        {/* === ŁUK LEWY === */}
        <img
          src="/images/arc.png"
          alt=""
          className="pointer-events-none absolute left-[3%] bottom-[-31%] w-[700px] opacity-90 blur-sm z-0" 
/>

        {/* === ŁUK PRAWY (ODBITY) === */}
        <img
          src="/images/arc.png"
          alt=""
          className="pointer-events-none absolute right-[3.5%] bottom-[-29%] w-[650px] opacity-120 blur-sm z-0 scale-x-[-1]"
        />

        {/* === TELEFON LEFT === */}
        <img
          src="/images/phone-left.png"
          alt=""
          className="absolute left-[5%] top-[-14%] w-[320px] md:w-[580px] rotate-[-8deg] z-20"
        />

        {/* === TELEFON RIGHT === */}
        <img
          src="/images/phone-right.png"
          alt=""
          className="absolute right-[7%] top-[-12%] w-[320px] md:w-[560px] rotate-[4deg] z-20"
        />

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Twój Pupil<br />
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Twoja historia
          </span><br />
          Jedna aplikacja
        </h1>

        <p className="mt-4 opacity-70">
          Pierwsza aplikacja społecznościowa dla zwierząt
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full hover:scale-105 transition">
            Pobierz aplikację
          </button>
          <button className="border px-6 py-3 rounded-full hover:bg-white/10 transition">
            Dowiedz się więcej
          </button>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="mt-16 text-center px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Jak to działa?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* CARD 1 */}
          <div className="group relative p-[1.5px] rounded-2xl bg-gradient-to-r from-pink-500/40 via-purple-500/60 to-blue-500/70 transition duration-300 hover:scale-105">

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative z-10 overflow-hidden">
              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-400/10 blur-xl opacity-40 group-hover:opacity-70 transition duration-300"></div>

              {/* CONTENT */}
              <div className="relative z-10 text-center">
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute w-16 h-16 bg-pink-500/30 blur-2xl rounded-full"></div>
                  <PawPrint className="relative w-16 h-16 text-blue-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.9)]" />         
                  </div>
                <h3 className="font-semibold text-lg">Dodaj swojego pupila</h3>
                <p className="text-sm opacity-70 mt-2">
                  Utwórz profil swojego pupila i dziel się jego przygodami
                </p>
              </div>

            </div>
          </div>


          {/* CARD 2 */}
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition duration-300 hover:scale-105">

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative overflow-hidden">

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 blur-xl opacity-40 group-hover:opacity-70 transition duration-300"></div>

              {/* CONTENT */}
              <div className="relative z-10 text-center">

                <div className="relative mb-6 flex justify-center">
                  <div className="absolute w-16 h-16 bg-pink-500/30 blur-2xl rounded-full"></div>

                  <Brain className="relative w-16 h-16 text-orange-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                </div>

                <h3 className="font-semibold text-lg">
                  AI dla Twojego pupila
                </h3>

                <p className="text-sm opacity-70 mt-2">
                  Poznaj emocje, zachowanie i zdrowie swojego zwierzaka dzięki sztucznej inteligencji.
                </p>

              </div>

            </div>
          </div>


          {/* CARD 3 */}
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transition duration-300 hover:scale-105">

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl relative overflow-hidden">

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-xl opacity-40 group-hover:opacity-70 transition duration-300"></div>

              {/* CONTENT */}
              <div className="relative z-10 text-center">
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute w-16 h-16 bg-pink-500/30 blur-2xl rounded-full"></div>
                  <Heart className="relative w-16 h-16 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.9)]" />
                </div>

                <h3 className="font-semibold text-lg">Buduj społeczność</h3>
                <p className="text-sm opacity-70 mt-2">
                  Łącz się z innymi miłośnikami zwierząt
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* === CO OFERUJE === */}
      <section className="relative mt-20 text-center px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Co oferuje PetlyAI?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* 1 */}
          <Link href="/profile">
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 transition duration-300 cursor-pointer">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40 blur-xl group-hover:opacity-70 transition"></div>

              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4">

                <PawPrint className="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                <div className="text-left">
                  <h3 className="font-semibold">Profile zwierząt</h3>
                  <p className="text-sm opacity-70">
                    Twórz profile i historię pupila
                  </p>
                </div>

              </div>
            </div>
          </Link>

          {/* 2 */}
          <Link href="/media">
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:scale-105 transition duration-300 cursor-pointer">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-40 blur-xl group-hover:opacity-70 transition"></div>

              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4">

                <Camera className="w-12 h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                <div className="text-left">
                  <h3 className="font-semibold">Zdjęcia i chwile</h3>
                  <p className="text-sm opacity-70">
                    Dodawaj zdjęcia i filmy
                  </p>
                </div>

              </div>
            </div>
          </Link>
          {/* 3 */}
          <Link href="/social">
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 hover:scale-105 transition duration-300 cursor-pointer">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 opacity-40 blur-xl group-hover:opacity-70 transition"></div>

              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4">

                <ThumbsUp className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />

                <div className="text-left">
                  <h3 className="font-semibold">Lajki & komentarze</h3>
                  <p className="text-sm opacity-70">
                    Interakcja społeczności
                  </p>
                </div>

              </div>
            </div>
          </Link>

          {/* 4 */}
          <Link href="/ranking">
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-pink-600 via-indigo-500 to-blue-700 hover:scale-105 transition duration-300 cursor-pointer">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 via-indigo-500 to-blue-700 opacity-30 blur-xl group-hover:opacity-60 transition"></div>

              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <Trophy className="w-12 h-12 text-white-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                <div className="text-left">
                  <h3 className="font-semibold">Ranking</h3>
                  <p className="text-sm opacity-70">
                    Najpopularniejsze zwierzaki
                  </p>
                </div>

              </div>
            </div>
          </Link>
        </div>

</section>

          {/* CTA */}
      <section className="mt-0 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-10 pb-0">
            {/* LEWA */}
        <div className="max-w-xl relative left-[-20px] top-[-100px] text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Każdy zwierzak<br />ma swoją historię
              </h2>

              <p className="mt-5 text-lg opacity-80">
                Dołącz do jedynej społeczności zwierząt PetlyAI i dziel się wyjątkowymi chwilami swojego pupila z innymi miłośnikami zwierząt
              </p>

              <button className="mt-12 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full hover:scale-110 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition">
                Pobierz apkę PetlyAI
              </button>
            </div>

            {/* PRAWA */}
        <div className="relative z-10 w-[420px] md:w-[600px] left-[90px] top-[-20px] ">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 blur-3xl opacity-50"></div>

              <img
                src="/images/phones-group.png"
                alt=""
                className="relative z-10 w-[300px] md:w-[550px] scale-110 md:scale-125 hover:scale-130 transition"
              />
            </div>
        {/* ZWIERZAKI OVERLAY */}
        <img
          src="/images/dog-left.png"
          className="pointer-events-none absolute left-[-60px] bottom-[90px] w-[300px] md:w-[440px] z-20"
        />

        <img
          src="/images/cat.png"
          className="pointer-events-none absolute right-[-20px] bottom-[100px] w-[300px] md:w-[400px] z-20"
        />
            </section>

            {/* FOOTER */}
      <footer className="mt-[-180px] py-4 px-4 relative overflow-hidden text-white">

        {/* TŁO */}
        <img
          src="/images/footer-bg.jpg"
          alt=""
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-90 -z-10 scale-110"
        />

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">

          {/* 1. LOGO + OPIS */}
          <div className="flex flex-col items-start">
            <img
              src="/images/logo.png"
              alt="PetlyAI"
              className="w-28 md:w-36 h-auto object-contain mb-3"
            />

            <p className="text-sm opacity-70 max-w-xs">
              Pierwsza aplikacja społecznościowa dla zwierząt.
              Twoje zwierzę. Twoja historia.
            </p>
          
            <div className="mt-4 relative">

              {/* BUTTON */}
              <button
                onClick={() => {
                  const menu = document.getElementById("shareMenu");
                  menu?.classList.toggle("hidden");
                }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition duration-300"
              >
                Udostępnij 🚀
              </button>

              {/* MENU */}
              <div
                id="shareMenu"
                className="hidden absolute mt-3 bg-black/80 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 w-[240px] z-50"
              >

                {/* SYSTEM SHARE */}
                <button
                  onClick={() => {
                    trackClick("share_system");

                    if (navigator.share) {
                      navigator.share({
                        title: "PetlyAI",
                        text: "Sprawdź PetlyAI 🐾",
                        url: shareUrl,
                      });
                    } else {
                      alert("Udostępnianie dostępne na telefonie 📱");
                    }
                  }}
                  className="hover:text-pink-400 transition text-left"
                >
                  📲 Udostępnij (wszystkie aplikacje)
                </button>

                {/* WHATSAPP */}
                <button
                  onClick={() => {
                    trackClick("share_whatsapp");

                    window.open(
                      `https://wa.me/?text=Sprawdz%20PetlyAI%20🐾%20${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    );
                  }}
                  className="hover:text-green-400 transition text-left"
                >
                  🟢 WhatsApp
                </button>

                {/* SMS */}
                <button
                  onClick={() => {
                    trackClick("share_sms");

                    window.open(
                      `sms:?body=Sprawdz%20PetlyAI%20🐾%20${encodeURIComponent(shareUrl)}`
                    );
                  }}
                  className="hover:text-gray-400 transition text-left"
                >
                  📩 SMS
                </button>

                {/* EMAIL */}
                <button
                  onClick={() => {
                    trackClick("share_email");

                    window.open(
                      `mailto:?subject=PetlyAI&body=Sprawdz%20${encodeURIComponent(shareUrl)}`
                    );
                  }}
                  className="hover:text-yellow-400 transition text-left"
                >
                  ✉️ Email (Gmail, Outlook)
                </button>

                {/* FACEBOOK */}
                <button
                  onClick={() => {
                    trackClick("share_facebook");

                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    );
                  }}
                  className="hover:text-blue-400 transition text-left"
                >
                  🔵 Facebook / Messenger
                </button>

                {/* TWITTER */}
                <button
                  onClick={() => {
                    trackClick("share_twitter");

                    window.open(
                      `https://twitter.com/intent/tweet?text=Sprawdz%20PetlyAI%20🐾&url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    );
                  }}
                  className="hover:text-blue-300 transition text-left"
                >
                  🐦 Twitter / X
                </button>

                {/* TELEGRAM */}
                <button
                  onClick={() => {
                    trackClick("share_telegram");

                    window.open(
                      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=PetlyAI`,
                      "_blank"
                    );
                  }}
                  className="hover:text-cyan-400 transition text-left"
                >
                  📩 Telegram
                </button>

                {/* LINKEDIN */}
                <button
                  onClick={() => {
                    trackClick("share_linkedin");

                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    );
                  }}
                  className="hover:text-blue-500 transition text-left"
                >
                  💼 LinkedIn
                </button>

                {/* REDDIT */}
                <button
                  onClick={() => {
                    trackClick("share_reddit");

                    window.open(
                      `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=PetlyAI`,
                      "_blank"
                    );
                  }}
                  className="hover:text-orange-400 transition text-left"
                >
                  👽 Reddit
                </button>

                {/* COPY */}
                <button
                  onClick={() => {
                    trackClick("copy_link");

                    navigator.clipboard.writeText(shareUrl);
                    alert("Link skopiowany 🔥");
                  }}
                  className="hover:text-purple-400 transition text-left"
                >
                  🔗 Kopiuj link
                </button>

              </div>
            </div>
            </div>

          {/* 2. PRODUKT */}
          <div>
            <p className="font-semibold mb-2">Produkt</p>

            <div className="flex flex-col gap-2 text-sm opacity-70">
              <a href="#funkcje" className="hover:text-pink-400 transition cursor-pointer">Funkcje</a>
              <a href="#jak-dziala" className="hover:text-pink-400 transition cursor-pointer">Jak działa</a>
              <a href="#galeria" className="hover:text-pink-400 transition cursor-pointer">Galeria</a>
            </div>
          </div>

          {/* 3. FIRMA */}
          <div>
            <p className="font-semibold mb-2">Firma</p>

            <div className="flex flex-col gap-2 text-sm opacity-70">
              <a href="#kontakt" className="hover:text-pink-400 transition cursor-pointer">Kontakt</a>
              <a href="#regulamin" className="hover:text-pink-400 transition cursor-pointer">Regulamin</a>
              <a href="#polityka" className="hover:text-pink-400 transition cursor-pointer">Polityka prywatności</a>
            </div>
          </div>

          {/* 4. CTA */}
          <div>
            <p className="font-semibold mb-2">Pobierz</p>

            <button
              onClick={() => window.open("https://twoj-link.pl", "_blank")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full hover:scale-110 transition duration-300 shadow-lg"
            >
              Pobierz aplikację
            </button>

            <p className="text-xs opacity-60 mt-2">
              Dostępne na iOS i Android
            </p>
          </div>

        </div>
        {/* COPYRIGHT */}
        <div className="text-center text-xs opacity-60 mt-10 relative z-10">
          © 2026 PetlyAI. Wszystkie prawa zastrzeżone.
        </div>

      </footer>

    </main>
  );
}