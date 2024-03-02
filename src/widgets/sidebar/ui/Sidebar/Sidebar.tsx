import { ComponentPropsWithoutRef } from 'react'

import { LogOut } from '@/feature/auth'
import { usePathname } from 'next/navigation'

import s from './Sidebar.module.scss'

import { SidebarElement } from '../../model/types/sidebar'
import { SidebarItem } from '../SidebarItem/SidebarItem'

type Props = {
  buttonName?: string
  isLoading: boolean
  items: SidebarElement[]
  onLogOut: () => void
} & ComponentPropsWithoutRef<'aside'>

export const Sidebar = ({ buttonName, isLoading, items, onLogOut, ...rest }: Props) => {
  const pathname = usePathname()

  return (
    <nav className={s.sidebar} {...rest}>
      <ul className={s.menu}>
        {items.map((el, i) => {
          const itemPath = typeof el.href === 'string' ? el.href : el.href.pathname

          const isActive = pathname === itemPath

          return <SidebarItem isActive={isActive} isLastGroupItem={i === 4} item={el} key={i} />
        })}
      </ul>
      <LogOut isLoading={isLoading} onLogOut={onLogOut} />
    </nav>
  )
}
