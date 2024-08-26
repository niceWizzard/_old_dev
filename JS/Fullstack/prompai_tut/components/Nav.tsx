"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Link from 'next/link'

const Nav = () => {
  const {data : session, status} = useSession();
  const [providers, setProviders] = useState<any>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const initialize = async () => { 
      const response = await getProviders();
      setProviders(response)
    }
    initialize()
  },[])
  const isUserLogin = () => !!session?.user

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2'>
        <Image src="/assets/images/logo.svg" alt='' width={30} height={30} className='object-contain' />
        <p className="logo_text">Promptopia</p>
      </Link>
      <p>{status}</p>
      <div className="sm:flex hidden">
        {
        isUserLogin() ? 
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>Create Post </Link>
            <button type="button" onClick={() => signOut()}> Sign Out</button>
            <Link href="/profile" >
              <Image src="/assets/images/logo.svg" height={37} width={37} alt='profile'
               className='rounded-full'/>
            </Link>
          </div> : 
          (<>
            {
              providers && Object.values(providers).map((provider : any) => (
                <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
                >
                  Sign in with {provider.name}
                </button>
              ))
            }
          
          </>)
      
        }

      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex relative">
        {isUserLogin() ? 
        <div className="flex">
          <Image src="/assets/images/logo.svg" height={37} width={37} alt='profile'
               className='rounded-full'
               onClick={() => setToggleDropdown((prev) => !prev)}

               />
          {toggleDropdown && 
          <div className="dropdown">
            <Link href="/profile"
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              My Profile
            </Link>
            <Link href="/create-prompt"
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              Create Prompt
            </Link>
            <button type="button" className="mt-5 w-full black_btn" onClick={() =>{ setToggleDropdown(false); signOut() }}>Sign Out</button>
          </div>}
        </div>  : (<>
          {
              providers && Object.values(providers).map((provider : any) => (
                <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
                >
                  Sign in with {provider.name}
                </button>
              ))
            }</>)
      }
      </div>

    </nav>
  )
}

export default Nav