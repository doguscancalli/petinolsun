import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@utils'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'moment/locale/tr'
import { Footer } from '@components/shared'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ToastContainer position='top-center' />
        <main style={{ minHeight: '100vh' }}>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
      <Footer />
    </Provider>
  )
}

export default MyApp
