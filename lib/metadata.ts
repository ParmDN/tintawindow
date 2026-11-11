import type { PageDefinition, RouteHead } from '../content/types';
import { routes } from '../content/routes';
import { images } from '../content/images';
import { customerPolish } from '../content/customer-polish';
import { escapeHtml as esc } from './html';

export const origin = 'https://www.tintawindow.co.nz';
export const stylesheets = ['fonts.css', 'style.css', 'boutique.css', 'brand.css', 'surfaces.css', 'revision.css', 'fresh.css', 'polish.css', 'atelier.css', 'signature.css', 'film-guide.css', 'refinement.css', 'responsive-sections.css', 'client-polish.css', 'shoot-media-715.css', 'team-ui-715.css', 'story-717.css', 'service-layout-717.css', 'launch-polish-717.css', 'team-ui-718.css', 'photo-alignment-719.css', 'placement-polish-720.css'] as const;
export const classicScripts = ['/enquiry-flow.js', '/site.js', '/team-ui-715.js'] as const;
type Schema = Record<string, unknown>;
export interface HeadContent {
  title: string;
  description: string;
  fullDescription: string;
  socialTitle: string;
  canonical: string;
  image: string;
  schemas: Schema[];
  jsonLd: string;
}

export function routeForPath(pathname: string): RouteHead {
  // The reference also serves literal directory index files. Treat those aliases
  // as their document route if a host serves them without a canonical redirect.
  const documentPath = pathname === '/index.html' ? '/' : pathname.endsWith('/index.html') ? pathname.slice(0, -'/index.html'.length) : pathname;
  const clean = documentPath === '/' ? '/' : documentPath.replace(/\/$/, '');
  return routes.find(page => page.path === clean) ?? routes.find(page => page.type === 'missing')!;
}

export function getHead(page: PageDefinition): HeadContent {
  const baseline = routes.find(route => route.path === page.path);
  const canonical = baseline?.canonical ?? origin + page.path;
  const fullDescription = page.description || (page.type === 'locations'
    ? 'Explore Tint A Window service areas across the South Island. Find local project-planning advice and discuss assessment, travel and installation arrangements.'
    : page.type === 'review'
      ? 'Version 7 design review: completed audit changes, page and keyword ownership, project-story layout and remaining client evidence for Tint A Window.'
      : baseline?.description || 'Explore Tint A Window’s residential and commercial window film installations across the South Island.');
  const image = baseline?.socialImage ?? origin + '/assets/' + images[page.image || 'architecture'].file;
  const schemas: Schema[] = [{ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: fullDescription, url: canonical }];
  if (page.type === 'home') schemas.push({ '@context': 'https://schema.org', '@type': 'Organization', logo: origin + '/assets/logo-large.webp', name: 'Tint A Window', url: origin + '/', telephone: '0800 368 468', email: 'info@tintawindow.co.nz', areaServed: 'South Island, New Zealand' });
  if (page.path !== '/') {
    const parent = page.type === 'residential' ? ['Residential', '/residential-window-tinting-services'] : page.type === 'commercial' ? ['Commercial', '/commercial-window-tinting-services'] : page.type === 'location' ? ['Locations', '/locations'] : null;
    const items = [['Home', origin + '/'], ...(parent ? [[parent[0], origin + parent[1]]] : []), [page.label, canonical]];
    schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });
  }
  if (['residential', 'commercial'].includes(page.type)) schemas.push({ '@context': 'https://schema.org', '@type': 'Service', name: page.title.split(' | ')[0], serviceType: page.label + ' window film', provider: { '@type': 'Organization', name: 'Tint A Window' }, areaServed: { '@type': 'Place', name: 'Christchurch and selected South Island locations' }, url: canonical });
  const title = baseline?.documentTitle ?? customerPolish(page.title);
  return { title, socialTitle: page.title, description: fullDescription.slice(0, 180), fullDescription, canonical, image, schemas, jsonLd: JSON.stringify(schemas).replaceAll('<', String.fromCharCode(92) + 'u003c') };
}

/** Exact source-order head serialization for the ported document renderer.
 * Runtime app/layout imports the concatenated CSS once, so it does not also link
 * all 22 copied sheets. The logical stylesheet order is retained in legacy.css.
 */
export function renderHead(page: PageDefinition): string {
  const h = getHead(page);
  return `<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(page.title)}</title><meta name="description" content="${esc(h.description)}"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="${h.canonical}"><meta name="theme-color" content="#FFD43B"><meta property="og:title" content="${esc(h.socialTitle)}"><meta property="og:description" content="${esc(h.fullDescription)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Tint A Window"><meta property="og:locale" content="en_NZ"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(h.socialTitle)}"><meta name="twitter:description" content="${esc(h.fullDescription)}"><meta property="og:url" content="${h.canonical}"><meta property="og:image" content="${h.image}"><meta name="twitter:image" content="${h.image}"><link rel="icon" href="/assets/logo-large.webp" type="image/webp">${stylesheets.map(file => `<link rel="stylesheet" href="/${file}">`).join('')}<script type="application/ld+json">${h.jsonLd}</script>${classicScripts.map(src => `<script src="${src}" defer></script>`).join('')}</head>`;
}
