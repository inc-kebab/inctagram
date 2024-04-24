import { Button } from '@/shared/ui/Button'
import { CreatePostDialog } from '@/widgets/post'
import { MobileCreatePostDialog } from '@/widgets/post/ui/MobileCreatePostDialog/MobileCreatePostDialog'
import clsx from 'clsx'
import Link from 'next/link'

import s from './MobileSidebarItem.module.scss'

import { SidebarElement } from '../../../model/types/sidebar'

interface Props {
  disabled?: boolean
  isActive?: boolean
  isCreatePostModal?: boolean
  item: SidebarElement
}

export const MobileSidebarItem = ({ disabled, isActive, isCreatePostModal, item }: Props) => {
  return isCreatePostModal ? (
    <MobileCreatePostDialog
      trigger={
        <Button
          className={clsx(s.button, {
            [s.disabled]: disabled,
          })}
          variant="text"
        >
          {item.icon}
        </Button>
      }
    />
  ) : (
    <Link
      className={clsx(s.link, {
        [s.active]: isActive,
        [s.disabled]: disabled,
      })}
      href={item.href}
    >
      {isActive ? item.activeIcon || item.icon : item.icon}
    </Link>
  )
}
