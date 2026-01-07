import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  canonicalUrl?: string;
  structuredData?: object;
}

const BASE_URL = 'https://finivo.ca';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'Finivo';

export const SEO = ({
  title = 'Outils financiers gratuits pour les Québécois',
  description = 'Finivo est votre plateforme d\'outils financiers gratuits au Québec. Comparateur de cartes de crédit, calculateurs financiers (REER, CELIAPP, impôts, intérêts composés) et guides pratiques pour optimiser vos finances.',
  keywords = 'outils financiers, calculateur REER, calculateur CELIAPP, calculateur impôt, carte de crédit, comparateur, Québec, Canada, finances personnelles, intérêts composés, valeur nette',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  noindex = false,
  canonicalUrl,
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = canonicalUrl || url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_CA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Helper to generate credit card structured data
export const generateCreditCardStructuredData = (card: {
  name: string;
  issuer: string;
  description?: string;
  image?: string;
  rating: number;
  annualFee: number;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: card.name,
  description: card.description || `Carte de crédit ${card.name} par ${card.issuer}`,
  provider: {
    '@type': 'Organization',
    name: card.issuer,
  },
  image: card.image,
  url: `https://finivo.ca/carte/${card.slug}`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: card.rating,
    bestRating: 5,
    worstRating: 1,
    ratingCount: 1,
  },
  offers: {
    '@type': 'Offer',
    price: card.annualFee,
    priceCurrency: 'CAD',
  },
});

// Helper to generate organization structured data
export const generateOrganizationStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Finivo',
  url: 'https://finivo.ca',
  logo: 'https://finivo.ca/favicon.png',
  description: 'Plateforme d\'outils financiers gratuits au Québec: comparateur de cartes de crédit, calculateurs financiers et guides pratiques.',
  sameAs: [],
});

// Helper to generate FAQ structured data
export const generateFAQStructuredData = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Helper to generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
