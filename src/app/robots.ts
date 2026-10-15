import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

// Vercel sets VERCEL_ENV and Netlify sets CONTEXT. Preview and branch deploys
// are blocked so they never compete with the live site in search results.
function isProductionDeploy() {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === "production";
  if (process.env.CONTEXT) return process.env.CONTEXT === "production";
  return true;
}

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeploy()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
