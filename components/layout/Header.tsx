import type { PageDefinition } from '../../content/types';
import { headerMarkup } from '../../lib/layout-markup';

export function SkipLink() {
  return <a className="skip" href="#main">Skip to content</a>;
}

export function Header({ page }: { page: PageDefinition }) {
  const markup = headerMarkup(page);
  const inner = markup.slice(markup.indexOf('<header class="site-header">') + '<header class="site-header">'.length, markup.lastIndexOf('</header>'));
  return <header className="site-header" dangerouslySetInnerHTML={{ __html: inner }} />;
}
