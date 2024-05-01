import { useEffect, useState } from 'react'

import { RadioOption } from '@/shared/ui/RadioGroup'

import { useGetCurrentSubscriptionQuery } from '../../api/account-api'

export const useAccountTypeManagement = (accountTypeOptions: RadioOption[]) => {
  const { data: currentSubs, isLoading: isCurrentSubsLoad } = useGetCurrentSubscriptionQuery()

  const [type, setType] = useState<string>(accountTypeOptions[0].value)

  const handleChangeType = (value: string) => {
    setType(value)
  }

  useEffect(() => {
    if (currentSubs) {
      setType(accountTypeOptions[1].value)
    }
  }, [currentSubs])

  return { currentSubs, handleChangeType, isCurrentSubsLoad, type }
}
