import { SidebarUserMenu } from '@/components/sidebar-user-menu'
import { Sidebar } from '@/components/ui'
import {
  IconBell,
  IconBrandNextjs,
  IconDashboard,
  IconMessage,
  IconPeople,
  IconPersonAdd,
  IconSearch,
  IconSettings,
} from 'justd-icons'
import Link from 'next/link'
import type { ComponentProps } from 'react'

export const AppSidebar = (props: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <Sidebar.Header>
        <Link
          className="flex items-center group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center gap-x-2"
          href="/"
        >
          <IconBrandNextjs className="size-5" />
          <strong className="font-medium group-data-[collapsible=dock]:hidden">
            First SNS
          </strong>
        </Link>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section>
          <Sidebar.Item isCurrent={true} icon={IconDashboard} href="#">
            Overview
          </Sidebar.Item>

          <Sidebar.Item icon={IconSearch} href="#">
            Search for Trends
          </Sidebar.Item>
          <Sidebar.Item icon={IconBell} href="#" badge={49}>
            Notifications
          </Sidebar.Item>
          <Sidebar.Item icon={IconMessage} href="#" badge={35}>
            Messages
          </Sidebar.Item>
        </Sidebar.Section>
        <Sidebar.Section collapsible={true} title="Analytics">
          <Sidebar.Item icon={IconPeople} href="#">
            Analytics
          </Sidebar.Item>
          <Sidebar.Item icon={IconPersonAdd} href="#">
            Add Advertisement
          </Sidebar.Item>
          <Sidebar.Item icon={IconSettings} href="#">
            Settings
          </Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Content>
      <Sidebar.Footer className="lg:flex lg:flex-row hidden items-center">
        <SidebarUserMenu />
      </Sidebar.Footer>
      <Sidebar.Rail />
    </Sidebar>
  )
}
