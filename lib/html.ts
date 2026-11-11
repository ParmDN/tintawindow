export const escapeHtml = (value: unknown): string => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const normalizeLocalHrefs = (html: string): string => html.replace(/href="(\/[^"?#]*?)\/(?=["?#])/g, 'href="$1');
