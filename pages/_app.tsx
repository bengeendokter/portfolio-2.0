import Tina from '../.tina/components/TinaDynamicProvider.js'
import '@styles/globals.css'
import Head from 'next/head'

const App = ({ Component, pageProps }: any) =>
{
  return (
    <Tina>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta name="description" content="Portfolio van Ben" />
        <meta name="keywords" content="Portfolio" />
        <meta name="author" content="Ben Arts" />
        <title>Portfolio Ben</title>

        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@bengeendokter" key="twhandle" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon.ico"
          rel="icon"
        />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <meta name="theme-color" content="#101019" />
      </Head>
      <Component {...pageProps} />
    </Tina>
  )
}

export default App
