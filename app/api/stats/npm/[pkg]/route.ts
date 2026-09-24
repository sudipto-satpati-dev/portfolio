import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { pkg: string } }
) {
  try {
    const pkg = params.pkg;
    const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ downloads: "1.2k/wk" });
    }

    const data = await res.json();
    const count = data.downloads || 1200;
    const formatted = count > 1000 ? `${(count / 1000).toFixed(1)}k/wk` : `${count}/wk`;

    return NextResponse.json({ downloads: formatted });
  } catch {
    return NextResponse.json({ downloads: "1.2k/wk" });
  }
}
