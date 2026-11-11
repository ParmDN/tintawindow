import type { FinalPage, PageDefinition } from '../content/types';
import { routes } from '../content/routes';
import { pages } from '../content/site-data';
// Importing this local pure port applies media mapping once, before rendering.
import { renderBody, renderDocument } from './render-site';

export const pagePaths: readonly string[] = routes.map(page => page.path);
const cache = new Map<string, FinalPage>();

/** Accept '/', '/locations/wanaka', or ['locations', 'wanaka'].
 * Unknown paths return undefined; routing/HTTP 404 selection belongs to Phase 3.
 * No I/O, filesystem imports, source-generator imports or reports are involved.
 */
export function getPage(slug: string | readonly string[] = '/'): FinalPage | undefined {
  const input = typeof slug === 'string' ? slug : '/' + slug.join('/');
  const pathname = input === '/' || input === '' ? '/' : '/' + input.replace(/^\/+|\/+$/g, '');
  if (cache.has(pathname)) return cache.get(pathname);
  const route = routes.find(page => page.path === pathname);
  if (!route) return undefined;
  const source = pages.find((page: PageDefinition) => page.path === pathname);
  // Route head values were extracted from baseline HTML, preserving source drift.
  // Original source/keyword fields remain available to the ported selectors.
  const definition: PageDefinition = { ...source, ...route };
  const html: string = renderDocument(definition, renderBody(definition));
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/);
  if (!main) throw new Error(`Missing main content for ${pathname}`);
  const page: FinalPage = { definition, path: pathname, type: definition.type, bodyClass: `fresh page-${definition.type}`, mainHtml: main[1], html };
  cache.set(pathname, page);
  return page;
}
