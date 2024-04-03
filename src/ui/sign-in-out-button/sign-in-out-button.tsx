'use client';

import { Github } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

export default function SignInOutButton({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const router = useRouter();
  return isSignedIn ? (
    <Button onClick={() => signOut()}>Sign out</Button>
  ) : (
    <Button
      startContent={<Github />}
      onClick={() => router.push('/api/auth/signin')}
    >
      Sign in
    </Button>
  );
}
