import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

// Next.js adds noindex automatically for 404 responses.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return { title: { absolute: t("seoTitle") } };
}

export default function NotFound() {
  return <NotFoundContent />;
}
