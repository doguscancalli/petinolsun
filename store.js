import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '@features/ui/uiSlice'
import authReducer from '@features/auth/authSlice'
import petPostReducer from '@features/petPost/petPostSlice'
import postReducer from '@features/post/postSlice'
import commentReducer from '@features/comment/commentSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    petPost: petPostReducer,
    post: postReducer,
    comment: commentReducer,
  },
})
