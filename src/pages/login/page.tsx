import { LoginButton, LogoutButton } from '@/components/button/authButton'
import { getServerSession } from 'next-auth';
import {SessionProvider} from "next-auth/react";

export default async function Home() {
  const session = await getServerSession();

  return (
    <SessionProvider>
      {!session ? <LoginButton /> : null}
      {session ? <LogoutButton /> : null}
    </SessionProvider>
  )
}
