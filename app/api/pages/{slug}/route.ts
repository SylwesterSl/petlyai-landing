import { NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export const revalidate = 60;

export async function GET(
  _req: Request,
  context: any
) {
  try {
    const slug = context.params.slug;

    const page = await getPage(slug);

    if (!page) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
