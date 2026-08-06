import { Book, categoryLabels, levelLabels, languageLabels } from '@/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface BookCardProps {
  book: Book;
  index?: number;
}

const levelColors: Record<string, string> = {
  beginner: 'bg-accent/10 text-accent border-accent/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const BookCard = ({ book, index = 0 }: BookCardProps) => {
  const { getLocalizedPath } = useLanguage();
  return (
    <Card 
      className="card-elevated overflow-hidden group animate-slide-up hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Cover Image */}
          <div className="sm:w-40 flex-shrink-0 bg-muted/30 p-4 flex items-center justify-center">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={`Couverture de ${book.title}`}
                className="w-24 sm:w-32 h-36 sm:h-48 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-24 sm:w-32 h-36 sm:h-48 bg-muted rounded-lg flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
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
                  Recommandé
                </Badge>
              )}
            </div>

            {/* Title & Author */}
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground font-medium mb-3">{book.author}</p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(book.rating!) 
                        ? 'text-warning fill-warning' 
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{book.rating}/5</span>
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
              {book.shortDescription}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <Button asChild variant="outline" className="flex-1 sm:flex-none">
                <Link to={getLocalizedPath(`/bibliotheque/${book.slug}`)}>
                  Voir les détails
                </Link>
              </Button>
              <Button asChild className="btn-gradient flex-1 sm:flex-none gap-2">
                <a href={book.affiliateLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Acheter le livre
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
