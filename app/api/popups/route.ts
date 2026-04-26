import { NextResponse } from "next/server";
import { getActivePopups } from "@/lib/cms";

export const revalidate = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? undefined;
  return NextResponse.json(await getActivePopups(page));
}
