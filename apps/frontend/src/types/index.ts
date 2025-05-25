export interface PriceRange {
  range: string;
  count: number;
}

export interface Customer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}

export interface CustomerPurchase {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}

// API별 쿼리 파라미터 타입 분리
export interface PurchaseFrequencyParams {
  from?: string;
  to?: string;
}

export interface CustomersParams {
  sortBy?: 'asc' | 'desc';
  name?: string;
}
