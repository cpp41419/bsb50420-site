import type { MetadataRoute } from "next";
import { SITE } from "@/site";

export default function robots(): MetadataRoute.Robots {
    const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";
    if (isStaging) {
        return { rules: [{ userAgent: "*", disallow: "/" }] };
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://www.${SITE.domain}`;
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/*?*sort=",
                    "/*?*filter=",
                    "/*?*order=",
                    "/api/*",
                    "/_next/*",
                ],
            }
        ],
        sitemap: `${siteUrl}/sitemap.xml`
    };
}
