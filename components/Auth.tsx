import { useSession, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

export default function Auth({ children }: { children: ReactNode }) {
  const { status, data: session, update } = useSession();
  if (status === 'authenticated') {
    return <>{children}</>;
  }
  signIn();
  return <>Sign In... </>;
}
