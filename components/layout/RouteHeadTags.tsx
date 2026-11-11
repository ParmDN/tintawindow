'use client';

import { usePathname } from 'next/navigation';
import { getHead, routeForPath } from '../../lib/metadata';

/** Pathname is read during prerender too, never filled in by an effect.
 * A shared server root layout cannot read descendant route params/pathnames.
 */
export function RouteHeadTags() {
  const page = routeForPath(usePathname() || '/');
  const h = getHead(page);
  return <>
    <title>{h.title}</title>
    <meta name="description" content={h.description} />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href={h.canonical} />
    <meta name="theme-color" content="#FFD43B" />
    <meta property="og:title" content={h.socialTitle} />
    <meta property="og:description" content={h.fullDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Tint A Window" />
    <meta property="og:locale" content="en_NZ" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={h.socialTitle} />
    <meta name="twitter:description" content={h.fullDescription} />
    <meta property="og:url" content={h.canonical} />
    <meta property="og:image" content={h.image} />
    <meta name="twitter:image" content={h.image} />
    <link rel="icon" href="/assets/logo-large.webp" type="image/webp" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: h.jsonLd }} />
  </>;
}
