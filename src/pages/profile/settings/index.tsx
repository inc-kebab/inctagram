import { ReactElement, useEffect, useMemo, useState } from 'react'

import { GeneralInformation } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Tabs } from '@/shared/ui/Tabs'
import { SidebarLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const valuesTabs = ['general', 'devices', 'management', 'payments']

const ProfileSettings: Page = () => {
  const { t } = useTranslation()

  const { push, query } = useRouter()

  const [activeTab, setActiveTab] = useState((query.tab as string) || 'general')

  const handleChangeTabValue = (value: string) => {
    setActiveTab(value)
    void push({ query: { tab: value } })
  }

  const tabs = useMemo(() => {
    return [
      { children: t.tabs.general, value: 'general' },
      { children: t.tabs.devices, value: 'devices' },
      { children: t.tabs.management, value: 'management' },
      { children: t.tabs.payments, value: 'payments' },
    ]
  }, [t])

  useEffect(() => {
    if (!query.tab || !valuesTabs.includes(query.tab as string)) {
      setActiveTab('general')
      void push({ query: { tab: 'general' } })
    }
  }, [push, query.tab])

  return (
    <Tabs.Root defaultValue={tabs[0].value} onValueChange={handleChangeTabValue} value={activeTab}>
      <Tabs.List>
        {tabs.map(el => (
          <Tabs.Item key={el.value} value={el.value}>
            {el.children}
          </Tabs.Item>
        ))}
      </Tabs.List>
      <Tabs.Content value={tabs[0].value}>
        <GeneralInformation />
      </Tabs.Content>
      <Tabs.Content style={{ padding: 20 }} value={tabs[1].value}>
        Devices
      </Tabs.Content>
      <Tabs.Content style={{ padding: 20 }} value={tabs[2].value}>
        Account management
      </Tabs.Content>
      <Tabs.Content style={{ padding: 20 }} value={tabs[3].value}>
        My payments
      </Tabs.Content>
    </Tabs.Root>
  )
}

ProfileSettings.getLayout = (page, t) => {
  return (
    <SidebarLayout
      description={t.pages.profileSettings.metaDescription}
      title={t.pages.profileSettings.metaTitle}
    >
      {page}
    </SidebarLayout>
  )
}

export default ProfileSettings
