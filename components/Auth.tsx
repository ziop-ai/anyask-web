import { signIn, useSession } from 'next-auth/react';
import { ReactNode } from 'react';


function Auth({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  if (session) {
    return <>{ children }</>;
  } else {
    return (
      <>
        <p  style={ { color: "white" } }>Check Slack - General for the invitation code</p>
        <button onClick={ () => signIn() } style={ { color: "white",  background:"gold" } }>Sign in</button>
      </>
    )
  }
}

export default Auth;