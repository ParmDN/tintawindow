import { homes, businesses, locations, contact, residential, commercial, gallery } from '../content/navigation';
import { escapeHtml as esc, normalizeLocalHrefs } from './html';
import { customerPolish } from '../content/customer-polish';
import type { PageDefinition } from '../content/types';
const arrow: any = '';
const display: any = (s: string) => s === 'Wanaka' ? 'Wānaka' : s;
const navGroup: any=(name,url,list)=>`<div class="nav-group"><a href="${url}">${name}</a><button class="nav-toggle" aria-expanded="false" aria-label="Show ${name.toLowerCase()} menu" aria-controls="menu-${name}"><span></span></button><div class="nav-panel" id="menu-${name}" hidden><a class="overview" href="${url}">Explore ${name==='Locations'?'all locations':name+' window films'}</a>${list.map(p=>`<a href="${p.path}">${esc(p.label)}${arrow}</a>`).join('')}</div></div>`;
const header: any=p=>`<a class="skip" href="#main">Skip to content</a><header class="site-header"><a class="brand" href="/" aria-label="Tint A Window home"><img src="/assets/logo-large.webp" width="1157" height="409" alt="Tint A Window, advanced film solutions"></a><a class="mobile-quote" href="${p.index===26?'#start-enquiry':contact}">Get a Quote</a><button class="mobile-toggle" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span>Menu</span><i></i></button><nav id="site-nav" aria-label="Main navigation">${navGroup('Residential',residential,homes)}${navGroup('Commercial',commercial,businesses)}<a href="${gallery}">Projects</a><a href="/about/">Our story</a>${navGroup('Locations','/locations',locations)}<a class="nav-quote" href="${p.index===26?'#start-enquiry':contact}">Get a Quote ${arrow}</a></nav></header>`;
const crumbs: any=p=>`<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>${p.type==='residential'?`<a href="${residential}">Residential</a><span>/</span>`:p.type==='commercial'?`<a href="${commercial}">Commercial</a><span>/</span>`:p.type==='location'?'<a href="/locations/">Locations</a><span>/</span>':''}<span aria-current="page">${display(p.label)}</span></nav>`;

export const headerMarkup = (page: PageDefinition): string => customerPolish(normalizeLocalHrefs(header(page)));
export const breadcrumbMarkup = (page: PageDefinition): string => customerPolish(normalizeLocalHrefs(crumbs(page)));
