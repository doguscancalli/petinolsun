import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@utils'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ToastContainer position='top-center' />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
