import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

const isBrowser = typeof window !== 'undefined'
const token = getCookie('token')

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/graphql`,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...(isBrowser && token && { authorization: `Bearer ${token}` }),
    },
  }
})

export default new ApolloClient({
  ssrMode: !isBrowser,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
