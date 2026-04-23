export type CategoryKey =
  | 'education'
  | 'environment'
  | 'empowerment'
  | 'health'
  | 'children'
  | 'relief';

export type MediaType = 'image' | 'video';

export interface Activity {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  date: string; // YYYY-MM-DD
  category: CategoryKey;
  mediaType: MediaType;
  mediaUrl: string;
  mediaAlt: string;
  locationEn: string;
  locationAr: string;
  link: string;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORY_KEYS: CategoryKey[] = [
  'education',
  'environment',
  'empowerment',
  'health',
  'children',
  'relief',
];

export const CATEGORY_LABELS: Record<CategoryKey, { en: string; ar: string }> = {
  education: { en: 'Education', ar: 'التعليم' },
  environment: { en: 'Environment', ar: 'البيئة' },
  empowerment: { en: 'Empowerment', ar: 'التمكين' },
  health: { en: 'Health', ar: 'الصحة' },
  children: { en: 'Children', ar: 'الأطفال' },
  relief: { en: 'Relief', ar: 'الإغاثة' },
};

const STORAGE_KEY = 'altakathuf_activities_v1';
export const ACTIVITIES_CHANGE_EVENT = 'altakathuf:activities-changed';

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: 'seed-youth-education',
    titleEn: 'Second Periodic Meeting',
    titleAr: 'الاجتماع الدوري الثاني',
    descEn:
      "With God's grace and success, the Altakathuf Foundation for Community Development held its second periodic meeting on Monday, June 2, 2025, as part of its continuous institutional commitment towards achieving effective and sustainable community development. The meeting included a number of key topics, most notably:",
    descAr:
      'بحمد الله وتوفيقه، عقدت مؤسسة التكاثف للتنمية المجتمعية يوم الاثنين الموافق 2 يونيو 2025، اجتماعها الدوري الثاني، وذلك في إطار التزامها المؤسسي المتواصل نحو تحقيق تنمية مجتمعية فاعلة ومستدامة. وقد تضمن الاجتماع عددًا من المحاور الأساسية، أبرزها:',
    date: '2025-06-04',
    category: 'empowerment',
    mediaType: 'image',
    mediaUrl: '/images/BlogSection/Screenshot 2025-08-04 013217.png',
    mediaAlt: 'Students learning computer skills',
    locationEn: 'Community Center, Downtown',
    locationAr: 'المركز المجتمعي، وسط المدينة',
    link: 'https://www.facebook.com/share/p/1J68FwMfjY/',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'seed-community-cleanup',
    titleEn: 'Mosque Cleaning and Sanitization Campaign',
    titleAr: 'حملة تنظيف وتعقيم المساجد',
    descEn:
      'Volunteers joined us in a project to clean and sanitize mosques, restrooms, and ablution areas in the Umm al-Aranib locality.',
    descAr:
      'انضم إلينا متطوعون من جميع أنحاء المدينة في مشروع  تنظيف وتعقيم المساجد ودورات المياه والموضآت في محلة أم الأرانب',
    date: '2025-03-29',
    category: 'environment',
    mediaType: 'video',
    mediaUrl: '/images/BlogSection/photo_2025-07-31_17-22-17.jpg',
    mediaAlt: 'Community volunteers cleaning',
    locationEn: 'Central Park Area',
    locationAr: 'منطقة الحديقة العامة',
    link: 'https://www.facebook.com/profile.php?id=61574523478564',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'seed-women-empowerment',
    titleEn: 'Strength in Unity Iftar',
    titleAr: 'إفطار قوتنا في وحدتنا',
    descEn: "A Ramadan Iftar table under the slogan 'Our strength is in our unity' 🤝",
    descAr: 'مائدة إفطار رمضانية تحت شعار "قوتنا في وحدتنا" 🤝',
    date: '2025-03-22',
    category: 'relief',
    mediaType: 'image',
    mediaUrl: '/images/BlogSection/Screenshot 2025-08-03 232806.png',
    mediaAlt: 'Women entrepreneurs speaking',
    locationEn: 'Umm al Aranib',
    locationAr: 'أم الأرانب',
    link: 'https://www.facebook.com/share/p/1ZFeGsykjh/',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'seed-health-awareness',
    titleEn: 'Voter Card Awareness Campaign',
    titleAr: 'حملة التوعية ببطاقة الناخب',
    descEn:
      'Field awareness campaigns to urge citizens to receive their voter cards for the 2025 municipal elections',
    descAr: 'حملات توعية ميدانية لحث المواطنين على استلام بطاقة ناخب لانتخابات البلديات 2025',
    date: '2024-11-28',
    category: 'empowerment',
    mediaType: 'video',
    mediaUrl: '/images/BlogSection/Screenshot 2025-08-03 234116.png',
    mediaAlt: 'Health checkup camp',
    locationEn: 'Umm al Aranib',
    locationAr: 'أم الأرانب',
    link: 'https://www.facebook.com/share/p/15rAkfSz7H/',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'seed-children-art',
    titleEn: 'Electoral Process Dialogue Session',
    titleAr: 'جلسة حوارية لدعم الانتخابات',
    descEn: 'A dialogue session in the Majdoul neighborhood to support the electoral process',
    descAr: 'جلسة حوارية في محلة مجدول لدعم العملية الانتخابية',
    date: '2024-11-20',
    category: 'empowerment',
    mediaType: 'image',
    mediaUrl: '/images/BlogSection/Screenshot 2025-08-03 235320.png',
    mediaAlt: 'Children doing arts and crafts',
    locationEn: 'Al-Takathuf Center',
    locationAr: 'مركز التكاثف',
    link: 'https://www.facebook.com/profile.php?id=61574523478564',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    id: 'seed-food-distribution',
    titleEn: 'Food Distribution Drive',
    titleAr: 'حملة توزيع الطعام',
    descEn:
      'Monthly food distribution program serving 150+ families in need, providing essential groceries and fresh produce.',
    descAr:
      'في إطار جهودها الإنسانية، وبالتعاون مع جمعية الخير السودانية – أم الأرانب، قامت مؤسسة التكاثف للتنمية المجتمعية بتوزيع سلال رمضان الغذائية على 120 أسرة نازحة من السودان في بلدية الشرقية، بدعم كريم من فاعلي الخير.',
    date: '2025-03-25',
    category: 'relief',
    mediaType: 'video',
    mediaUrl: '/images/BlogSection/Screenshot 2025-08-03 231716.png',
    mediaAlt: 'Food distribution activity',
    locationEn: 'Various Neighborhoods',
    locationAr: 'أحياء متنوعة',
    link: 'https://www.facebook.com/share/p/1J5MJdagVs/',
    createdAt: 0,
    updatedAt: 0,
  },
];

