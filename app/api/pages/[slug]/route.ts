import { NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export async function GET(
  _req: Request,
  context: any
) {
  try {
    const slug = context.params.slug;

    console.log("SLUG:", slug);

    const page = await getPage(slug);

    console.log("PAGE:", page);

    return NextResponse.json(page);

  } catch (err: any) {
    console.error("ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
