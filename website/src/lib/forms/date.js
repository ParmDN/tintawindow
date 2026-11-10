export const SITE_TIMEZONE = 'Pacific/Auckland';

/** Return the site's calendar date independently of the server's timezone. */
export function getSubmittedDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: SITE_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const part = type => parts.find(value => value.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
