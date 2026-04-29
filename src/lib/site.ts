// Single source of truth for the production origin. Change here when the
// real domain is registered; canonical URLs, sitemap, and OG tags pick it up.
export const SITE_URL = 'https://altakathuf.org';

export const SITE_DEFAULTS = {
  nameEn: 'Altakathuf Foundation',
  nameAr: 'مؤسسة التكاثف للتنمية المجتمعية',
  descriptionEn:
    'A non-governmental, non-profit organization empowering individuals and communities through education, empowerment, and sustainable development.',
  descriptionAr:
    'منظمة غير حكومية وغير هادفة للربح ملتزمة بإحداث تغيير إيجابي من خلال برامج التعليم والتمكين والتنمية المستدامة.',
  // TODO: replace with a dedicated 1200x630 og-image.png when one is designed.
  ogImage: '/images/Slider/Slider Image.png',
} as const;

export const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
