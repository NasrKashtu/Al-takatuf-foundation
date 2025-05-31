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
    siteName: "ALTAKATHUF",
    // ... keep existing code (basic translations)
    welcome: "Welcome to Altakathif",
    description: "Altakathif is a personal organization dedicated to providing unique solutions for personal growth and development. We strive to empower individuals to reach their full potential and achieve their goals.",
    services: "Services",
    blog: "Our Activities & Impact",
    blogDescription: "See our foundation in action - from educational workshops to community outreach programs",
    home: "HOME",
    about: "ABOUT US",
    contact: "CONTACT",
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
    youthEducation: "Youth Education Workshop - Digital Skills Training",
    youthEducationDesc: "Our latest workshop helped 50+ young people develop essential computer and internet skills for better employment opportunities.",
    communityCleanup: "Community Clean-up Drive",
    communityCleanupDesc: "Volunteers from across the city joined us for a neighborhood beautification project, cleaning parks and planting trees.",
    womenEmpowerment: "Women's Empowerment Seminar",
    womenEmpowermentDesc: "Inspiring session with successful women entrepreneurs sharing their journey and mentoring local women to start their own businesses.",
    healthAwareness: "Health Awareness Campaign",
    healthAwarenessDesc: "Free health checkups and awareness sessions about preventive healthcare reached over 200 community members.",
    childrenArt: "Children's Art & Craft Workshop",
    childrenArtDesc: "Creative sessions for underprivileged children, providing art supplies and teaching various craft techniques to boost creativity.",
    foodDistribution: "Food Distribution Drive",
    foodDistributionDesc: "Monthly food distribution program serving 150+ families in need, providing essential groceries and fresh produce.",
    // Contact form
    contactUs: "Contact us",
    contactDesc: "Reach out to us today to start your journey towards personal growth and empowerment.",
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
    // New sections - FAQ, Testimonials, About, Footer
    aboutUs: "About Us",
    aboutUsTitle: "Empowering Communities Through Action",
    aboutUsDesc: "Altakathif is dedicated to creating positive change in communities through education, empowerment, and sustainable development programs.",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    missionText: "To empower individuals and communities through innovative programs that foster growth, education, and sustainable development.",
    visionText: "A world where every individual has the opportunity to reach their full potential and contribute meaningfully to society.",
    faq: "Frequently Asked Questions",
    faqDesc: "Find answers to common questions about our programs and services.",
    faqQ1: "What services do you offer?",
    faqA1: "We offer personalized coaching programs, goal setting workshops, and mindfulness retreats to help individuals achieve their personal goals.",
    faqQ2: "How can personalized coaching help me?",
    faqA2: "Our personalized coaching approach helps you identify your strengths, overcome obstacles, and develop strategies to achieve your specific goals.",
    faqQ3: "What sets Altakathif apart from other personal development organizations?",
    faqA3: "Our unique combination of traditional wisdom and modern techniques, along with our community-focused approach, makes us stand out in the field.",
    testimonials: "What People Say",
    testimonialsDesc: "Hear from those who have experienced our programs firsthand.",
    testimonialText: "Altakathif has truly transformed my life. Their personalized approach and innovative solutions have helped me overcome obstacles and achieve success like never before.",
    testimonialAuthor: "John Doe",
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
    footerAboutText: "Dedicated to empowering individuals and communities through innovative programs and sustainable development initiatives.",
    footerServices: "Our Services",
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
    slide3Desc: "Creating lasting positive change through sustainable development practices."
  },
  ar: {
    // Site name
    siteName: "التكاثف",
    // ... keep existing code (basic translations)
    welcome: "مرحباً بكم في التكاثف",
    description: "التكاثف هو منظمة شخصية مخصصة لتقديم حلول فريدة للنمو والتطوير الشخصي. نحن نسعى لتمكين الأفراد من الوصول إلى إمكاناتهم الكاملة وتحقيق أهدافهم.",
    services: "الخدمات",
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
    youthEducation: "ورشة تعليم الشباب - تدريب المهارات الرقمية",
    youthEducationDesc: "ساعدت ورشة العمل الأخيرة أكثر من 50 شاباً على تطوير مهارات الكمبيوتر والإنترنت الأساسية لفرص عمل أفضل.",
    communityCleanup: "حملة تنظيف المجتمع",
    communityCleanupDesc: "انضم إلينا متطوعون من جميع أنحاء المدينة في مشروع تجميل الأحياء وتنظيف الحدائق وزراعة الأشجار.",
    womenEmpowerment: "ندوة تمكين المرأة",
    womenEmpowermentDesc: "جلسة ملهمة مع رائدات أعمال ناجحات يشاركن رحلتهن ويوجهن النساء المحليات لبدء أعمالهن الخاصة.",
    healthAwareness: "حملة التوعية الصحية",
    healthAwarenessDesc: "فحوصات صحية مجانية وجلسات توعية حول الرعاية الصحية الوقائية وصلت إلى أكثر من 200 فرد من المجتمع.",
    childrenArt: "ورشة الفنون والحرف للأطفال",
    childrenArtDesc: "جلسات إبداعية للأطفال المحرومين، توفر مواد فنية وتعلم تقنيات حرفية متنوعة لتعزيز الإبداع.",
    foodDistribution: "حملة توزيع الطعام",
    foodDistributionDesc: "برنامج توزيع طعام شهري يخدم أكثر من 150 عائلة محتاجة، يوفر البقالة الأساسية والمنتجات الطازجة.",
    // Contact form
    contactUs: "اتصل بنا",
    contactDesc: "تواصل معنا اليوم لبدء رحلتك نحو النمو الشخصي والتمكين.",
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
    centralPark: "منطقة الحديقة المركزية",
    businessHub: "مركز الأعمال",
    mobileHealthUnit: "وحدة الصحة المتنقلة",
    altakathufCenter: "مركز التكاثف",
    variousNeighborhoods: "أحياء متنوعة",
    // New sections - FAQ, Testimonials, About, Footer
    aboutUs: "من نحن",
    aboutUsTitle: "تمكين المجتمعات من خلال العمل",
    aboutUsDesc: "التكاثف مكرس لإحداث تغيير إيجابي في المجتمعات من خلال برامج التعليم والتمكين والتنمية المستدامة.",
    ourMission: "مهمتنا",
    ourVision: "رؤيتنا",
    missionText: "تمكين الأفراد والمجتمعات من خلال برامج مبتكرة تعزز النمو والتعليم والتنمية المستدامة.",
    visionText: "عالم حيث كل فرد لديه الفرصة للوصول إلى إمكاناته الكاملة والمساهمة بشكل مفيد في المجتمع.",
    faq: "الأسئلة الشائعة",
    faqDesc: "العثور على إجابات للأسئلة الشائعة حول برامجنا وخدماتنا.",
    faqQ1: "ما الخدمات التي تقدمونها؟",
    faqA1: "نقدم برامج تدريب شخصية وورش وضع الأهداف وخلوات اليقظة الذهنية لمساعدة الأفراد على تحقيق أهدافهم الشخصية.",
    faqQ2: "كيف يمكن للتدريب الشخصي أن يساعدني؟",
    faqA2: "نهجنا في التدريب الشخصي يساعدك على تحديد نقاط قوتك والتغلب على العقبات ووضع استراتيجيات لتحقيق أهدافك المحددة.",
    faqQ3: "ما الذي يميز التكاثف عن منظمات التطوير الشخصي الأخرى؟",
    faqA3: "مزيجنا الفريد من الحكمة التقليدية والتقنيات الحديثة، إلى جانب نهجنا المركز على المجتمع، يجعلنا نبرز في هذا المجال.",
    testimonials: "ماذا يقول الناس",
    testimonialsDesc: "اسمع من أولئك الذين جربوا برامجنا بأنفسهم.",
    testimonialText: "لقد غيّر التكاثف حياتي حقاً. نهجهم الشخصي وحلولهم المبتكرة ساعدوني على التغلب على العقبات وتحقيق النجاح كما لم أحققه من قبل.",
    testimonialAuthor: "جون دو",
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
    footerAboutText: "مكرس لتمكين الأفراد والمجتمعات من خلال البرامج المبتكرة ومبادرات التنمية المستدامة.",
    footerServices: "خدماتنا",
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
    slide3Desc: "إحداث تغيير إيجابي دائم من خلال ممارسات التنمية المستدامة."
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
