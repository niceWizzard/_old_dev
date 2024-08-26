import Footer from '@/components/shared/Footer'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quizlytics',
  description: 'Fueling your quest for knowledge through interactive exploration and insightful analysis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en"
      className='bg-neutral '
      > 
        <body className={`${inter.className} flex flex-col h-screen`}>
          <Header/>
          <div
          className='flex-grow'
          >
            {children}
          </div>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}

