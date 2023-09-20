'use client';

import { default as NextLink } from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  User,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';

import Logo from '../../../public/Logo-Anime-app.png';
import { UserDropDownSeketon } from '..';

export default function NavBar() {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    signOut();
  };

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];
  return (
    <Navbar disableAnimation isBordered className='mb-10'>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <NextLink href='/'>
            <Image src={Logo} width={100} height={100} alt='anime app logo' />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex justify-between gap-4'
        justify='center'>
        <NavbarBrand className='mr-8'>
          <NextLink href='/'>
            <Image src={Logo} width={100} height={100} alt='anime app logo' />
          </NextLink>
        </NavbarBrand>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='#' aria-current='page' color='warning'>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Dropdown placement='bottom-start'>
            <DropdownTrigger>
              {!session ? (
                <>
                  <UserDropDownSeketon />
                </>
              ) : (
                <User
                  as='button'
                  avatarProps={{
                    isBordered: true,
                    src: session.user.icon,
                  }}
                  className='transition-transform'
                  description={session.user.roles[0]}
                  name={session.user.name}
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label='User Actions' variant='flat'>
              <DropdownItem key='settings'>My Settings</DropdownItem>
              <DropdownItem key='team_settings'>Team Settings</DropdownItem>
              <DropdownItem key='analytics'>Analytics</DropdownItem>
              <DropdownItem key='system'>System</DropdownItem>
              <DropdownItem key='configurations'>Configurations</DropdownItem>
              <DropdownItem key='help_and_feedback'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem onClick={handleLogout} key='logout' color='danger'>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href='#'
              size='lg'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
