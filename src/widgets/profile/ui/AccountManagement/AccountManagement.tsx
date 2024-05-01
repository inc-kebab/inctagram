import { useEffect, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { ContentWrapper, useAccountTypeManagement, useListSubscription } from '@/feature/payment'
import { Paypal, Stripe } from '@/shared/assets/icons/other'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { Loader } from '@/shared/ui/Loader'
import { RadioGroup } from '@/shared/ui/RadioGroup'
import { Typography } from '@/shared/ui/Typography'
import { add, format } from 'date-fns'
import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { t } = useTranslation()

  const { query } = useRouter()

  const [open, setOpen] = useState(false)

  const accountTypeOptions = [
    { label: t.label.personal, value: 'Personal' },
    { label: t.label.business, value: 'Business' },
  ]

  const { currentSubs, handleChangeType, isCurrentSubsLoad, type } =
    useAccountTypeManagement(accountTypeOptions)

  const { handleChangeProductPriceId, handlePayment, isGetSubsLoad, productPriceId, subsOptions } =
    useListSubscription()

  const getExpireDate = () => {
    const firstSub = currentSubs?.subscriptions
      .slice(1)
      .sort((a, b) => Date.parse(b.dateOfSubscribe) - Date.parse(a.dateOfSubscribe))[0]

    const expireDate = firstSub && add(firstSub.dateOfSubscribe, { days: currentSubs?.expireAt })

    return expireDate ? format(expireDate, 'dd.MM.yyyy') : ''
  }

  const confirmDialogData = {
    false: {
      btn: t.button.backToPayment,
      content: t.label.transactionFailed,
      title: t.label.error,
    },
    true: { btn: t.button.ok, content: t.label.successPayment, title: t.label.success },
  }

  const paymentStatus = query.success as string | undefined

  const isPaymentStatusExist = paymentStatus === 'true' || paymentStatus === 'false'

  useEffect(() => {
    if (isPaymentStatusExist) {
      setOpen(true)
    }
  }, [isPaymentStatusExist])

  if (isGetSubsLoad || isCurrentSubsLoad) {
    return <Loader className={s.loader} containerHeight />
  }

  return (
    <div className={s.root}>
      {type === 'Business' && currentSubs && (
        <ContentWrapper className={s.current} title={t.label.currentSubscription}>
          <div className={s.table}>
            <Typography className={s.titleCell} variant="regular14">
              {t.label.expireAt}
            </Typography>
            <Typography className={s.titleCell} variant="regular14">
              {t.label.nextPayment}
            </Typography>
            <Typography className={s.dataCell} variant="regular14">
              {getExpireDate()}
            </Typography>
            <Typography className={s.dataCell} variant="regular14">
              13.13.2023
            </Typography>
          </div>
        </ContentWrapper>
      )}
      <ContentWrapper className={s.item} title={t.label.accountType}>
        <RadioGroup onValueChange={handleChangeType} options={accountTypeOptions} value={type} />
      </ContentWrapper>
      {type === 'Business' && subsOptions && (
        <>
          <ContentWrapper className={s.item} title={t.label.changeSubscription}>
            <RadioGroup
              onValueChange={handleChangeProductPriceId}
              options={subsOptions}
              value={productPriceId}
            />
          </ContentWrapper>
          <div className={s.payment}>
            <Button
              className={s.payBtn}
              disabled={!productPriceId}
              onClick={handlePayment('Paypal')}
              startIcon={<Paypal />}
              variant="text"
            />
            <div className={s.between}>Or</div>
            <Button
              className={s.payBtn}
              disabled={!productPriceId}
              onClick={handlePayment('Stripe')}
              startIcon={<Stripe />}
              variant="text"
            />
          </div>
        </>
      )}
      {isPaymentStatusExist && (
        <ConfirmDialog
          className={s.dialog}
          content={confirmDialogData[paymentStatus].content}
          customActions={
            <DialogClose>
              <Button fullWidth>{confirmDialogData[paymentStatus].btn}</Button>
            </DialogClose>
          }
          onOpenChange={setOpen}
          open={open}
          title={confirmDialogData[paymentStatus].title}
        />
      )}
    </div>
  )
}
