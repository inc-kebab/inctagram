import { useEffect, useMemo, useState } from 'react'

import { LocaleType } from '@/../locales'
import { handleErrorResponse } from '@/shared/helpers'

import { useAutoRenewalMutation, useGetCurrentSubscriptionQuery } from '../../api/account-api'

export const useAccountTypeManagement = (t: LocaleType) => {
  const accountTypeOptions = useMemo(() => {
    return [
      { label: t.label.personal, value: 'Personal' },
      { label: t.label.business, value: 'Business' },
    ]
  }, [])

  const [type, setType] = useState<string>(accountTypeOptions[0].value)

  const { data: currentSubData, isLoading: isCurrentSubsLoad } = useGetCurrentSubscriptionQuery()

  const [changeAutoRenewal, { isLoading: isAutoRenewalLoad }] = useAutoRenewalMutation()

  const handleChangeAutoRenewal = (autoRenewal: boolean) => {
    const subscriptionId = currentSubData?.subscription?.subscriptionId

    if (subscriptionId) {
      changeAutoRenewal({ autoRenewal, subscriptionId }).then(data => {
        if ('error' in data) {
          handleErrorResponse(data.error)
        }
      })
    }
  }

  const handleChangeType = (value: string) => {
    setType(value)
  }

  useEffect(() => {
    if (currentSubData) {
      setType(accountTypeOptions[1].value)
    }
  }, [currentSubData, accountTypeOptions])

  return {
    accountTypeOptions,
    autoRenewal: {
      checked: currentSubData?.subscription?.autoRenewal,
      disabled: isAutoRenewalLoad,
      handleChange: handleChangeAutoRenewal,
    },
    currentSubData,
    handleChangeType,
    isCurrentSubsLoad,
    type,
  }
}
