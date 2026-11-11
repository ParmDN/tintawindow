import { getPage } from '../../lib/pages';
import { MainRegion } from './MainRegion';

/** Server-only route adapter. It neither wraps nor re-polishes final mainHtml. */
export function PageMain({ path }: { path: string }) {
  const page = getPage(path);
  // All callers are fixed routes or members of a closed generateStaticParams list.
  // A missing registered document is a build error, not a silent blank fallback.
  if (!page) throw new Error(`Missing migrated document: ${path}`);
  return <MainRegion mainHtml={page.mainHtml} />;
}
