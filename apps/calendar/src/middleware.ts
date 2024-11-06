import { updateSession } from "@mason/supabase/middleware";
import { createClient } from "@mason/supabase/server";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const response = await updateSession(request, I18nMiddleware(request));
  const supabase = await createClient();
  const nextURL = request.nextUrl;

  const pathnameWithoutLocale = nextURL.pathname.replace(/^\/[a-z]{2}/, "");

  const newURL = new URL(pathnameWithoutLocale || "/", request.url);

  // Fine to use session here because the user is already being checked in the updateSession function
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if User is not authenticated
  if (!session && newURL.pathname !== "/login") {
    const loginURL = new URL("/login", request.url);

    return NextResponse.redirect(loginURL);
  }

  // Maybe check for more user info here and possible redirect to a setup page

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
