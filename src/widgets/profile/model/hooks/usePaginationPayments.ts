import { useState } from 'react'

import { useGetMyPaymentsQuery } from '@/feature/payment'

export const usePaginationPayments = () => {
  const paginationOptions = [
    { name: '3', value: '3' },
    { name: '5', value: '5' },
    { name: '8', value: '8' },
  ]

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const { data, isFetching, isLoading } = useGetMyPaymentsQuery({
    pageNumber,
    pageSize,
  })

  const handleChangePageNumber = (page: number) => {
    setPageNumber(page)
  }

  const handleChangePageSize = (size: string) => {
    setPageSize(Number(size))
    setPageNumber(1)
  }

  return {
    handleChangePageNumber,
    handleChangePageSize,
    pageNumber,
    pageSize,
    paginationOptions,
    request: { data, isFetching, isLoading },
  }
}
