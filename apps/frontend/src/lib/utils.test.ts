import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, formatDate } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3')
    })

    it('should handle undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
    })

    it('should merge tailwind classes correctly', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    it('should handle array inputs', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2')
    })

    it('should handle object inputs', () => {
      expect(cn({ 'class1': true, 'class2': false })).toBe('class1')
    })

    it('should handle mixed inputs', () => {
      expect(cn('base', ['array1', 'array2'], { 'obj1': true, 'obj2': false }, 'end')).toBe('base array1 array2 obj1 end')
    })

    it('should handle single string input', () => {
      expect(cn('single')).toBe('single')
    })

    it('should handle complex tailwind merging', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
      expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('1,000원')
      expect(formatCurrency(1234567)).toBe('1,234,567원')
      expect(formatCurrency(0)).toBe('0원')
    })

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1000)).toBe('-1,000원')
    })

    it('should handle decimal numbers', () => {
      expect(formatCurrency(1000.5)).toBe('1,000.5원')
    })

    it('should handle very large numbers', () => {
      expect(formatCurrency(1000000000)).toBe('1,000,000,000원')
    })

    it('should handle very small numbers', () => {
      expect(formatCurrency(0.01)).toBe('0.01원')
    })

    it('should handle integer conversion', () => {
      expect(formatCurrency(1000.0)).toBe('1,000원')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(formatDate('2024-07-15')).toBe('2024년 7월 15일')
    })

    it('should handle string dates', () => {
      expect(formatDate('2024-07-15')).toBe('2024년 7월 15일')
    })

    it('should handle different months', () => {
      expect(formatDate('2024-01-01')).toBe('2024년 1월 1일')
      expect(formatDate('2024-12-31')).toBe('2024년 12월 31일')
    })

    it('should handle different date formats', () => {
      expect(formatDate('2024/07/15')).toBe('2024년 7월 15일')
      expect(formatDate('2024-07-15T10:30:00')).toBe('2024년 7월 15일')
    })

    it('should handle edge dates', () => {
      expect(formatDate('2024-02-29')).toBe('2024년 2월 29일') // leap year
      expect(formatDate('2023-02-28')).toBe('2023년 2월 28일') // non-leap year
    })

    it('should handle different years', () => {
      expect(formatDate('2020-01-01')).toBe('2020년 1월 1일')
      expect(formatDate('2030-12-31')).toBe('2030년 12월 31일')
    })
  })
}) 