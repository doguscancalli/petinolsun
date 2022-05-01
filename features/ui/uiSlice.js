import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {
    sendToast: (_, action) => {
      const { type, message } = action.payload
      toast[type](message)
    },
  },
})

export const { sendToast } = uiSlice.actions

export default uiSlice.reducer
