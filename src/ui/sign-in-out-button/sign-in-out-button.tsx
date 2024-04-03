'use client';

import { LogIn } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

import type { Props } from './types';

export default function SignInOutButton({ isSignedIn }: Props) {
  const router = useRouter();
  return isSignedIn ? (
    <Button onClick={() => signOut()}>Sign out</Button>
  ) : (
    <Button
      startContent={<LogIn />}
      onClick={() => router.push('/api/auth/signin')}
    >
      Sign in
    </Button>
  );
}
