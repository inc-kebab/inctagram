import { GetMyPaymentsResponse } from '@/feature/profile/model/types/profile.types'
import { useTranslation } from '@/shared/hooks'
import { Pagination } from '@/shared/ui/Pagination'
import { Table } from '@/shared/ui/Table'
import { format } from 'date-fns'

import s from './MyPayments.module.scss'

const myPayments: GetMyPaymentsResponse[] = [
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
        <Table.Head className={s.tableHead}>
          <Table.Row>
            <Table.TitleCell>{t.pages.myPayments.dateOfPayment}</Table.TitleCell>
            <Table.TitleCell>{t.pages.myPayments.endDateOfSubscription}</Table.TitleCell>
            <Table.TitleCell>{t.pages.myPayments.price}</Table.TitleCell>
            <Table.TitleCell>{t.pages.myPayments.subscriptionType}</Table.TitleCell>
            <Table.TitleCell>{t.pages.myPayments.paymentType}</Table.TitleCell>
          </Table.Row>
        </Table.Head>
        <Table.Body className={s.body}>
          {myPayments.map(el => {
            const dateOfPayments = format(new Date(el.dateOfPayments), 'dd.MM.yyyy')
            const endDateOfSubscription = format(new Date(el.endDateOfSubscription), 'dd.MM.yyyy')

            return (
              <Table.Row className={s.row} key={el.id}>
                <Table.Cell className={s.cell} data-label={t.pages.myPayments.dateOfPayment}>
                  {dateOfPayments}
                </Table.Cell>
                <Table.Cell
                  className={s.cell}
                  data-label={t.pages.myPayments.endDateOfSubscription}
                >
                  {endDateOfSubscription}
                </Table.Cell>
                <Table.Cell className={s.cell} data-label={t.pages.myPayments.price}>
                  ${el.price}
                </Table.Cell>
                <Table.Cell className={s.cell} data-label={t.pages.myPayments.subscriptionType}>
                  {el.subscriptionType}
                </Table.Cell>
                <Table.Cell className={s.cell} data-label={t.pages.myPayments.paymentType}>
                  {el.paymentType}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
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
