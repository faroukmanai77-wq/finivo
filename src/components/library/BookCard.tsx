import { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);
  const showCover = book.coverImageUrl && !imageError;

  return (
    <Card
      className="card-elevated overflow-hidden group h-full flex flex-col animate-slide-up hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${Math.min(index, 12) * 0.05}s` }}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Cover Image - fixed aspect ratio so mixed source resolutions never distort or shift layout */}
        <div className="relative w-full aspect-[2/3] bg-muted/30 overflow-hidden">
          {showCover ? (
            <img
              src={book.coverImageUrl}
              alt={`Couverture de ${book.title}`}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          {book.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-accent-foreground shadow-sm">
                <Star className="w-3 h-3 mr-1" />
                Recommandé
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Header with badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {categoryLabels[book.category]}
            </Badge>
            <Badge variant="outline" className={levelColors[book.level]}>
              {levelLabels[book.level]}
            </Badge>
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              {languageLabels[book.language]}
            </Badge>
          </div>

          {/* Title & Author */}
          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm font-medium mb-3">{book.author}</p>

          {/* Rating */}
          {book.rating && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(book.rating!)
                      ? 'text-warning fill-warning'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{book.rating}/5</span>
            </div>
          )}

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {book.shortDescription}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Button asChild variant="outline" className="flex-1">
              <Link to={getLocalizedPath(`/bibliotheque/${book.slug}`)}>
                Voir les détails
              </Link>
            </Button>
            <Button asChild className="btn-gradient flex-1 gap-2">
              <a href={book.affiliateLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Acheter
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
