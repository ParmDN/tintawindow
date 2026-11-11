'use client';

import { quoteDialog } from '../../content/quote-form';
import { customerPolish } from '../../content/customer-polish';

export function QuoteDialog() {
  const markup: string = customerPolish(quoteDialog());
  const dialogEnd = markup.indexOf('</dialog>');
  const dialogInner = markup.slice(markup.indexOf('>') + 1, dialogEnd);
  const nav = markup.slice(dialogEnd + '</dialog>'.length);
  const navInner = nav.slice(nav.indexOf('>') + 1, nav.lastIndexOf('</nav>'));
  return <>
    <dialog className="quote-dialog" aria-labelledby="quote-dialog-title" dangerouslySetInnerHTML={{ __html: dialogInner }} />
    <nav className="mobile-enquiry-bar" aria-label="Quick enquiry" dangerouslySetInnerHTML={{ __html: navInner }} />
  </>;
}