function isActivity(x: unknown): x is Activity {
  if (!x || typeof x !== 'object') return false;
  const a = x as Record<string, unknown>;
  return (
    typeof a.id === 'string' &&
    typeof a.titleEn === 'string' &&
    typeof a.titleAr === 'string' &&
    typeof a.descEn === 'string' &&
    typeof a.descAr === 'string' &&
    typeof a.date === 'string' &&
    typeof a.category === 'string' &&
    (a.mediaType === 'image' || a.mediaType === 'video') &&
    typeof a.mediaUrl === 'string'
  );
}

export function loadActivities(): Activity[] {
  if (typeof window === 'undefined') return SEED_ACTIVITIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_ACTIVITIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return SEED_ACTIVITIES;
    return parsed.filter(isActivity);
  } catch {
    return SEED_ACTIVITIES;
  }
}

export function saveActivities(activities: Activity[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  // Notify listeners in the same tab (storage event only fires cross-tab).
  window.dispatchEvent(new CustomEvent(ACTIVITIES_CHANGE_EVENT));
}

export function clearActivitiesStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(ACTIVITIES_CHANGE_EVENT));
}

export function newActivity(): Omit<Activity, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    titleEn: '',
    titleAr: '',
    descEn: '',
    descAr: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'empowerment',
    mediaType: 'image',
    mediaUrl: '',
    mediaAlt: '',
    locationEn: '',
    locationAr: '',
    link: '',
  };
}
