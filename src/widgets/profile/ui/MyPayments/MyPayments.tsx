import { GetMyPaymentsResponse } from '@/feature/profile/model/types/profile.types'
import { useTranslation } from '@/shared/hooks'
import { Pagination } from '@/shared/ui/Pagination'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { MobileMyPayments } from '@/widgets/profile/ui/MyPayments/MobileMyPayments/MobileMyPayments'
import { MyPaymentsList } from '@/widgets/profile/ui/MyPayments/MyPaymentsList'

import s from './MyPayments.module.scss'

const dataList: GetMyPaymentsResponse[] = [
  {
    dateOfPayments: '2024-04-26T16:32:04.911Z',
    endDateOfSubscription: '2024-04-27T16:32:04.615Z',
    id: 123,
    paymentType: 'Paypal',
    price: 1,
    subscriptionType: 'day',
    userId: 2,
  },
  {
    dateOfPayments: '2024-04-26T16:33:00.902Z',
    endDateOfSubscription: '2024-05-27T16:33:00.761Z',
    id: 124,
    paymentType: 'Paypal',
    price: 31,
    subscriptionType: 'month',
    userId: 2,
  },
]

export const MyPayments = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Root className={s.table}>
        <Table.Head>
          <Table.Row>
            <Table.TitleCell>
              <Typography asComponent="h3" variant="h3">
                {t.pages.myPayments.dateOfPayment}
              </Typography>
            </Table.TitleCell>
            <Table.TitleCell>
              <Typography asComponent="h3" variant="h3">
                {t.pages.myPayments.endDateOfSubscription}
              </Typography>
            </Table.TitleCell>
            <Table.TitleCell>
              <Typography asComponent="h3" variant="h3">
                {t.pages.myPayments.price}
              </Typography>
            </Table.TitleCell>
            <Table.TitleCell>
              <Typography asComponent="h3" variant="h3">
                {t.pages.myPayments.subscriptionType}
              </Typography>
            </Table.TitleCell>
            <Table.TitleCell>
              <Typography asComponent="h3" variant="h3">
                {t.pages.myPayments.paymentType}
              </Typography>
            </Table.TitleCell>
          </Table.Row>
        </Table.Head>
        <MyPaymentsList myPayments={dataList} />
      </Table.Root>
      <MobileMyPayments className={s.mobileTable} myPayments={dataList} />
      <Pagination
        currentPage={1}
        onChangePage={() => {}}
        options={[{ value: '2' }]}
        pageSize={3}
        totalCount={32}
      />
    </>
  )
}
