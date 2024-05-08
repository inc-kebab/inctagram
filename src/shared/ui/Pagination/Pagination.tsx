import { ArrowIos } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Select, SelectProps } from '@/shared/ui/Select'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './Pagination.module.scss'

import { usePagination } from './usePagination'

type Props = {
  currentPage: number
  onChangePage: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
} & Omit<SelectProps, 'label' | 'pagination'>

export const Pagination = ({
  className,
  currentPage,
  onChangePage,
  pageSize,
  siblingCount = 1,
  totalCount,
  ...selectProps
}: Props) => {
  const { t } = useTranslation()

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return (
      <Typography asComponent="div" className={s.selectContainer} variant="regular14">
        {t.label.show}
        <Select {...selectProps} className={s.select} pagination />
        {t.label.onPage}
      </Typography>
    )
  }

  const handleClickPrev = () => {
    onChangePage(currentPage - 1)
  }

  const handleClickNext = () => {
    onChangePage(currentPage + 1)
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === paginationRange[paginationRange.length - 1]

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.pagination}>
        <button
          className={clsx(s.item, { [s.disabled]: isFirstPage })}
          disabled={isFirstPage}
          onClick={handleClickPrev}
        >
          <ArrowIos className={s.left} height={20} width={20} />
        </button>
        {paginationRange.map((num, i) => {
          if (num === 0) {
            return (
              <span className={clsx(s.item, s.dots)} key={i}>
                &#8230;
              </span>
            )
          }
          const isCurrentPage = num === currentPage

          const handleChangePage = () => onChangePage(num)

          return (
            <button
              className={clsx(s.item, { [s.selected]: isCurrentPage })}
              key={i}
              onClick={handleChangePage}
            >
              <Typography asComponent="span" variant="regular14">
                {num}
              </Typography>
            </button>
          )
        })}
        <button
          className={clsx(s.item, { [s.disabled]: isLastPage })}
          disabled={isLastPage}
          onClick={handleClickNext}
        >
          <ArrowIos className={s.right} height={20} width={20} />
        </button>
      </div>
      <Typography asComponent="div" className={s.selectContainer} variant="regular14">
        {t.label.show}
        <Select {...selectProps} className={s.select} pagination />
        {t.label.onPage}
      </Typography>
    </div>
  )
}
