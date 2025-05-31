
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
    moreInfo: "More info"
  },
  ar: {
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
    moreInfo: "معلومات أكثر"
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
