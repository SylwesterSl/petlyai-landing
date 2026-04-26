import { NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug" },
        { status: 400 }
      );
    }

    const page = await getPage(slug);

    return NextResponse.json(page);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
