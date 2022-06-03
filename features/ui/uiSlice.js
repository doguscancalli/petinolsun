import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    sendToast: (_, action) => {
      const { type, message } = action.payload
      toast[type](message)
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
})

export const { sendToast, toggleSidebar } = uiSlice.actions

export default uiSlice.reducer
