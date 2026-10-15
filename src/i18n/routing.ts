import { defineRouting } from "next-intl/routing";

// To launch Hindi: add "hi" here, then add src/messages/hi.json and src/content/hi/.
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
