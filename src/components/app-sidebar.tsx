import type * as React from 'react'

import { Sidebar } from '@/components/ui'
import {} from '@clerk/nextjs'
import {
  IconBell,
  IconDashboard,
  IconLogin,
  IconMessage,
  IconPeople,
  IconPersonAdd,
  IconSearch,
  IconSettings,
} from 'justd-icons'
import Link from 'next/link'

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <Sidebar.Header>
        <Link
          className="flex items-center group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center gap-x-2"
          href="/"
        >
          <IconLogin className="size-5" />
          <strong className="font-medium group-data-[collapsible=dock]:hidden">
            Next SNS
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
        {/* <SignedIn>
          <Menu>
            <div className="flex items-center w-full py-2 gap-4">
              <UserButton />
              <span className="group-data-[collapsible=dock]:hidden flex items-center justify-center">
                John Doe
              </span>
            </div>
          </Menu>
        </SignedIn>
        <SignedOut>
          <Link
            href={'/sign-in'}
            className="flex items-center py-2 gap-2"
            prefetch={false}
          >
            <IconLogin className="h-6 w-6 text-muted-foreground" />
            <span className="group-data-[collapsible=dock]:hidden flex items-center justify-center">
              Log In
            </span>
          </Link>
        </SignedOut> */}
      </Sidebar.Footer>
      <Sidebar.Rail />
    </Sidebar>
  )
}
