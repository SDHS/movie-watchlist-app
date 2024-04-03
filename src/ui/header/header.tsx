import { FilmIcon } from 'lucide-react';

import NextLink from 'next/link';

import { Avatar } from '@nextui-org/avatar';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { getServerSession } from 'next-auth/next';

import SignInOutButton from '@/ui/sign-in-out-button';

import { authOptions } from '@/utils/authOptions';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <Navbar isBordered className="mb-unit-xl w-full">
      <NavbarBrand className="max-w-fit">
        <NextLink href="/">
          <div className="flex items-center gap-4">
            <FilmIcon size={32} />
            <h1 className="text-2xl">Movies</h1>
          </div>
        </NextLink>
      </NavbarBrand>
      <NavbarContent className="ml-auto max-w-fit">
        {session !== null ? (
          <NavbarItem>
            <NextLink href="/watchlist" className="text-primary">
              My watchlist
            </NextLink>
          </NavbarItem>
        ) : null}
        <NavbarItem>
          <SignInOutButton isSignedIn={session !== null} />
        </NavbarItem>
        <NavbarItem>
          {session !== null ? (
            <Avatar
              size="md"
              src={session?.user.image ?? './image_not_found.jpg'}
            />
          ) : null}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
