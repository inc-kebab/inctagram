import { GetMyPaymentsResponse } from '@/feature/profile/model/types/profile.types'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { format } from 'date-fns'

type Props = { myPayments: GetMyPaymentsResponse[] }

export const MyPaymentsList = ({ myPayments }: Props) => {
  return (
    <Table.Body>
      {myPayments.map(el => {
        const dateOfPayments = format(new Date(el.dateOfPayments), 'dd.MM.yyyy')
        const endDateOfSubscription = format(new Date(el.endDateOfSubscription), 'dd.MM.yyyy')

        return (
          <Table.Row key={el.id}>
            <Table.Cell>
              <Typography asComponent="span" variant="regular14">
                {dateOfPayments}
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography asComponent="span" variant="regular14">
                {endDateOfSubscription}
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography asComponent="span" variant="regular14">
                ${el.price}
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography asComponent="span" variant="regular14">
                {el.subscriptionType}
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography asComponent="span" variant="regular14">
                {el.paymentType}
              </Typography>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}
