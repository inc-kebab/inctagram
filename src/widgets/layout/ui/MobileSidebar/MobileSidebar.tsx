import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import s from './MobileSidebar.module.scss'

import { SidebarElement } from '../../model/types/sidebar'
import { MobileSidebarItem } from './MobileSidebarItem/MobileSidebarItem'

interface Props {
  className?: string
  isLoading?: boolean
  items: SidebarElement[]
}

export const MobileSidebar = ({ className, isLoading, items }: Props) => {
  const pathname = usePathname()

  return (
    <div className={clsx(s.sidebar, className)}>
      {items.map((el, i) => {
        const itemPath = typeof el.href === 'string' ? el.href : el.href.pathname

        const isActive = pathname === itemPath

        const isCreatePostModal = el.href === '/create'

        return (
          <MobileSidebarItem
            disabled={isLoading}
            isActive={isActive}
            isCreatePostModal={isCreatePostModal}
            item={el}
            key={i}
          />
        )
      })}
    </div>
  )
}
