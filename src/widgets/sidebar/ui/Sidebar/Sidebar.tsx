import { ComponentPropsWithoutRef } from 'react'

import { Logout } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'
import { usePathname } from 'next/navigation'

import s from './Sidebar.module.scss'

import { SidebarElement } from '../../model/types/sidebar'
import { SidebarItem } from '../SidebarItem/SidebarItem'

type Props = {
  items: SidebarElement[]
  onLogout: () => void
} & ComponentPropsWithoutRef<'aside'>

export const Sidebar = ({ items, onLogout, ...rest }: Props) => {
  const pathname = usePathname()

  return (
    <aside className={s.sidebar} {...rest}>
      <ul className={s.menu}>
        {items.map((el, i) => {
          const itemPath = typeof el.href === 'string' ? el.href : el.href.pathname

          const isActive = pathname === itemPath

          return <SidebarItem isActive={isActive} isLastGroupItem={i === 4} item={el} key={i} />
        })}
      </ul>
      <Button className={s.logout} onClick={onLogout} startIcon={<Logout />} variant="text">
        Log Out
      </Button>
    </aside>
  )
}
