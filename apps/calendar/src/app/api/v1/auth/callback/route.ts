import { NextResponse } from "next/server";
import { createClient } from "@mason/supabase/server";

export async function GET(request: Request) {
  console.log("Hitting API");

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
