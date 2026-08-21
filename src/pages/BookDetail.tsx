import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { useBook } from '@/hooks/useBooks';
import { categoryLabels, levelLabels, languageLabels } from '@/types/book';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ExternalLink, ArrowLeft, BookOpen, User, Target, Quote, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const levelColors: Record<string, string> = {
  beginner: 'bg-accent/10 text-accent border-accent/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();
  const { data: book, isLoading, error } = useBook(slug || '');
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t('bookDetail.notFound')}</h1>
            <p className="text-muted-foreground mb-6">
              {t('bookDetail.notFoundDescription')}
            </p>
            <Button asChild>
              <Link to={getLocalizedPath('/bibliotheque')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('bookDetail.backToLibrary')}
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: t('nav.home'), url: 'https://finivo.ca' },
    { name: t('common.library'), url: 'https://finivo.ca/bibliotheque' },
    { name: book.title, url: `https://finivo.ca/bibliotheque/${book.slug}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${book.title} ${t('bookDetail.by')} ${book.author} | Finivo`}
        description={book.shortDescription}
        keywords={`${book.title}, ${book.author}, ${t('bookDetail.financeBook')}, ${book.themes.join(', ')}`}
        url={`https://finivo.ca/bibliotheque/${book.slug}`}
        structuredData={generateBreadcrumbStructuredData(breadcrumbs)}
      />
      <Header />

      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded transition-colors">{t('nav.home')}</Link>
            <span>/</span>
            <Link to={getLocalizedPath('/bibliotheque')} className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded transition-colors">{t('common.library')}</Link>
            <span>/</span>
            <span className="text-muted truncate max-w-[200px]">{book.title}</span>
          </nav>

          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 -ml-2">
            <Link to={getLocalizedPath('/bibliotheque')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('bookDetail.backToLibrary')}
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cover & CTA */}
            <div className="lg:col-span-1">
              <Card className="card-elevated sticky top-24">
                <CardContent className="p-6 text-center">
                  {/* Cover Image */}
                  <div className="mb-6">
                    {book.coverImageUrl && !imageError ? (
                      <img
                        src={book.coverImageUrl}
                        alt={`${t('bookDetail.coverOf')} ${book.title}`}
                        decoding="async"
                        onError={() => setImageError(true)}
                        className="w-48 h-72 object-cover rounded-xl shadow-lg mx-auto"
                      />
                    ) : (
                      <div className="w-48 h-72 bg-muted rounded-xl flex items-center justify-center mx-auto">
                        <BookOpen className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  {book.rating && (
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(book.rating!) 
                              ? 'text-warning fill-warning' 
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">{book.rating}/5</span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button asChild className="btn-gradient w-full gap-2 h-12 text-base mb-3">
                    <a href={book.affiliateLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5" />
                      {t('bookDetail.buyBook')}
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    {t('bookDetail.via')} {book.affiliatePlatform === 'amazon' ? 'Amazon' : book.affiliatePlatform}
                  </p>

                  {/* Affiliate Notice */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      {t('bookDetail.affiliateNotice')}{' '}
                      <Link to={getLocalizedPath('/divulgation-affiliation')} className="underline hover:no-underline">
                        {t('bookDetail.disclosure')}
                      </Link>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {categoryLabels[book.category]}
                  </Badge>
                  <Badge variant="outline" className={levelColors[book.level]}>
                    {levelLabels[book.level]}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    {languageLabels[book.language]}
                  </Badge>
                  {book.isFeatured && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      {t('bookDetail.recommended')}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">{book.author}</p>
              </div>

              {/* Description */}
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    {t('bookDetail.description')}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.fullDescription || book.shortDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Why Read This Book */}
              {book.whyReadThisBook && (
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      {t('bookDetail.whyRead')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.whyReadThisBook}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Reader Profile */}
              {book.readerProfile && (
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      {t('bookDetail.readerProfile')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.readerProfile}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Themes */}
              {book.themes.length > 0 && (
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">
                      {t('bookDetail.themes')}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {book.themes.map((theme) => (
                        <Badge key={theme} variant="outline" className="bg-muted/50">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quote */}
              {book.quote && (
                <Card className="card-elevated bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <blockquote className="text-lg italic text-foreground leading-relaxed">
                      "{book.quote}"
                    </blockquote>
                    <p className="text-muted-foreground mt-4">— {book.author}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
