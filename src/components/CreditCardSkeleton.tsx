import { Skeleton } from '@/components/ui/skeleton';

export const CreditCardSkeleton = () => {
  return (
    <div className="card-elevated rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col lg:flex-row">
        {/* Card Visual Section */}
        <div className="lg:w-72 p-6 flex items-center justify-center bg-muted/30">
          <div className="relative w-52 h-32">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        </div>

        {/* Card Details Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-10" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-muted/20">
                <Skeleton className="h-4 w-20 mx-auto mb-2" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
