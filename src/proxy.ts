import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { DESTINATION_SLUGS, UNMATCHED_PATH, PACKAGE_SLUGS, STATIC_PATHS } from "./content/slugs";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const KNOWN_PATHS = new Set<string>([
  ...STATIC_PATHS,
  ...DESTINATION_SLUGS.map((slug) => `/destinations/${slug}`),
  ...PACKAGE_SLUGS.map((slug) => `/packages/${slug}`),
]);

// Unknown URLs are rewritten to a path that matches no route, so Next serves the
// prerendered app/global-not-found.tsx with a real 404 status. (A notFound()
// thrown while rendering only produces a client-rendered error shell here.)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const locale = routing.locales.find((l) => l === firstSegment);
  const path = (locale ? pathname.slice(locale.length + 1) : pathname).replace(/\/+$/, "") || "/";

  if (!KNOWN_PATHS.has(path)) {
    const target = new URL(`/${locale ?? routing.defaultLocale}${UNMATCHED_PATH}`, request.url);
    return NextResponse.rewrite(target);
  }
  return handleI18nRouting(request);
}

export const config = {
  // Skip Next internals, files with an extension, generated icons and OG images.
  matcher: ["/((?!api|_next|_vercel|apple-icon|icon|.*opengraph-image|.*twitter-image|.*\\..*).*)"],
};
