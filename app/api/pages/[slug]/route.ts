import { NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export const revalidate = 60;

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
