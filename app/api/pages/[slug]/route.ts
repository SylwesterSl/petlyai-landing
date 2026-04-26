import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: any
) {
  const slug = context.params.slug;

  return NextResponse.json({
    slug,
    test: "API działa"
  });
}
