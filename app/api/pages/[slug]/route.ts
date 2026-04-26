import { NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    console.log("SLUG:", slug);

    const page = await getPage(slug);

    return NextResponse.json(page);

  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
