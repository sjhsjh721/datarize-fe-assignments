import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  className?: string;
}

export function Loading({ message = "데이터를 불러오는 중...", className = "h-64" }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 text-gray-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
} 