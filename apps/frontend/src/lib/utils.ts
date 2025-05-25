import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 통화 포맷팅 유틸리티
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원'
}

// 날짜 포맷팅 유틸리티
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
