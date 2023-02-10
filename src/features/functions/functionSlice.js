import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'

const initialState = {
  warning: false,
  deleteAllWarning: false,
  isLoading: false,
}

export const functionThunk = createAsyncThunk(
  'functions/functionThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const functionSlice = createSlice({
  name: 'function',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    showWarning: (state, { payload }) => {
      state.warning = true
    },
    hideWarning: (state, { payload }) => {
      state.warning = false
    },
    showDeleteAllWarning: (state, { payload }) => {
      state.deleteAllWarning = true
    },
    hideDeleteAllWarning: (state, { payload }) => {
      state.deleteAllWarning = false
    },
  },
  extraReducers: {
    [functionThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [functionThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [functionThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
  },
})
export const {
  createFunction,
  hideWarning,
  showWarning,
  showDeleteAllWarning,
  hideDeleteAllWarning,
} = functionSlice.actions
export default functionSlice.reducer
