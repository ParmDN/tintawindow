'use client';

import { memo } from 'react';

/** The layout's single native main, supplied immutable final HTML by the route.
 * site.js/team-ui-715.js own the descendants. There are no React children,
 * effects, event handlers, state updates or client-side content fetching here.
 * Keep the HTML prop unchanged for this document's lifetime (native navigation).
 */
export const MainRegion = memo(function MainRegion({ mainHtml }: { mainHtml: string }) {
  return <main id="main" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: mainHtml }} />;
});
