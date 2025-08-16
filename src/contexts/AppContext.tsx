import { link } from 'fs';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    // Site name
    siteName: "Altakathuf Foundation",
    // ... keep existing code (basic translations)
    welcome: "Welcome to Altakathif",
    description: "Altakathuf Foundation for Community Development is a non-governmental, non-profit organization dedicated to empowering individuals and communities.",
    programs: "Programs",
    blog: "Activities & Impact",
    blogDescription: "See our foundation in action - from educational workshops to community outreach programs",
    home: "Home",
    about: "About Us",
    contact: "Contact",
    readMore: "Read More",
    viewAllActivities: "View All Activities",
    moreInfo: "More info",
    // Services translations
    personalizedCoaching: "Personalized Coaching Programs",
    personalizedCoachingDesc: "Unlock your full potential with personalized coaching programs. Achieve success like never before.",
    goalSetting: "Goal Setting Workshops",
    goalSettingDesc: "Set and achieve your goals with our goal setting workshops. Transform your life today.",
    mindfulness: "Mindfulness Retreats",
    mindfulnessDesc: "Recharge and reconnect with our mindfulness retreats. Prioritize self-care and well-being.",
    // Blog/Activities translations
    youthEducation: "Second Periodic Meeting",
    youthEducationDesc: "With God's grace and success, the Altakathuf Foundation for Community Development held its second periodic meeting on Monday, June 2, 2025, as part of its continuous institutional commitment towards achieving effective and sustainable community development. The meeting included a number of key topics, most notably:",
    communityCleanup: "Mosque Cleaning and Sanitization Campaign",
    communityCleanupDesc: "Volunteers joined us in a project to clean and sanitize mosques, restrooms, and ablution areas in the Umm al-Aranib locality.",
    womenEmpowerment: "Strength in Unity Iftar",
    womenEmpowermentDesc: "A Ramadan Iftar table under the slogan 'Our strength is in our unity' 🤝",
    healthAwareness: "Voter Card Awareness Campaign",
    healthAwarenessDesc: "Field awareness campaigns to urge citizens to receive their voter cards for the 2025 municipal elections",
    childrenArt: "Electoral Process Dialogue Session",
    childrenArtDesc: "A dialogue session in the Majdoul neighborhood to support the electoral process",
    foodDistribution: "Food Distribution Drive",
    foodDistributionDesc: "Monthly food distribution program serving 150+ families in need, providing essential groceries and fresh produce.",
    // Contact form
    contactUs: "Contact us",
    contactDesc: "We are here to help and answer any question you might have. We look forward to hearing from you. You can also reach us through our social media channels.",
    name: "Name",
    email: "Email address",
    message: "Message",
    submitForm: "Submit form",
    // Categories
    education: "Education",
    environment: "Environment",
    empowerment: "Empowerment",
    health: "Health",
    children: "Children",
    relief: "Relief",
    // Locations
    communityCenter: "Community Center, Downtown",
    centralPark: "Central Park Area",
    businessHub: "Business Hub",
    mobileHealthUnit: "Mobile Health Unit",
    altakathufCenter: "Al-Takathuf Center",
    variousNeighborhoods: "Various Neighborhoods",
    "Umm al Aranib": "Umm al Aranib",
    // New sections - FAQ, Testimonials, About, Footer
    aboutUs: "About Us",
    aboutUsTitle: "Empowering Communities Through Action",
    aboutUsDesc: "Altakathuf Foundation for Community Development is a non-governmental, non-profit organization committed to creating positive change through education, empowerment, and sustainable development programs.",
    ourMissionAndVision: "Mission & Vision",
    ourMission: "Our Mission",
    missionText: "To empower individuals and communities through innovative programs that foster growth, education, and sustainable development. We believe in creating lasting change by providing the tools and resources necessary for people to build better futures for themselves and their communities.",
    ourVision: "Our Vision",
    visionText: "A world where every individual has the opportunity to reach their full potential and contribute meaningfully to society. We envision a future where communities are resilient, equitable, and thriving, and where every person has the chance to live a life of dignity and purpose.",
    faq: "Frequently Asked Questions",
    faqDesc: "Find answers to common questions about our programs and services.",
    faqQ1: "What is the main mission of the Altakathuf Foundation?",
    faqA1: "Our main mission is to empower individuals and communities through innovative programs that foster growth, education, and sustainable development.",
    faqQ2: "How can I get involved with your organization?",
    faqA2: "You can get involved by volunteering for our programs, participating in our events, or making a donation. Please visit our contact page for more information.",
    faqQ3: "How are donations used?",
    faqA3: "Donations are used to fund our programs, provide resources to communities in need, and support our operational costs. We are committed to financial transparency.",
    getInTouch: "Get in Touch",
    ourLocation: "Our Location",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    // Footer content
    footerContactInfo: "Contact Information",
    footerPhone: "Phone: +1 (555) 123-4567",
    footerEmail: "Email: info@altakathuf.org",
    footerAddress: "Address: 123 Development Street, Community City, CC 12345",
    footerAbout: "About Altakathuf",
    footerAboutText: "A non-governmental, non-profit organization dedicated to empowering individuals and communities through innovative programs and sustainable development initiatives.",
    footerPrograms: "Our Programs",
    footerCoaching: "Personal Coaching",
    footerWorkshops: "Workshops",
    footerCommunity: "Community Programs",
    copyright: "© 2025 Altakathuf. All rights reserved.",
    // Slider content
    sliderTitle: "Our Impact in Action",
    sliderDesc: "Discover how we're making a difference in communities through our various programs and initiatives.",
    slide1Title: "Educational Excellence",
    slide1Desc: "Empowering youth through quality education and skill development programs.",
    slide2Title: "Community Development",
    slide2Desc: "Building stronger communities through collaborative projects and initiatives.",
    slide3Title: "Sustainable Growth",
    slide3Desc: "Creating lasting positive change through sustainable development practices.",
    // Programs Section
    program1Title: "Youth Education Programs",
    program1Desc: "We provide educational programs and workshops to empower the youth in our communities, fostering skill development and creating opportunities for a brighter future.",
    program2Title: "Community Cleanup Drives",
    program2Desc: "We organize community cleanup drives to promote environmental awareness and create a cleaner, healthier, and more beautiful living space for everyone.",
    program3Title: "Awareness Campaigns",
    program3Desc: "Field awareness campaigns to urge citizens to receive their voter cards for the 2025 municipal elections."
  },
  ar: {
    // Site name
    siteName: "مؤسسة التكاثف للتنمية المجتمعية",
    // ... keep existing code (basic translations)
    welcome: "مرحباً بكم في التكاثف",
    description: "مؤسسة التكاثف للتنمية المجتمعية هي منظمة غير حكومية وغير هادفة للربح مكرسة لتمكين الأفراد والمجتمعات.",
    programs: "برامجنا",
    blog: "أنشطتنا وتأثيرنا",
    blogDescription: "شاهد مؤسستنا في العمل - من ورش العمل التعليمية إلى برامج التواصل المجتمعي",
    home: "الرئيسية",
    about: "من نحن",
    contact: "اتصل بنا",
    readMore: "اقرأ المزيد",
    viewAllActivities: "عرض جميع الأنشطة",
    moreInfo: "معلومات أكثر",
    // Services translations
    personalizedCoaching: "برامج التدريب الشخصي",
    personalizedCoachingDesc: "اكتشف إمكاناتك الكاملة مع برامج التدريب الشخصي. حقق النجاح كما لم تحققه من قبل.",
    goalSetting: "ورش وضع الأهداف",
    goalSettingDesc: "ضع أهدافك وحققها مع ورش وضع الأهداف. غيّر حياتك اليوم.",
    mindfulness: "خلوات اليقظة الذهنية",
    mindfulnessDesc: "اشحن طاقتك وتواصل مع ذاتك مع خلوات اليقظة الذهنية. اعطِ الأولوية للعناية بالذات والرفاهية.",
    // Blog/Activities translations
    youthEducation: "الاجتماع الدوري الثاني",
    youthEducationDesc: "بحمد الله وتوفيقه، عقدت مؤسسة التكاثف للتنمية المجتمعية يوم الاثنين الموافق 2 يونيو 2025، اجتماعها الدوري الثاني، وذلك في إطار التزامها المؤسسي المتواصل نحو تحقيق تنمية مجتمعية فاعلة ومستدامة. وقد تضمن الاجتماع عددًا من المحاور الأساسية، أبرزها:",
    communityCleanup: "حملة تنظيف وتعقيم المساجد",
    communityCleanupDesc: "انضم إلينا متطوعون من جميع أنحاء المدينة في مشروع  تنظيف وتعقيم المساجد ودورات المياه والموضآت في محلة أم الأرانب",
    womenEmpowerment: "إفطار قوتنا في وحدتنا",
    womenEmpowermentDesc: "مائدة إفطار رمضانية تحت شعار \"قوتنا في وحدتنا\" 🤝",
    healthAwareness: "حملة التوعية ببطاقة الناخب",
    healthAwarenessDesc: "حملات توعية ميدانية لحث المواطنين على استلام بطاقة ناخب لانتخابات البلديات 2025",
    childrenArt: "جلسة حوارية لدعم الانتخابات",
    childrenArtDesc: "جلسة حوارية في محلة مجدول لدعم العملية الانتخابية",
    foodDistribution: "حملة توزيع الطعام",
    foodDistributionDesc: "في إطار جهودها الإنسانية، وبالتعاون مع جمعية الخير السودانية – أم الأرانب، قامت مؤسسة التكاثف للتنمية المجتمعية بتوزيع سلال رمضان الغذائية على 120 أسرة نازحة من السودان في بلدية الشرقية، بدعم كريم من فاعلي الخير.",
    // Contact form
    contactUs: "اتصل بنا",
    contactDesc: "نحن هنا للمساعدة والإجابة على أي سؤال قد يكون لديك. نتطلع إلى الاستماع منك. يمكنك أيضًا الوصول إلينا عبر قنوات التواصل الاجتماعي الخاصة بنا.",
    name: "الاسم",
    email: "عنوان البريد الإلكتروني",
    message: "الرسالة",
    submitForm: "إرسال النموذج",
    // Categories
    education: "التعليم",
    environment: "البيئة",
    empowerment: "التمكين",
    health: "الصحة",
    children: "الأطفال",
    relief: "الإغاثة",
    // Locations
    communityCenter: "المركز المجتمعي، وسط المدينة",
    "Umm al Aranib": "أم الأرانب",
    businessHub: "مركز الأعمال",
    mobileHealthUnit: "وحدة الصحة المتنقلة",
    altakathufCenter: "مركز التكاثف",
    variousNeighborhoods: "أحياء متنوعة",
    // New sections - FAQ, Testimonials, About, Footer
    aboutUs: "من نحن",
    aboutUsTitle: "تمكين المجتمعات من خلال العمل",
    aboutUsDesc: "مؤسسة التكاثف للتنمية المجتمعية هي منظمة غير حكومية وغير هادفة للربح ملتزمة بإحداث تغيير إيجابي من خلال برامج التعليم والتمكين والتنمية المستدامة.",
    ourMissionAndVision: "مهمتنا ورؤيتنا",
    ourMission: "مهمتنا",
    missionText: "تمكين الأفراد والمجتمعات من خلال برامج مبتكرة تعزز النمو والتعليم والتنمية المستدامة. نحن نؤمن بإحداث تغيير دائم من خلال توفير الأدوات والموارد اللازمة للناس لبناء مستقبل أفضل لأنفسهم ومجتمعاتهم.",
    ourVision: "رؤيتنا",
    visionText: "عالم يتمتع فيه كل فرد بفرصة الوصول إلى إمكاناته الكاملة والمساهمة بشكل هادف في المجتمع. نحن نتصور مستقبلاً تكون فيه المجتمعات مرنة ومنصفة ومزدهرة، وحيث تتاح لكل شخص فرصة العيش بكرامة وهدف.",
    faq: "الأسئلة الشائعة",
    faqDesc: "العثور على إجابات للأسئلة الشائعة حول برامجنا وخدماتنا.",
    faqQ1: "ما هي المهمة الرئيسية لمؤسسة التكاثف؟",
    faqA1: "مهمتنا الرئيسية هي تمكين الأفراد والمجتمعات من خلال برامج مبتكرة تعزز النمو والتعليم والتنمية المستدامة.",
    faqQ2: "كيف يمكنني المشاركة في منظمتكم؟",
    faqA2: "يمكنك المشاركة عن طريق التطوع في برامجنا، أو المشاركة في فعالياتنا، أو تقديم تبرع. يرجى زيارة صفحة الاتصال بنا للحصول على مزيد من المعلومات.",
    faqQ3: "كيف يتم استخدام التبرعات؟",
    faqA3: "تستخدم التبرعات لتمويل برامجنا، وتوفير الموارد للمجتمعات المحتاجة، ودعم تكاليفنا التشغيلية. نحن ملتزمون بالشفافية المالية.",
    getInTouch: "تواصل معنا",
    ourLocation: "موقعنا",
    followUs: "تابعنا",
    allRightsReserved: "جميع الحقوق محفوظة.",
    // Footer content
    footerContactInfo: "معلومات الاتصال",
    footerPhone: "الهاتف: +1 (555) 123-4567",
    footerEmail: "البريد الإلكتروني: info@altakathuf.org",
    footerAddress: "العنوان: 123 شارع التنمية، مدينة المجتمع، CC 12345",
    footerAbout: "حول التكاثف",
    footerAboutText: "منظمة غير حكومية وغير هادفة للربح مكرسة لتمكين الأفراد والمجتمعات من خلال البرامج المبتكرة ومبادرات التنمية المستدامة.",
    footerPrograms: "برامجنا",
    footerCoaching: "التدريب الشخصي",
    footerWorkshops: "ورش العمل",
    footerCommunity: "برامج المجتمع",
    copyright: "© 2025 التكاثف. جميع الحقوق محفوظة.",
    // Slider content
    sliderTitle: "تأثيرنا في العمل",
    sliderDesc: "اكتشف كيف نحدث فرقاً في المجتمعات من خلال برامجنا ومبادراتنا المختلفة.",
    slide1Title: "التميز التعليمي",
    slide1Desc: "تمكين الشباب من خلال برامج التعليم الجيد وتطوير المهارات.",
    slide2Title: "تنمية المجتمع",
    slide2Desc: "بناء مجتمعات أقوى من خلال المشاريع والمبادرات التعاونية.",
    slide3Title: "النمو المستدام",
    slide3Desc: "إحداث تغيير إيجابي دائم من خلال ممارسات التنمية المستدامة.",
    // Programs Section
    program1Title: "برامج تعليم الشباب",
    program1Desc: "نحن نقدم برامج تعليمية وورش عمل لتمكين الشباب في مجتمعاتنا، وتعزيز تنمية المهارات وخلق فرص لمستقبل أكثر إشراقًا.",
    program2Title: "حملات تنظيف المجتمع",
    program2Desc: "ننظم حملات تنظيف مجتمعية لتعزيز الوعي البيئي وخلق مساحة معيشية أنظف وأكثر صحة وجمالًا للجميع.",
    program3Title: "حملات توعوية",
    program3Desc: "حملات توعية ميدانية لحث المواطنين على استلام بطاقة ناخب لانتخابات البلديات 2025"
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
