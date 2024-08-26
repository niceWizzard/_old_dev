import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { useUserStore } from '@/store/userStore'


const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps : GetServerSideProps = async (context:any) => {
  const session = await getServerSession(context.req, context.res,authOptions)
  return {
    props: {

    },
    redirect: (session?.user == null)? {
      destination: "/signin",
      permanent: false,
    } : undefined
  }
}


export default function Home() {

  const {data} = useSession()
  const userStore = useUserStore()

  return (
    <div>
      HELLo {data?.user?.name}
      Nice {JSON.stringify(userStore, null)}
    </div>
  )
}


