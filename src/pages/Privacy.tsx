import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import SEO from '@/components/SEO';

// Placeholder copy. Replace each section with text reviewed by the
// foundation's legal counsel before going live.
const COPY = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated:',
    placeholder:
      'PLACEHOLDER — This page is a starting template. The foundation should review and replace this text before publishing.',
    sections: [
      {
        h: 'Information we collect',
        p: 'When you contact us through the website, we collect the name, email address, and message you submit. We do not currently sell or share this information with third parties.',
      },
      {
        h: 'Analytics',
        p: 'We use a privacy-friendly analytics service (Plausible) to understand how visitors use the site. It does not use cookies and does not collect personal data.',
      },
      {
        h: 'Cookies',
        p: 'The site stores non-essential preferences (language and theme) in your browser. No tracking cookies are set.',
      },
      {
        h: 'Contact',
        p: 'For privacy questions, write to altakatef1@gmail.com.',
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث:',
    placeholder:
      'نص مؤقت — هذه الصفحة قالب أولي. يجب على المؤسسة مراجعة هذا النص واستبداله قبل النشر.',
    sections: [
      {
        h: 'المعلومات التي نجمعها',
        p: 'عند التواصل معنا عبر الموقع، نجمع الاسم والبريد الإلكتروني والرسالة التي ترسلها. لا نبيع هذه المعلومات أو نشاركها مع أطراف ثالثة.',
      },
      {
        h: 'التحليلات',
        p: 'نستخدم خدمة تحليلات تحترم الخصوصية (Plausible) لفهم كيفية استخدام الزوار للموقع. لا تستخدم ملفات تعريف الارتباط ولا تجمع بيانات شخصية.',
      },
      {
        h: 'ملفات تعريف الارتباط',
        p: 'يخزّن الموقع تفضيلات غير أساسية (اللغة والمظهر) في متصفحك. لا توضع أي ملفات تتبع.',
      },
      {
        h: 'التواصل',
        p: 'لأي أسئلة تتعلق بالخصوصية، يُرجى مراسلتنا على altakatef1@gmail.com.',
      },
    ],
  },
} as const;

const Privacy = () => {
  const { language, t } = useApp();
  const c = COPY[language];

  return (
    <main className="min-h-[100dvh] bg-background">
      <SEO title={c.title} path="/privacy" />
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {t('notFoundBackHome')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          {c.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {c.updated} 2026-04-29
        </p>

        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground">
          {c.placeholder}
        </div>

        <div className="mt-8 space-y-8">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-semibold text-foreground">{s.h}</h2>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {s.p}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Privacy;
