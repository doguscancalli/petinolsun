import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '@features/ui/uiSlice'
import authReducer from '@features/auth/authSlice'
import petPostReducer from '@features/petPost/petPostSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    petPost: petPostReducer,
  },
})
