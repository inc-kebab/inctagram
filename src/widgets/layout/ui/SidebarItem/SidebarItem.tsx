import { ComponentPropsWithoutRef } from 'react'

import { CreatePostDialog } from '@/feature/post'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

import { SidebarElement } from '../../model/types/sidebar'

type Props = {
  disabled?: boolean
  isActive?: boolean
  isCreatePostModal?: boolean
  isLastGroupItem?: boolean
  item: SidebarElement
} & Omit<ComponentPropsWithoutRef<'li'>, 'children'>

export const SidebarItem = ({
  disabled,
  isActive,
  isCreatePostModal,
  isLastGroupItem,
  item,
  ...rest
}: Props) => {
  return (
    <li className={clsx(s.item, { [s.lastGroupItem]: isLastGroupItem })} {...rest}>
      {isCreatePostModal ? (
        <CreatePostDialog
          trigger={
            <Button
              className={clsx(s.button, {
                [s.disabled]: disabled,
                [s.full]: item.title && item.icon,
              })}
              variant="text"
            >
              {item.icon}
              <span className={s.title}>{item.title}</span>
            </Button>
          }
        />
      ) : (
        <Link
          className={clsx(s.link, {
            [s.active]: isActive,
            [s.disabled]: disabled,
            [s.full]: item.title && item.icon,
          })}
          href={item.href}
        >
          {isActive ? item.activeIcon || item.icon : item.icon}
          <span className={s.title}>{item.title}</span>
        </Link>
      )}
    </li>
  )
}
