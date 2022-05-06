import { createSlice } from '@reduxjs/toolkit'

export const petPostSlice = createSlice({
  name: 'petPost',
  initialState: {
    data: {},
    formStep: -1,
    totalSteps: 0,
  },
  reducers: {
    setData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
    increaseFormStep: (state) => {
      state.formStep += 1
    },
    decreaseFormStep: (state) => {
      state.formStep -= 1
    },
    setTotalSteps: (state, action) => {
      state.totalSteps = action.payload
    },
  },
})

export const { setData, increaseFormStep, decreaseFormStep, setTotalSteps } =
  petPostSlice.actions

export default petPostSlice.reducer
