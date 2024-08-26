import Layout from '@/components/layout'
import AllProviders from '@/components/providers'
import { useUserStore } from '@/store/userStore'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {

  
  return (
  <>
      <Head>
        <title>Quizlytics</title>
        <meta name="description" content="Quizlytics is a progressive and learning oriented website." />
      </Head>
    <AllProviders>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AllProviders>
  </>)
}

