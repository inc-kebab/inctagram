'use client'
import { ComponentPropsWithoutRef, useState } from 'react'

import { AddPostPhotoDialog } from '@/feature/post/ui/AddPostPhotoDialog/AddPostPhotoDialog'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

import { SidebarElement } from '../../model/types/sidebar'

type Props = {
  disabled?: boolean
  isActive?: boolean
  isLastGroupItem?: boolean
  isLink?: boolean
  item: SidebarElement
} & Omit<ComponentPropsWithoutRef<'li'>, 'children'>

export const SidebarItem = ({
  disabled,
  isActive,
  isLastGroupItem,
  isLink,
  item,
  ...rest
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <li className={clsx(s.item, { [s.lastGroupItem]: isLastGroupItem })} {...rest}>
      {isLink ? (
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
      ) : (
        <AddPostPhotoDialog
          onOpenChange={setIsDialogOpen}
          open={isDialogOpen}
          trigger={
            <Button
              className={clsx(s.button, {
                [s.disabled]: disabled,
                [s.full]: item.title && item.icon,
              })}
              onClick={() => setIsDialogOpen(true)}
              variant="text"
            >
              {item.icon}
              <span className={s.title}>{item.title}</span>
            </Button>
          }
        />
      )}
    </li>
  )
}
