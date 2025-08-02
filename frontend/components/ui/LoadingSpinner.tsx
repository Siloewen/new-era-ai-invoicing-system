interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const baseClasses = 'animate-spin rounded-full border-2 border-blue-600 border-t-transparent';
  const sizeClass = sizeClasses[size];
  const additionalClasses = className || '';
  
  const finalClassName = [baseClasses, sizeClass, additionalClasses]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={finalClassName}
      aria-label="Loading"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}