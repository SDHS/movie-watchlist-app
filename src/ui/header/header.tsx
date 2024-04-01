import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { FilmIcon } from 'lucide-react';
import Link from 'next/link';
import SignInOutButton from '../sign-in-out-button';

export default async function Header() {
  const session = await getServerSession(authOptions);

  console.log('session', session);

  return (
    <Navbar isBordered className="mb-unit-xl">
      <NavbarBrand>
        <Link href="/">
          <div className="flex items-center gap-4">
            <FilmIcon size={32} />
            <h1 className="text-2xl">Movies</h1>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <SignInOutButton isSignedIn={session !== null} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
