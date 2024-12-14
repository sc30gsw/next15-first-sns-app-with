import { Avatar, Heading, Menu } from '@/components/ui'
import {
  IconDashboard,
  IconDeviceDesktop,
  IconLogin,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from 'justd-icons'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export const SidebarUserMenu = () => {
  const { data: session } = useSession()
  const { resolvedTheme, setTheme } = useTheme()

  if (!session) {
    return (
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
    )
  }

  return (
    <Menu>
      <Menu.Trigger className="flex items-center py-2 gap-2">
        <Avatar
          status="online"
          src={session.user?.image ?? 'placeholder.png'}
          alt="logged in user"
        />
        <Heading level={4}>{session.user?.name}</Heading>
      </Menu.Trigger>
      <Menu.Content placement="bottom" showArrow={true} className="sm:min-w-64">
        <Menu.Section>
          <Menu.Header separator={true}>
            <span className="block">{session.user?.name}</span>
            <span className="font-normal text-muted-fg">
              @{session.user?.id?.substring(0, 12)}
            </span>
          </Menu.Header>
        </Menu.Section>

        <Menu.Item href="#dashboard">
          <IconDashboard />
          Dashboard
        </Menu.Item>
        <Menu.Item href="#settings">
          <IconSettings />
          Settings
        </Menu.Item>
        <Menu.Separator />
        <Menu.Submenu>
          <Menu.Item>
            {resolvedTheme === 'light' ? (
              <IconSun />
            ) : resolvedTheme === 'dark' ? (
              <IconMoon />
            ) : (
              <IconDeviceDesktop />
            )}
            Switch theme
          </Menu.Item>
          <Menu.Content>
            <Menu.Item onAction={() => setTheme('system')}>
              <IconDeviceDesktop /> System
            </Menu.Item>
            <Menu.Item onAction={() => setTheme('dark')}>
              <IconMoon /> Dark
            </Menu.Item>
            <Menu.Item onAction={() => setTheme('light')}>
              <IconSun /> Light
            </Menu.Item>
          </Menu.Content>
        </Menu.Submenu>
        <Menu.Separator />
        <Menu.Item href="#logout" onAction={() => signOut()}>
          <IconLogout />
          Log out
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
