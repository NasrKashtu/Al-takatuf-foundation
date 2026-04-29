import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import SEO from '@/components/SEO';

// Placeholder copy. Replace each section with text reviewed by the
// foundation's legal counsel before going live.
const COPY = {
  en: {
    title: 'Terms of Use',
    updated: 'Last updated:',
    placeholder:
      'PLACEHOLDER — This page is a starting template. The foundation should review and replace this text before publishing.',
    sections: [
      {
        h: 'Use of the site',
        p: 'You may browse and share links to public pages of this site for personal, non-commercial purposes. Content (text, images, logos) belongs to the Altakathuf Foundation unless otherwise indicated.',
      },
      {
        h: 'User submissions',
        p: 'When you submit a message via the contact form, you confirm that the information is accurate and that you have the right to share it.',
      },
      {
        h: 'Disclaimer',
        p: 'The site is provided "as is". We work to keep information accurate and up to date but make no warranties about completeness or fitness for any purpose.',
      },
      {
        h: 'Changes',
        p: 'We may update these terms occasionally. The "Last updated" date at the top reflects when the most recent change was made.',
      },
      {
        h: 'Contact',
        p: 'For questions about these terms, write to altakatef1@gmail.com.',
      },
    ],
  },
  ar: {
    title: 'شروط الاستخدام',
    updated: 'آخر تحديث:',
    placeholder:
      'نص مؤقت — هذه الصفحة قالب أولي. يجب على المؤسسة مراجعة هذا النص واستبداله قبل النشر.',
    sections: [
      {
        h: 'استخدام الموقع',
        p: 'يمكنك تصفح هذا الموقع ومشاركة روابط صفحاته العامة لأغراض شخصية غير تجارية. المحتوى (النصوص والصور والشعارات) ملك لمؤسسة التكاثف ما لم يُذكر خلاف ذلك.',
      },
      {
        h: 'مساهمات المستخدمين',
        p: 'عند إرسالك رسالة عبر نموذج التواصل، فإنك تؤكد أن المعلومات دقيقة وأن لديك الحق في مشاركتها.',
      },
      {
        h: 'إخلاء المسؤولية',
        p: 'يُقدَّم الموقع "كما هو". نسعى للحفاظ على دقة المعلومات وحداثتها لكن لا نقدّم أي ضمانات بشأن اكتمالها أو ملاءمتها لأي غرض.',
      },
      {
        h: 'التحديثات',
        p: 'قد نقوم بتحديث هذه الشروط من حين لآخر. يعكس تاريخ "آخر تحديث" أعلاه آخر تعديل تم.',
      },
      {
        h: 'التواصل',
        p: 'للاستفسار حول هذه الشروط، يُرجى مراسلتنا على altakatef1@gmail.com.',
      },
    ],
  },
} as const;

const Terms = () => {
  const { language, t } = useApp();
  const c = COPY[language];

  return (
    <main className="min-h-[100dvh] bg-background">
      <SEO title={c.title} path="/terms" />
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

export default Terms;
