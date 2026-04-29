import { Helmet } from 'react-helmet-async';
import { useApp } from '@/contexts/AppContext';
import { SITE_DEFAULTS, SITE_URL, absoluteUrl } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  /** Emit the Organization JSON-LD block. Set on the home page only. */
  organizationSchema?: boolean;
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: SITE_DEFAULTS.nameEn,
  alternateName: SITE_DEFAULTS.nameAr,
  url: SITE_URL,
  logo: absoluteUrl('/favicon.png'),
  description: SITE_DEFAULTS.descriptionEn,
  email: 'altakatef1@gmail.com',
  telephone: '+218-92-0252670',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Umm al-Aranib',
    addressRegion: 'Eastern Municipality',
    addressCountry: 'LY',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61574523478564',
    'https://www.linkedin.com/company/al-takathuf-foundation-for-community-development/',
  ],
};

export const SEO = ({
  title,
  description,
  path = '/',
  image = SITE_DEFAULTS.ogImage,
  noindex = false,
  type = 'website',
  organizationSchema = false,
}: SEOProps) => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const fullTitle = title
    ? `${title} · ${isAr ? SITE_DEFAULTS.nameAr : SITE_DEFAULTS.nameEn}`
    : isAr
      ? SITE_DEFAULTS.nameAr
      : SITE_DEFAULTS.nameEn;
  const desc = description ?? (isAr ? SITE_DEFAULTS.descriptionAr : SITE_DEFAULTS.descriptionEn);
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Helmet>
      <html lang={language} dir={isAr ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={isAr ? 'ar_LY' : 'en_US'} />
      <meta property="og:site_name" content={SITE_DEFAULTS.nameEn} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />

      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_SCHEMA)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
