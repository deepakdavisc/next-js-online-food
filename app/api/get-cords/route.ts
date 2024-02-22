import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log("fffffffffffffffffffffffffffff");
  const searchText = searchParams.get("q");
  return NextResponse.json({ test: searchText });
}
