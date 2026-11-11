import { notFound } from 'next/navigation';
import { routes } from '@/content/routes';
import { PageMain } from '@/components/layout/PageMain';

export const dynamicParams = false;
const members = routes.filter(page => page.type === 'location');

export function generateStaticParams(): { slug: string }[] {
  return members.map(page => ({ slug: page.path.split('/').at(-1)! }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = `/locations/${slug}`;
  if (!members.some(page => page.path === path)) notFound();
  return <PageMain path={path} />;
}
