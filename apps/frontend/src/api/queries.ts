import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';
import type { 
  PriceRange, 
  Customer, 
  CustomerPurchase, 
  PurchaseFrequencyParams,
  CustomersParams 
} from '@/types';

// Fetch purchase frequency data
export const usePurchaseFrequency = (params?: PurchaseFrequencyParams) => {
  return useQuery<PriceRange[]>({
    queryKey: ['purchaseFrequency', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/purchase-frequency', { params });
      return data;
    },
  });
};

// Fetch customers data
export const useCustomers = (params?: CustomersParams) => {
  return useQuery<Customer[]>({
    queryKey: ['customers', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/customers', { params });
      return data;
    },
  });
};

// Fetch customer purchases
export const useCustomerPurchases = (customerId: number | null) => {
  return useQuery<CustomerPurchase[]>({
    queryKey: ['customerPurchases', customerId],
    queryFn: async () => {
      if (!customerId) throw new Error('Customer ID is required');
      const { data } = await apiClient.get(`/customers/${customerId}/purchases`);
      return data;
    },
    enabled: !!customerId,
  });
}; 