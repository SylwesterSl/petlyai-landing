import Link from "next/link";
import { getTiles } from "@/lib/cms";

const DynamicTiles = async () => {
  const tiles = await getTiles();
  if (tiles.length === 0) return null;
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tiles.map((t) => (
        <Link
          key={t.id}
          href={t.link}
          className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
        >
          {t.image_url && (
            <img src={t.image_url} alt={t.title} className="h-40 w-full object-cover transition group-hover:scale-105" />
          )}
          <div className="p-4">
            <h3 className="mb-1 text-lg font-semibold">{t.title}</h3>
            {t.description && <p className="text-sm opacity-80">{t.description}</p>}
          </div>
        </Link>
      ))}
    </section>
  );
};

export default DynamicTiles;
