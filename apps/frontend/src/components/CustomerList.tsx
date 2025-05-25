import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';
import { useCustomers } from '@/api/queries';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpDown, Search, Users } from 'lucide-react';
import type { Customer } from '@/types';

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerList({ onSelectCustomer }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | undefined>(undefined);
  const [searchName, setSearchName] = useState('');
  const [tempSearchName, setTempSearchName] = useState('');

  const { data, isLoading, error } = useCustomers({ sortBy, name: searchName || undefined });

  const handleSort = () => {
    // 정렬 순서: 없음 → 내림차순 → 오름차순 → 없음 (순환)
    if (!sortBy) {
      setSortBy('desc');
    } else if (sortBy === 'desc') {
      setSortBy('asc');
    } else {
      setSortBy(undefined);
    }
  };

  const handleSearch = () => {
    setSearchName(tempSearchName);
  };

  const handleReset = () => {
    setSearchName('');
    setTempSearchName('');
    setSortBy(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>고객 목록</CardTitle>
        <CardDescription>
          구매 금액이 많은 고객을 확인하고 상세 내역을 조회하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1 min-w-[300px]">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="고객 이름으로 검색"
              value={tempSearchName}
              onChange={(e) => setTempSearchName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>검색</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSort}>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {!sortBy ? '정렬' : sortBy === 'desc' ? '내림차순' : '오름차순'}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </div>

        {isLoading && <Loading />}

        {error && !error.message?.includes('404') && <ErrorState />}

        {/* 404 에러는 검색 결과 없음으로 처리 */}
        {(data && data.length === 0) || (error && error.message?.includes('404')) ? (
          <EmptyState 
            message="검색 결과가 없습니다." 
            icon={<Users className="h-5 w-5" />}
          />
        ) : null}

        {data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">이름</th>
                  <th className="text-right p-4">구매 횟수</th>
                  <th className="text-right p-4">총 구매 금액</th>
                </tr>
              </thead>
              <tbody>
                {data.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onSelectCustomer(customer)}
                  >
                    <td className="p-4">{customer.id}</td>
                    <td className="p-4">{customer.name}</td>
                    <td className="text-right p-4">{customer.count}회</td>
                    <td className="text-right p-4 font-medium">
                      {formatCurrency(customer.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 