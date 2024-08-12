import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@mason/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { createClient } from "@mason/supabase/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const response = await updateSession(request, I18nMiddleware(request));
  const supabase = createClient();
  const nextURL = request.nextUrl;

  const pathnameWithoutLocale = nextURL.pathname.replace(/^\/[a-z]{2}/, "");

  const newURL = new URL(pathnameWithoutLocale || "/", request.url);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if User is not authenticated
  if (!session && newURL.pathname !== "/login") {
    const loginURL = new URL("/login", request.url);

    return NextResponse.redirect(loginURL);
  }

  if (session && newURL.pathname !== "/setup") {
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
