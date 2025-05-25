import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  className?: string;
}

export function ErrorState({ message = "데이터를 불러오는데 실패했습니다.", className = "h-64" }: ErrorStateProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 text-red-600">
        <AlertCircle className="h-5 w-5" />
        <span>{message}</span>
      </div>
    </div>
  );
} 