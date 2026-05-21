import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'rectangle';
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rectangle',
  width = '100%',
  height = '20px',
  count = 1,
  className = '',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse';

  const variantClasses = {
    card: 'rounded-lg',
    text: 'rounded',
    circle: 'rounded-full',
    rectangle: 'rounded',
  };

  const skeletonClass = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={skeletonClass}
          style={{ width, height }}
        />
      ))}
    </>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card animate-pulse">
      <LoadingSkeleton variant="card" height="256px" className="mb-4" />
      <div className="space-y-3">
        <LoadingSkeleton variant="text" height="24px" width="80%" />
        <LoadingSkeleton variant="text" height="16px" width="100%" />
        <LoadingSkeleton variant="text" height="16px" width="90%" />
        <div className="flex items-center justify-between pt-4">
          <LoadingSkeleton variant="text" height="32px" width="100px" />
          <LoadingSkeleton variant="rectangle" height="40px" width="120px" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="card animate-pulse">
      <LoadingSkeleton variant="text" height="40px" width="40px" className="mb-4" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <LoadingSkeleton key={i} variant="text" height="20px" width="20px" />
        ))}
      </div>
      <LoadingSkeleton variant="text" height="16px" width="100%" className="mb-2" />
      <LoadingSkeleton variant="text" height="16px" width="100%" className="mb-2" />
      <LoadingSkeleton variant="text" height="16px" width="80%" className="mb-6" />
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <LoadingSkeleton variant="circle" height="48px" width="48px" />
        <div className="flex-1">
          <LoadingSkeleton variant="text" height="20px" width="120px" className="mb-2" />
          <LoadingSkeleton variant="text" height="16px" width="100px" />
        </div>
      </div>
    </div>
  );
};

// Made with Bob
