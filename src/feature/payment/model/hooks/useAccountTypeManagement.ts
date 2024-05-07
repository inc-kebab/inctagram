import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

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

  const {
    data,
    isFetching: isCurrentSubFetch,
    isLoading: isCurrentSubLoad,
  } = useGetCurrentSubscriptionQuery()

  const [changeAutoRenewal, { isLoading: isAutoRenewalLoad }] = useAutoRenewalMutation()

  const handleChangeAutoRenewal = (autoRenewal: boolean) => {
    const subscriptionId = data?.subscription?.subscriptionId

    if (subscriptionId) {
      changeAutoRenewal({ autoRenewal, subscriptionId }).then(res => {
        if ('data' in res) {
          toast.success(t.label.successAutoRenewal)
        }
        if ('error' in res) {
          handleErrorResponse(res.error)
        }
      })
    }
  }

  const handleChangeType = (value: string) => {
    setType(value)
  }

  useEffect(() => {
    if (data) {
      setType(accountTypeOptions[1].value)
    }
  }, [data, accountTypeOptions])

  return {
    accountTypeOptions,
    autoRenewal: {
      checked: data?.subscription?.autoRenewal,
      handleChange: handleChangeAutoRenewal,
      isLoading: isAutoRenewalLoad,
    },
    currentSub: {
      data,
      isFetching: isCurrentSubFetch,
      isLoading: isCurrentSubLoad,
    },
    handleChangeType,
    type,
  }
}
