import { createSlice } from '@reduxjs/toolkit'

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    searchData: {},
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload
    },
    addSearchData: (state, action) => {
      state.searchData.docs.unshift(action.payload)
    },
    removeSearchData: (state, action) => {
      state.searchData.docs = state.searchData.docs.filter(
        (comment) => comment.id !== action.payload
      )
    },
  },
})

export const { setSearchData, addSearchData, removeSearchData } =
  commentSlice.actions

export default commentSlice.reducer
