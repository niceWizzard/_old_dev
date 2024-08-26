import { signIn } from 'next-auth/react'
import React, { useCallback } from 'react'
import {cookies} from 'next/headers'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'

export const getServerSideProps : GetServerSideProps = async (context : any) => {

  const a = await getServerSession(context.req, context.res, authOptions)
  if(a?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      } 
    }
  } 

  return {
    props: {}
  }
}

const ERROR_CODES: Record<string, string> = {
  "not_registered":  'Acccount not found. Please register first.'
} 

const SignIn = () => {
    const [_,setCookie] = useCookies(['signin_type'])

    const {query} = useRouter()

    const handleSignin = useCallback((type: string) : void => {
      setCookie('signin_type',type,{expires: new Date(Date.now() + 1000 * 60 * 1.5)})
      signIn('google')
    },[])

  return (
    <div className='flex justify-center items-center mt-5 text-center px-6 py-3'>
        <section className='border-gray-400 border px-6 py-3 text-2xl '>
            <h1 className='text-semibold text-4xl mb-3'>Who are you?</h1>
            <hr />
            <span className='text-red-500 italic font-light text-md'>{ERROR_CODES[query.error?.toString() ?? ""]} </span>
            <div className='flex flex-col mt-10'>

              <button
              className='border border-gray shadow bg-blue-400 text-white rounded px-3 py-2'
              onClick={() => handleSignin('signin')}
              >
                  Sign In 
              </button>
              <span className='text-md font-light text-gray-500'>or</span>
              <button
              className='border border-gray shadow rounded px-3 py-2'
              onClick={() => handleSignin('register')}
              >
                  Register
              </button>
              
            </div>
        </section>
    </div>
  )
}

export default SignIn
