import { describe, it, expect } from 'vitest'
import type { 
  PriceRange, 
  Customer, 
  CustomerPurchase, 
  PurchaseFrequencyParams,
  CustomersParams 
} from './index'

describe('Types', () => {
  describe('PriceRange', () => {
    it('should have correct structure', () => {
      const priceRange: PriceRange = {
        range: '0-20000',
        count: 10
      }
      
      expect(priceRange.range).toBe('0-20000')
      expect(priceRange.count).toBe(10)
    })
  })

  describe('Customer', () => {
    it('should have correct structure', () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        count: 5,
        totalAmount: 150000
      }
      
      expect(customer.id).toBe(1)
      expect(customer.name).toBe('John Doe')
      expect(customer.count).toBe(5)
      expect(customer.totalAmount).toBe(150000)
    })
  })

  describe('CustomerPurchase', () => {
    it('should have correct structure', () => {
      const purchase: CustomerPurchase = {
        date: '2024-07-15',
        quantity: 2,
        product: 'Test Product',
        price: 25000,
        imgSrc: '/test-image.jpg'
      }
      
      expect(purchase.date).toBe('2024-07-15')
      expect(purchase.quantity).toBe(2)
      expect(purchase.product).toBe('Test Product')
      expect(purchase.price).toBe(25000)
      expect(purchase.imgSrc).toBe('/test-image.jpg')
    })
  })

  describe('PurchaseFrequencyParams', () => {
    it('should accept optional from and to parameters', () => {
      const params1: PurchaseFrequencyParams = {}
      const params2: PurchaseFrequencyParams = {
        from: '2024-07-01',
        to: '2024-07-31'
      }
      
      expect(params1).toEqual({})
      expect(params2.from).toBe('2024-07-01')
      expect(params2.to).toBe('2024-07-31')
    })
  })

  describe('CustomersParams', () => {
    it('should accept optional sortBy and name parameters', () => {
      const params1: CustomersParams = {}
      const params2: CustomersParams = {
        sortBy: 'desc',
        name: 'John'
      }
      
      expect(params1).toEqual({})
      expect(params2.sortBy).toBe('desc')
      expect(params2.name).toBe('John')
    })
  })
}) 