import { Skeleton } from '@/shared/ui/Skeleton'
import { Table } from '@/shared/ui/Table'

import s from './MyPayments.module.scss'

interface Props {
  countCell: number
}

export const PaymentsSkeleton = ({ countCell }: Props) => {
  return new Array(countCell).fill(0).map((_, i) => (
    <Table.Row className={s.row} key={i}>
      <Table.Cell className={s.cell}>
        <Skeleton border={5} className={s.skeleton} height={24} width="100%" />
      </Table.Cell>
      <Table.Cell className={s.cell}>
        <Skeleton border={5} className={s.skeleton} height={24} width="100%" />
      </Table.Cell>
      <Table.Cell className={s.cell}>
        <Skeleton border={5} className={s.skeleton} height={24} width="100%" />
      </Table.Cell>
      <Table.Cell className={s.cell}>
        <Skeleton border={5} className={s.skeleton} height={24} width="100%" />
      </Table.Cell>
      <Table.Cell className={s.cell}>
        <Skeleton border={5} className={s.skeleton} height={24} width="100%" />
      </Table.Cell>
    </Table.Row>
  ))
}
