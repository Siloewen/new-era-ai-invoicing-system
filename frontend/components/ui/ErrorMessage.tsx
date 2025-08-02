interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  title = 'Something went wrong', 
  message = 'Unable to load data. Please try again.',
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="text-red-800">
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}