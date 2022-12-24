import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Roboto_Flex } from '@next/font/google'

const roboto = Roboto_Flex({subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
