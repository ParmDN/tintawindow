import { atelierFooter } from '../../content/footer';
import { homes, businesses, locations, contact, gallery, faq, phone, email } from '../../content/navigation';
import { customerPolish } from '../../content/customer-polish';
import { escapeHtml as esc, normalizeLocalHrefs } from '../../lib/html';

export function Footer() {
  const display = (name: string) => name === 'Wanaka' ? 'Wānaka' : name;
  const markup: string = customerPolish(normalizeLocalHrefs(atelierFooter({ esc, homes, businesses, locations, contact, gallery, faq, phone, email, display })));
  const inner = markup.slice(markup.indexOf('>') + 1, markup.lastIndexOf('</footer>'));
  return <footer className="site-footer atelier-footer" dangerouslySetInnerHTML={{ __html: inner }} />;
}
