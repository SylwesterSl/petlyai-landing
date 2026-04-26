import { NextResponse } from "next/server";
import { getTiles } from "@/lib/cms";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(await getTiles());
}
