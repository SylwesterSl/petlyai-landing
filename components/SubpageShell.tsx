import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImages, img } from "@/lib/cms";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  card?: boolean;
};

export default async function SubpageShell({ title, subtitle, children, card = true }: Props) {
  const images = await getImages();
  const galaxyBg = img(images, "galaxy_bg");
  const stars = img(images, "stars_overlay");

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#0B0220]">
      {/* Tła */}
      {galaxyBg && (
        <div
          className="absolute inset-0 -z-20 bg-center bg-cover opacity-90"
          style={{ backgroundImage: `url(${galaxyBg})` }}
        />
      )}
      {stars && (
        <div
          className="absolute inset-0 -z-10 bg-repeat opacity-40 mix-blend-screen"
          style={{ backgroundImage: `url(${stars})` }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-900/20 to-[#0B0220]" />

      {/* Header z repo */}
      <Header />

      {/* Hero */}
      <section className="relative pt-12 md:pt-20 pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 md:mt-6 text-base md:text-xl text-white/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="relative px-4 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto">
          {card ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(168,85,247,0.4)] p-6 md:p-12">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </section>

      {/* Footer z repo */}
      <Footer />
    </main>
  );
}
