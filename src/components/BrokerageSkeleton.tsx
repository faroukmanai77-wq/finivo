import { Skeleton } from '@/components/ui/skeleton';

export const BrokerageSkeleton = () => {
  return (
    <div className="card-elevated rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col lg:flex-row">
        {/* Logo Section */}
        <div className="lg:w-72 p-6 flex items-center justify-center bg-muted/30">
          <div className="relative w-52 h-32">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-64 rounded-xl" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-5 rounded-2xl bg-muted/20">
                <Skeleton className="h-4 w-16 mx-auto mb-2" />
                <Skeleton className="h-5 w-12 mx-auto" />
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-border/50 gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
