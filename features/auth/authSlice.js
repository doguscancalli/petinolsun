import { createSlice } from '@reduxjs/toolkit'
import { setCookies, getCookie, removeCookies } from 'cookies-next'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null,
}
if (getCookie('token')) {
  const decodedToken = jwtDecode(getCookie('token'))

  if (decodedToken.exp * 1000 < Date.now()) {
    removeCookies('token')
  } else {
    initialState.user = decodedToken
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const key = Object.keys(action.payload)[0]
      const decodedToken = jwtDecode(action.payload[key].token)
      setCookies('token', action.payload[key].token, {
        expires: new Date(decodedToken.exp * 1000),
        secure: process.env.NODE_ENV === 'production',
      })
      state.user = action.payload[key]
    },
    logout: (state) => {
      removeCookies('token')
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
