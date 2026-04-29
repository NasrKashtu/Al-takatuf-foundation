import { Helmet } from 'react-helmet-async';
import { useApp } from '@/contexts/AppContext';
import { SITE_DEFAULTS, absoluteUrl } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

export const SEO = ({
  title,
  description,
  path = '/',
  image = SITE_DEFAULTS.ogImage,
  noindex = false,
  type = 'website',
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
    </Helmet>
  );
};

export default SEO;
