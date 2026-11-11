export type PageType = 'home' | 'hub' | 'residential' | 'commercial' | 'location' | 'about' | 'contact' | 'faq' | 'gallery' | 'locations' | 'review' | 'confirmation' | 'missing';
export interface TeamSection { eyebrow: string; heading: string; lines: string[] }
export interface TeamPage { suggestedPath: string | null; sections: TeamSection[] }
export interface SourceUnit { path: string; section: number; role: string; text: string }
export interface ImageVariant { file: string; width: number; height: number }
export interface ImageAsset extends ImageVariant { alt?: string; variants: ImageVariant[] }
export interface GalleryPhoto { file: string; title: string; type: string; alt?: string }
export interface CustomerEvidence { listing: string; reviews: { author: string; excerpt: string }[]; logos: { file: string; width: number; height: number; name: string }[] }
export interface SocialLink { url: string | null }
export interface ProofService { process_title: string; process: string[][]; reasons: string[][]; choice_heading: string; choice_lead: string }
export interface ProofLocation {
  title: string; intro: string[]; home_service: string; business_service: string;
  coordination_title: string; coordination: string[][]; process_title: string;
  process: string[][]; [key: string]: string | string[] | string[][];
}
export interface ProjectContext { photos: string[]; title: string; intro: string; captions: Record<string, string> }
export interface GuideCopy { eye?: string; title: string; paras: string[]; items?: string[][]; photo?: string; [key: string]: unknown }
export interface ProofData { services: Record<number, ProofService>; locations: Record<number, ProofLocation>; gallery_captions: Record<string, string>; project_context: Record<number, ProjectContext>; extras: Record<number, Record<number, Partial<GuideCopy>>> }
export interface PageDefinition {
  index?: number; path: string; label: string; type: PageType; title: string;
  headline?: string; image?: string; description?: string; source?: TeamPage;
  keywords?: string[]; originalKeywords?: string[]; searchRole?: string;
}
export interface RouteHead extends PageDefinition { documentTitle: string; canonical: string; socialImage: string }
export interface FinalPage {
  definition: PageDefinition;
  path: string;
  type: PageType;
  bodyClass: string;
  /** Final main content, surface-assigned and customer-polished. No main wrapper. */
  mainHtml: string;
  /** Complete source-compatible document for later HTML parity tooling. */
  html: string;
}
export interface NavigationItem { path: string; label: string }
// The original compositional renderers operate on heterogeneous section shapes.
// Explicit dynamic records are confined to the port; external/data APIs are typed.
export type RenderRecord = Record<string, any>;
