import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md',
          {
            'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-blue-600/25': variant === 'primary',
            'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500': variant === 'secondary',
            'border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 focus:ring-blue-500': variant === 'outline',
            'hover:bg-gray-100 text-gray-700 focus:ring-gray-500': variant === 'ghost',
            'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-red-600/25': variant === 'danger',
          },
          {
            'px-3 py-2 text-sm gap-1.5': size === 'sm',
            'px-4 py-2.5 text-sm gap-2': size === 'md',
            'px-6 py-3 text-base gap-2': size === 'lg',
          },
          className
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };