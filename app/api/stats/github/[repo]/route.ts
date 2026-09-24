import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { repo: string } }
) {
  try {
    const repo = params.repo;
    const res = await fetch(`https://api.github.com/repos/SudiptoSatpati/${repo}`, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "SudiptoPortfolioApp",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ stars: 42 });
    }

    const data = await res.json();
    return NextResponse.json({ stars: data.stargazers_count || 42 });
  } catch {
    return NextResponse.json({ stars: 42 });
  }
}
