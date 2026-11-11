import type { ReactNode } from 'react';
import { RouteHeadTags } from '../components/layout/RouteHeadTags';
import { SiteBody } from '../components/layout/SiteBody';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-NZ">
    <head>
      <RouteHeadTags />
      <script src="/enquiry-flow.js" defer />
      <script src="/site.js" defer />
      <script src="/team-ui-715.js" defer />
    </head>
    {/* Every route, including not-found, supplies the same native main slot. */}
    <SiteBody>{children}</SiteBody>
  </html>;
}
