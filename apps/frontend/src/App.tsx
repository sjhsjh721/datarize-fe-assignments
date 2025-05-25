import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PurchaseFrequencyChart } from '@/components/PurchaseFrequencyChart'
import { CustomerList } from '@/components/CustomerList'
import { CustomerPurchaseModal } from '@/components/CustomerPurchaseModal'
import type { Customer } from '@/types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // API 실패 시 1회만 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    },
  },
})

function Dashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleCloseModal = () => {
    setSelectedCustomer(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">쇼핑몰 구매 데이터 대시보드</h1>
        </div>

        <div className="space-y-8">
          <PurchaseFrequencyChart />
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </div>

        <CustomerPurchaseModal
          customer={selectedCustomer}
          open={!!selectedCustomer}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
