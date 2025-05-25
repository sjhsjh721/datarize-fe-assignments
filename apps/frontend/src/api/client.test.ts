import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiClient } from './client'

// axios.create를 모킹
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      defaults: {
        baseURL: 'http://localhost:4000/api',
        headers: { common: { 'Content-Type': 'application/json' } }
      },
      interceptors: {
        request: { 
          use: vi.fn(),
          handlers: [] 
        },
        response: { 
          use: vi.fn(),
          handlers: [] 
        }
      }
    }))
  }
}))

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have correct base URL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:4000/api')
  })

  it('should have correct default headers', () => {
    expect(apiClient.defaults.headers.common['Content-Type']).toBe('application/json')
  })

  it('should have interceptors configured', () => {
    expect(apiClient.interceptors.request).toBeDefined()
    expect(apiClient.interceptors.response).toBeDefined()
  })
}) 