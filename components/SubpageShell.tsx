import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImages, img } from "@/lib/cms";

export const revalidate = 60;

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  card?: boolean;
}

export default async function SubpageShell({
  title,
  subtitle,
  children,
  card = true,
}: Props) {
  const images = await getImages();

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 -z-10">
        <img
          src={img(images, "bg", "bg.jpg")}
          alt=""
          className="h-full w-full object-cover"
        />

        <img
          src={img(images, "stars", "stars.png")}
          alt=""
          className="absolute inset-0 h-full w-full opacity-60"
        />

        <img
          src={img(images, "gradient_glow", "gradient-glow.png")}
          alt=""
          className="absolute inset-0 h-full w-full opacity-70"
        />
      </div>

      <Header />

      <section className="relative z-10 mx-auto mt-8 max-w-5xl px-4 text-center md:mt-16 md:px-6">
        <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] md:text-6xl">
          {title}
        </h1>

        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base opacity-80 md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </section>

      <section className="relative z-10 mx-auto mb-20 mt-10 max-w-5xl px-4 md:mt-14 md:px-6">
        {card ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.3)] backdrop-blur-xl md:p-10">
            {children}
          </div>
        ) : (
          children
        )}
      </section>

      <Footer />
    </main>
  );
}
