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
    clearData: (state) => {
      state.data = {}
      state.formStep = -1
      state.totalSteps = 0
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

export const {
  setData,
  clearData,
  increaseFormStep,
  decreaseFormStep,
  setTotalSteps,
} = petPostSlice.actions

export default petPostSlice.reducer
