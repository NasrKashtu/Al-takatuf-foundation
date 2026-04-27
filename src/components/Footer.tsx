import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useApp();

  return (
    // Scoped `dark` — the footer is intentionally dark in both light and dark themes.
    // This makes semantic tokens resolve to dark-theme values inside the footer.
    <footer className="dark bg-background text-foreground py-14 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div className="text-start">
            <h3 className="text-lg font-bold mb-4 text-primary">
              {t('footerAbout')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('footerAboutText')}
            </p>
          </div>

          {/* Programs */}
          <div className="text-start">
            <h3 className="text-lg font-bold mb-4 text-primary">
              {t('footerPrograms')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#programs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footerCoaching')}
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footerWorkshops')}
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footerCommunity')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-start">
            <h3 className="text-lg font-bold mb-4 text-primary">
              {t('footerContactInfo')}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>بلدية الشرقية/أم الأرانب</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+218 92-0252670</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary shrink-0" />
                <span>altakatef1@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className="text-start">
            <h3 className="text-lg font-bold mb-4 text-primary">
              {t('followUs')}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574523478564"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/al-takathuf-foundation-for-community-development/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-start">
            <span className="text-muted-foreground text-sm">
              {t('copyright')}
            </span>
            <span className="text-primary font-bold text-base">
              {t('siteName')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
