import { getServerSession, Session } from 'next-auth';

import React from 'react'
import OnBoardButton from './OnBoardBtn';
import { redirect } from 'next/navigation';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from 'next-auth/react';
import { cookies } from 'next/headers';

const action = async (session : Session) => {
    "use server";
    const cookie = cookies()
    const supabase = createServerActionClient({
        cookies: () => cookie
    })
    await supabase.from('user').insert({
        email: session?.user?.email,
        name: session?.user?.name,
    })
    redirect('/')
}



const OnBoardingPage = async () => {
    const session = await getServerSession()

    if(session == null || (session as any).onboarded ) {
        return redirect("/")
    }
    

  return (
    <>
          <pre>{JSON.stringify(session)}</pre>
        <div>OnBoardingPage</div>
        <OnBoardButton action={action} session={session}></OnBoardButton>
    </>
  )
}

export default OnBoardingPage