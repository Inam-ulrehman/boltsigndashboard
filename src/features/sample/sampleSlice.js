import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isLoading: false,
}

export const userThunk = createAsyncThunk(
  'user/userThunk',
  async (file, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        '/contentAboutUs/uploadImage',
        file,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
  },
  extraReducers: {
    [userThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [userThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [userThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction } = userSlice.actions
export default userSlice.reducer
