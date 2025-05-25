import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { usePurchaseFrequency, useCustomers, useCustomerPurchases } from './queries'
import { apiClient } from './client'

// API client 모킹
vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('API Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('usePurchaseFrequency', () => {
    it('should fetch purchase frequency data', async () => {
      const mockData = [
        { range: '0-20000', count: 10 },
        { range: '20000-40000', count: 15 }
      ]
      
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockData })
      
      const { result } = renderHook(() => usePurchaseFrequency(), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })
      
      expect(result.current.data).toEqual(mockData)
      expect(apiClient.get).toHaveBeenCalledWith('/purchase-frequency', { params: undefined })
    })

    it('should pass parameters correctly', async () => {
      const params = { from: '2024-07-01', to: '2024-07-31' }
      vi.mocked(apiClient.get).mockResolvedValue({ data: [] })
      
      renderHook(() => usePurchaseFrequency(params), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalledWith('/purchase-frequency', { params })
      })
    })
  })

  describe('useCustomers', () => {
    it('should fetch customers data', async () => {
      const mockData = [
        { id: 1, name: 'John Doe', count: 5, totalAmount: 150000 }
      ]
      
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockData })
      
      const { result } = renderHook(() => useCustomers(), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })
      
      expect(result.current.data).toEqual(mockData)
      expect(apiClient.get).toHaveBeenCalledWith('/customers', { params: undefined })
    })

    it('should pass search parameters', async () => {
      const params = { sortBy: 'desc' as const, name: 'John' }
      vi.mocked(apiClient.get).mockResolvedValue({ data: [] })
      
      renderHook(() => useCustomers(params), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(apiClient.get).toHaveBeenCalledWith('/customers', { params })
      })
    })
  })

  describe('useCustomerPurchases', () => {
    it('should fetch customer purchases when ID is provided', async () => {
      const mockData = [
        { date: '2024-07-15', quantity: 2, product: 'Test Product', price: 25000, imgSrc: '/test.jpg' }
      ]
      
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockData })
      
      const { result } = renderHook(() => useCustomerPurchases(1), {
        wrapper: createWrapper()
      })
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })
      
      expect(result.current.data).toEqual(mockData)
      expect(apiClient.get).toHaveBeenCalledWith('/customers/1/purchases')
    })

    it('should not fetch when customer ID is null', () => {
      const { result } = renderHook(() => useCustomerPurchases(null), {
        wrapper: createWrapper()
      })
      
      expect(result.current.fetchStatus).toBe('idle')
      expect(apiClient.get).not.toHaveBeenCalled()
    })
  })
}) 