import NextLink from "next/link";
import { createNavigation } from "next-intl/navigation";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";
import { routing } from "./routing";

export const { getPathname } = createNavigation(routing);

// Locale-aware link for Server Components. The localized href is resolved on the
// server, which keeps next-intl's client runtime out of every page's JavaScript.
export async function Link({ href, ...props }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  const locale = await getLocale();
  return <NextLink href={getPathname({ locale, href })} {...props} />;
}
