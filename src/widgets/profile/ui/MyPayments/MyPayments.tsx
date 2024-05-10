import { useTranslation } from '@/shared/hooks'
import { Loader } from '@/shared/ui/Loader'
import { Pagination } from '@/shared/ui/Pagination'
import { Table } from '@/shared/ui/Table'
import { format } from 'date-fns'

import s from './MyPayments.module.scss'

import { usePaginationPayments } from '../../model/hooks/usePaginationPayments'
import { PaymentsSkeleton } from './PaymentsSkeleton'

export const MyPayments = () => {
  const { t } = useTranslation()

  const {
    handleChangePageNumber,
    handleChangePageSize,
    pageNumber,
    pageSize,
    paginationOptions,
    request,
  } = usePaginationPayments()

  if (request.isLoading) {
    return <Loader className={s.loader} containerHeight />
  }

  return (
    <div className={s.root}>
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
          {request.isFetching ? (
            <PaymentsSkeleton countCell={pageSize} />
          ) : (
            request.data?.items.map(el => {
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
            })
          )}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pageNumber}
        onChangePage={handleChangePageNumber}
        onValueChange={handleChangePageSize}
        options={paginationOptions}
        pageSize={pageSize}
        totalCount={request.data?.totalCount ?? 0}
        value={String(pageSize)}
      />
    </div>
  )
}
