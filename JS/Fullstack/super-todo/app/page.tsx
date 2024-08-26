"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"



export default function Home() {
  const { data: session } = useSession()

  if(session && (session as any).onboarded == false ) {
    return redirect("/onboarding")
  }

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
        <>
          <p>Welcome {session.user?.name}. Signed In As</p>
          <p>{session.user?.email}</p>
          <pre>{JSON.stringify(session)}</pre>
          <button onClick={() => signOut()}>Sign out</button>
        </>
    )
  }

  // rendering components for not logged in users
  return (
        <>
          <p>Not Signed In</p>
          <button onClick={() => signIn('github')}>Sign in with github</button>
        </>
  )

}
