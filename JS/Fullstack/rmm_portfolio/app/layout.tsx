import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RMM - WebDesign',
  description: 'Creates, designs and develops websites and web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" 
    className='bg-surface text-white scroll-smooth'
    >
      <ReCaptchaProvider >
        <body className={inter.className}>
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </ReCaptchaProvider>
    </html>
  )
}
