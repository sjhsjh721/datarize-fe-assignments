import { useCustomerPurchases } from '@/api/queries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loading } from '@/components/ui/loading';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import type { Customer } from '@/types';

interface CustomerPurchaseModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerPurchaseModal({ customer, open, onOpenChange }: CustomerPurchaseModalProps) {
  const { data, isLoading, error } = useCustomerPurchases(customer?.id || null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{customer?.name}님의 구매 내역</DialogTitle>
          <DialogDescription>
            총 구매 횟수: {customer?.count}회 | 총 구매 금액: {customer ? formatCurrency(customer.totalAmount) : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {isLoading && <Loading className="h-32" />}

          {error && <ErrorState className="h-32" />}

          {data && data.length === 0 && (
            <EmptyState 
              message="구매 내역이 없습니다." 
              className="h-32"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
          )}

          {data && data.length > 0 && (
            <div className="space-y-4">
              {data.map((purchase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {purchase.imgSrc && (
                      <img
                        src={purchase.imgSrc}
                        alt={purchase.product}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{purchase.product}</h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(purchase.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">수량: {purchase.quantity}개</p>
                          <p className="font-medium">{formatCurrency(purchase.price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}