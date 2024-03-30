import { Navbar, NavbarBrand } from '@nextui-org/navbar';

import { FilmIcon } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <Navbar isBordered className="mb-unit-xl">
      <Link href="/">
        <NavbarBrand>
          <div className="flex items-center gap-4">
            <FilmIcon size={32} />
            <h1 className="text-2xl">Movies</h1>
          </div>
        </NavbarBrand>
      </Link>
    </Navbar>
  );
}
