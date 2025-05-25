import { Search } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  message = "데이터가 없습니다.", 
  className = "h-64",
  icon = <Search className="h-5 w-5" />
}: EmptyStateProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
} 