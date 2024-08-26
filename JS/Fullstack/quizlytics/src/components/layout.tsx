import React from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

const Layout = ({children} : {children :React.ReactNode}) => {
  return (
    <>
        
        <Header/>
            <main>{children}</main>
        <Footer/>
    </>

  )
}

export default Layout