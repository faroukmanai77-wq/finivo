import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Shield, Lock, Eye, UserCheck, Database, Bell, LucideIcon } from 'lucide-react';

const PolitiqueConfidentialite = () => {
  const { t } = useTranslation();

  const sectionIcons: Record<string, LucideIcon> = {
    collection: Eye,
    usage: Database,
    protection: Lock,
    rights: UserCheck,
    cookies: Bell
  };

  const sectionKeys = ['collection', 'usage', 'protection', 'rights', 'cookies'] as const;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={t('legal.privacy.title')}
        description={t('legal.privacy.subtitle')}
        path="/politique-confidentialite"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t('legal.privacy.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('legal.privacy.subtitle')}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t('legal.privacy.lastUpdated')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {sectionKeys.map((key, index) => {
                const Icon = sectionIcons[key];
                return (
                  <div 
                    key={key}
                    className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                          {t(`legal.privacy.sections.${key}.title`)}
                        </h2>
                        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {t(`legal.privacy.sections.${key}.content`)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t('legal.privacy.contact.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.contact.description')}
                </p>
                <p className="text-foreground font-medium">
                  {t('legal.privacy.contact.officer')}<br />
                  <a href="mailto:info@finivo.ca" className="text-primary hover:underline">
                    info@finivo.ca
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
