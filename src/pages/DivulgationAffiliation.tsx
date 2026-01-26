import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { DollarSign, Handshake, Target, Heart, BadgeCheck, HelpCircle, LucideIcon } from 'lucide-react';

const DivulgationAffiliation = () => {
  const { t } = useTranslation();

  const sectionIcons: Record<string, LucideIcon> = {
    business: Handshake,
    impact: Target,
    objectivity: BadgeCheck,
    compensation: DollarSign,
    unchanged: Heart,
    howToChoose: HelpCircle
  };

  const sectionKeys = ['business', 'impact', 'objectivity', 'compensation', 'unchanged', 'howToChoose'] as const;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={t('legal.affiliate.title')}
        description={t('legal.affiliate.subtitle')}
        path="/divulgation-affiliation"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
                <DollarSign className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t('legal.affiliate.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('legal.affiliate.subtitle')}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t('legal.affiliate.lastUpdated')}
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      {t('legal.affiliate.notice.title')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('legal.affiliate.notice.content')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-8 pb-16">
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
                          {t(`legal.affiliate.sections.${key}.title`)}
                        </h2>
                        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {t(`legal.affiliate.sections.${key}.content`)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t('legal.affiliate.contact.title')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.affiliate.contact.description')}
                </p>
                <p className="text-foreground font-medium">
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

export default DivulgationAffiliation;
