import {SessionProvider} from 'next-auth/react'
import { CookiesProvider } from 'react-cookie'
import React from 'react'
import { useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { useUserStore } from '@/store/userStore'


const OtherProviders = ({children} : {children: React.ReactNode}) => {
  const {data} = useSession()

  useEffect(() => {
    if(data == undefined) {
      return;
    }
    (async () => {
      const res = await (await fetch("/api/users/current")).json()
      console.log(res)
      useUserStore.setState({
        createdClasses: res.createdClasses,
        posts: res.posts,
        enrolledClasses: res.enrolledClasses,        
      })
    })()

  }, [data])
  return (
    <>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </>
  )
}

const AllProviders = ({children} : {children: React.ReactNode}) => {

  return (<>
    <SessionProvider>
      <OtherProviders>
        {children}
      </OtherProviders>
  </SessionProvider>
  </>)
}

export default AllProviders