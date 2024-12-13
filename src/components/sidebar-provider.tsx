'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { Button, Menu, Separator, Sidebar } from '@/components/ui'
import {} from '@clerk/nextjs'
import {
  IconBell,
  IconChevronLgDown,
  IconCirclePerson,
  IconLogout,
  IconMail,
  IconSearch,
  IconSettings,
  IconShield,
} from 'justd-icons'
import type { ReactNode } from 'react'
import { SearchField } from 'react-aria-components'

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Sidebar.Provider>
      <AppSidebar />
      <Sidebar.Inset>
        <Sidebar.Nav isSticky={true}>
          <div className="flex justify-between w-full">
            <span className="flex items-center gap-x-3">
              <Sidebar.Trigger className="-mx-2" />
              <Separator
                className="h-6 sm:block hidden"
                orientation="vertical"
              />
            </span>
            <div className="flex items-center gap-4">
              <SearchField className="sm:inline hidden sm:ml-1.5" />
              <IconBell className="size-6" />
              <IconMail className="size-6" />
              {/* <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href={'/sign-in'} className="relative" prefetch={false}>
                  <IconLogin className="h-6 w-6 text-muted-foreground" />
                </Link>
              </SignedOut> */}
            </div>
          </div>
          <div className="flex sm:hidden items-center gap-x-2">
            <Button
              appearance="plain"
              aria-label="Search..."
              size="square-petite"
            >
              <IconSearch />
            </Button>

            <Menu>
              <Menu.Trigger
                aria-label="Profile"
                className="flex items-center gap-x-2 group"
              >
                <IconChevronLgDown className="size-4 group-pressed:rotate-180 transition-transform" />
              </Menu.Trigger>
              <Menu.Content className="min-w-[--trigger-width]">
                <Menu.Item href="#">
                  <IconCirclePerson />
                  Profile
                </Menu.Item>
                <Menu.Item href="#">
                  <IconSettings />
                  Settings
                </Menu.Item>
                <Menu.Item href="#">
                  <IconShield />
                  Security
                </Menu.Item>
                <Menu.Item href="#">
                  <IconLogout />
                  Log out
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </div>
        </Sidebar.Nav>
        <main className="p-4 lg:p-6">{children}</main>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}
