import { site } from '../data/site.js';
import { areas } from '../data/areas.js';
import { services } from '../data/services.js';

const abs = (path) => new URL(path, site.url).href;
// "Clay Township and Algonac" is one page but two places.
const cities = (names) => names.flatMap((n) => n.split(' and ')).map((n) => ({ '@type': 'City', name: `${n}, MI` }));
export const BUSINESS_ID = abs('/#business');
export const WEBSITE_ID = abs('/#website');

// Fence contractors have no dedicated schema.org type; HomeAndConstructionBusiness is the closest
// LocalBusiness subtype. Address is city-level (service-area business) unless showStreet is enabled.
export function businessNode() {
  const { address: a } = site;
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: site.legalName,
    alternateName: site.name,
    url: abs('/'),
    telephone: site.phoneE164,
    email: site.email,
    logo: abs('/icon-512.png'),
    image: abs('/og-default.jpg'),
    description:
      'Family-owned fence company based in St. Clair Shores, Michigan. Wood, vinyl and aluminum fence installation, gates, fence repair, staining and power washing.',
    address: {
      '@type': 'PostalAddress',
      ...(a.showStreet ? { streetAddress: a.street } : {}),
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: cities(areas.map((ar) => ar.name)),
    openingHoursSpecification: site.hoursSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    paymentAccepted: site.paymentMethods.join(', '),
    sameAs: Object.values(site.profiles),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fence services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) },
      })),
    },
  };
}

export function websiteNode() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: abs('/'), name: site.name, publisher: { '@id': BUSINESS_ID } };
}

export function webPageNode({ path, title, description }) {
  return {
    '@type': 'WebPage',
    '@id': abs(path) + '#webpage',
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbNode(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href) })),
  };
}

export function serviceNode({ name, path, description, areaNames }) {
  return {
    '@type': 'Service',
    name,
    serviceType: name,
    url: abs(path),
    description,
    provider: { '@id': BUSINESS_ID },
    areaServed: cities(areaNames || areas.map((a) => a.name)),
  };
}

const stripTags = (html) => html.replace(/<[^>]+>/g, '');
export function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  };
}

export function blogPostingNode({ path, title, description, datePublished, dateModified, image, section, keywords, wordCount }) {
  return {
    '@type': 'BlogPosting',
    '@id': abs(path) + '#article',
    headline: title,
    description,
    url: abs(path),
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: section,
    keywords: keywords.join(', '),
    wordCount,
    inLanguage: 'en-US',
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    image: abs(image),
    mainEntityOfPage: { '@id': abs(path) + '#webpage' },
    isPartOf: { '@id': abs('/blog/') + '#webpage' },
  };
}
