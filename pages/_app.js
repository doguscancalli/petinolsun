import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@utils'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'moment/locale/tr'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { GoogleAnalytics, usePagesViews } from 'nextjs-google-analytics'

const Noop = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop

  usePagesViews()

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ToastContainer position='top-center' />
        <Layout>
          <GoogleAnalytics />
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
