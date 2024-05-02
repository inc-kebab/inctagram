import { useEffect, useMemo, useState } from 'react'

import { LocaleType } from '@/../locales'

import { useGetCurrentSubscriptionQuery } from '../../api/account-api'

export const useAccountTypeManagement = (t: LocaleType) => {
  const accountTypeOptions = useMemo(() => {
    return [
      { label: t.label.personal, value: 'Personal' },
      { label: t.label.business, value: 'Business' },
    ]
  }, [])

  const { data: currentSubData, isLoading: isCurrentSubsLoad } = useGetCurrentSubscriptionQuery()

  const [type, setType] = useState<string>(accountTypeOptions[0].value)

  const handleChangeType = (value: string) => {
    setType(value)
  }

  useEffect(() => {
    if (currentSubData) {
      setType(accountTypeOptions[1].value)
    }
  }, [currentSubData, accountTypeOptions])

  return { accountTypeOptions, currentSubData, handleChangeType, isCurrentSubsLoad, type }
}
