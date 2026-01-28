import React from "react";

type Props = {
  json: unknown;
};

/**
 * Safe JSON-LD renderer for Next.js.
 * Use in App Router layouts/pages.
 */
export function SchemaJsonLd({ json }: Props) {
  if (!json) return null;
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
