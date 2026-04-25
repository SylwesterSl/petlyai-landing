import Link from "next/link";
import { getFooter, type FooterItem } from "@/lib/cms";

export const revalidate = 60;

export default async function DynamicFooter() {
  const items = await getFooter();
  const groups = items.reduce<Record<string, FooterItem[]>>((acc, it) => {
    const key = it.footer_group || "Inne";
    (acc[key] ||= []).push(it);
    return acc;
  }, {});

  return (
    <footer className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {Object.entries(groups).map(([group, rows]) => (
        <div key={group}>
          <h4 className="mb-3 font-semibold">{group}</h4>
          <ul className="space-y-2">
            {rows.map((r) => (
              <li key={r.slug}>
                <Link href={r.slug} className="text-sm text-muted-foreground hover:text-foreground">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
