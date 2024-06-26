import { useEffect, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { ContentWrapper, useAccountTypeManagement, useListSubscription } from '@/feature/payment'
import { Paypal, Stripe } from '@/shared/assets/icons/other'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { Loader } from '@/shared/ui/Loader'
import { RadioGroup } from '@/shared/ui/RadioGroup'
import { Typography } from '@/shared/ui/Typography'
import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { t } = useTranslation()

  const { query } = useRouter()

  const [open, setOpen] = useState(false)

  const { accountTypeOptions, autoRenewal, currentSub, handleChangeType, type } =
    useAccountTypeManagement(t)

  const { handleChangeProductPriceId, handlePayment, isGetSubsLoad, productPriceId, subsOptions } =
    useListSubscription(t)

  const confirmDialogData = {
    false: {
      btn: t.button.backToPayment,
      content: t.label.transactionFailed,
      title: t.label.error,
    },
    true: {
      btn: t.button.ok,
      content: t.label.successPayment,
      title: t.label.success,
    },
  }

  const paymentStatus = query.success as string | undefined

  const isPaymentStatusExist = paymentStatus === 'true' || paymentStatus === 'false'
  const isBusinessAccount = type === 'Business'
  const isAutoRenewalLoading = autoRenewal.isLoading || currentSub.isFetching

  useEffect(() => {
    if (isPaymentStatusExist) {
      setOpen(true)
    }
  }, [isPaymentStatusExist])

  if (isGetSubsLoad || currentSub.isLoading) {
    return <Loader className={s.loader} containerHeight />
  }

  return (
    <div className={s.root}>
      {type === 'Business' && currentSub.data && (
        <>
          <ContentWrapper className={s.current} title={t.label.currentSubscription}>
            <div className={s.table}>
              <div className={s.column}>
                <Typography className={s.titleCell} variant="regular14">
                  {t.label.expireAt}
                </Typography>
                <Typography className={s.dataCell} variant="regular14">
                  {currentSub.data.expireAt}
                </Typography>
              </div>
              {currentSub.data.subscription?.autoRenewal && (
                <div className={s.column}>
                  <Typography className={s.titleCell} variant="regular14">
                    {t.label.nextPayment}
                  </Typography>
                  <Typography className={s.dataCell} variant="regular14">
                    {currentSub.data.nextPayment}
                  </Typography>
                </div>
              )}
            </div>
          </ContentWrapper>
          <Checkbox
            checked={autoRenewal.checked}
            className={s.item}
            disabled={isAutoRenewalLoading}
            label={t.label.autoRenewal}
            onCheckedChange={autoRenewal.handleChange}
          />
        </>
      )}
      <ContentWrapper className={s.item} title={t.label.accountType}>
        <RadioGroup
          disabled={isAutoRenewalLoading}
          onValueChange={handleChangeType}
          options={accountTypeOptions}
          value={type}
        />
      </ContentWrapper>
      {isBusinessAccount && subsOptions && (
        <>
          <ContentWrapper className={s.item} title={t.label.changeSubscription}>
            <RadioGroup
              disabled={isAutoRenewalLoading}
              onValueChange={handleChangeProductPriceId}
              options={subsOptions}
              value={productPriceId}
            />
          </ContentWrapper>
          <div className={s.payment}>
            <Button
              className={s.payBtn}
              disabled={isGetSubsLoad}
              onClick={handlePayment('Paypal')}
              startIcon={<Paypal />}
              variant="text"
            />
            <div className={s.between}>Or</div>
            <Button
              className={s.payBtn}
              disabled={isGetSubsLoad}
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
