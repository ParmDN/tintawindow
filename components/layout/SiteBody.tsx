'use client';

import { memo, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { routeForPath } from '../../lib/metadata';
import { SkipLink, Header } from './Header';
import { Footer } from './Footer';
import { QuoteDialog } from '../forms/QuoteDialog';

// Native document navigation keeps these inputs fixed. Memoization also keeps
// unrelated framework renders from revisiting the imperative script-owned HTML.
const DocumentHeader = memo(Header);
const DocumentFooter = memo(Footer);
const DocumentQuoteDialog = memo(QuoteDialog);

export function SiteBody({ children }: { children: ReactNode }) {
  const page = routeForPath(usePathname() || '/');
  return <body className={`fresh page-${page.type}`}>
    <SkipLink />
    <DocumentHeader page={page} />
    {/* PageMain supplies this layout's one MainRegion, directly on main#main. */}
    {children}
    <DocumentFooter />
    <DocumentQuoteDialog />
  </body>;
}
