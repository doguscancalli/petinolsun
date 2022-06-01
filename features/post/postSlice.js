import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    editData: {},
    searchData: {},
  },
  reducers: {
    setEditData: (state, action) => {
      state.editData = {
        ...state.editData,
        ...action.payload,
      }
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload
    },
    addSearchData: (state, action) => {
      state.searchData.docs.unshift(action.payload)
    },
  },
})

export const { setEditData, setSearchData, addSearchData } = postSlice.actions

export default postSlice.reducer
