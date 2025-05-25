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

export interface QueryParams {
  from?: string;
  to?: string;
  sortBy?: 'asc' | 'desc';
  name?: string;
} 