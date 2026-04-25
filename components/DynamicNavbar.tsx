import Link from "next/link";
import { getNavbar } from "@/lib/cms";

export const revalidate = 60;

export default async function DynamicNavbar() {
  const items = await getNavbar();
  return (
    <nav className="flex items-center gap-6">
      {items.map((it) => (
        <Link key={it.slug} href={it.slug} className="text-sm text-foreground/80 hover:text-foreground">
          {it.title}
        </Link>
      ))}
    </nav>
  );
}
