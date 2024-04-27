import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Table.module.scss'

const Root = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <table className={clsx(s.root, className)} ref={ref} {...restProps}>
        {children}
      </table>
    )
  }
)

const Head = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <thead className={clsx(s.thead, className)} ref={ref} {...restProps}>
        {children}
      </thead>
    )
  }
)

const Body = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tbody className={clsx(s.body, className)} ref={ref} {...restProps}>
        {children}
      </tbody>
    )
  }
)

const Row = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr className={clsx(s.row, className)} ref={ref} {...restProps}>
        {children}
      </tr>
    )
  }
)

const TitleCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <th className={clsx(s.title, className)} ref={ref} {...restProps}>
        {children}
      </th>
    )
  }
)

const Cell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <td className={clsx(s.cell, className)} ref={ref} {...restProps}>
        {children}
      </td>
    )
  }
)

export const Table = { Body, Cell, Head, Root, Row, TitleCell }
