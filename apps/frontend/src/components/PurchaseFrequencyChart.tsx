import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { ErrorState } from '@/components/ui/error-state';
import { usePurchaseFrequency } from '@/api/queries';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export function PurchaseFrequencyChart() {
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
  const [tempFrom, setTempFrom] = useState('');
  const [tempTo, setTempTo] = useState('');

  const { data, isLoading, error } = usePurchaseFrequency(dateRange);

  const handleDateFilter = () => {
    if (tempFrom && tempTo) {
      setDateRange({
        from: new Date(tempFrom).toISOString(),
        to: new Date(tempTo).toISOString(),
      });
    }
  };

  const handleReset = () => {
    setDateRange({});
    setTempFrom('');
    setTempTo('');
  };

  const formatXAxisTick = (value: string) => {
    // "0 - 20000" 형태의 문자열을 "0원 - 20,000원"으로 변환
    const [min, max] = value.split(' - ');
    const minFormatted = parseInt(min).toLocaleString('ko-KR');
    const maxFormatted = parseInt(max).toLocaleString('ko-KR');
    return `${minFormatted}원 - ${maxFormatted}원`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>가격대별 구매 빈도</CardTitle>
        <CardDescription>
          각 가격대의 제품이 얼마나 많이 구매되었는지 확인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={tempFrom}
              onChange={(e) => setTempFrom(e.target.value)}
              className="w-40"
              placeholder="시작일"
            />
            <span className="text-gray-500">~</span>
            <Input
              type="date"
              value={tempTo}
              onChange={(e) => setTempTo(e.target.value)}
              className="w-40"
              placeholder="종료일"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDateFilter} disabled={!tempFrom || !tempTo}>
              조회
            </Button>
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </div>

        {dateRange.from && dateRange.to && (
          <div className="mb-4 text-sm text-gray-600">
            {format(new Date(dateRange.from), 'yyyy년 MM월 dd일')} ~ {format(new Date(dateRange.to), 'yyyy년 MM월 dd일')} 데이터
          </div>
        )}

        {isLoading && <Loading />}

        {error && <ErrorState />}

        {data && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="range" 
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
                tickFormatter={formatXAxisTick}
              />
              <YAxis 
                label={{ value: '구매 수량', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}개`, '구매 수량']}
                labelFormatter={(label) => formatXAxisTick(label)}
              />
              <Bar dataKey="count" fill="#1f2937" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}