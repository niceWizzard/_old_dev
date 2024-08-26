import { useSession } from 'next-auth/react'
import React from 'react'

const RequireAuth = ({children} : {children: React.ReactNode}) => {
    const {status} = useSession()
  return (
    <>
        {
            status === 'authenticated' ? children : null
        }
    </>
  )
}

export default RequireAuth