import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  name: '',
  profession: '',
  paragraph: '',
  uploadImage: [],
  createdAt: '',
  updatedAt: '',
  getEditAboutUsData: false,
  _id: '',
  isLoading: false,
}

export const editAboutUsThunk = createAsyncThunk(
  'aboutUs/editAboutUsThunk',
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

// ===========get Single AboutUs============
export const SingleEditAboutUsThunk = createAsyncThunk(
  'aboutUs/SingleEditAboutUsThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(`contentAboutUs/admin/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ===========update aboutUs Image ============
export const updateAboutUsImageThunk = createAsyncThunk(
  'aboutUs/updateAboutUsImageThunk',
  async (data, thunkAPI) => {
    const { formData: file, _id } = data
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(
        `contentAboutUs/admin/${_id}`,
        file,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ===========update aboutUs Text ============
export const updateAboutUsTextThunk = createAsyncThunk(
  'aboutUs/updateAboutUsTextThunk',
  async (data, thunkAPI) => {
    const { _id, name, profession, paragraph } = data
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        `contentAboutUs/admin/${_id}`,
        { name, profession, paragraph },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const editAboutUsSlice = createSlice({
  name: 'editAboutUs',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getEditAboutUsValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
  },
  extraReducers: {
    [editAboutUsThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [editAboutUsThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [editAboutUsThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ===========get Single AboutUs============
    [SingleEditAboutUsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [SingleEditAboutUsThunk.fulfilled]: (state, { payload }) => {
      state.name = payload.name
      state.profession = payload.profession
      state.paragraph = payload.paragraph
      state.uploadImage = payload.uploadImage
      state.createdAt = payload.createdAt
      state.updatedAt = payload.updatedAt
      state._id = payload._id
      state.isLoading = false
    },
    [SingleEditAboutUsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    //  ======update aboutUs Image=======
    [updateAboutUsImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [updateAboutUsImageThunk.fulfilled]: (state, { payload }) => {
      state.getEditAboutUsData = !state.getEditAboutUsData
      state.isLoading = false
    },
    [updateAboutUsImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    //  ======update aboutUs Text=======
    [updateAboutUsTextThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [updateAboutUsTextThunk.fulfilled]: (state, { payload }) => {
      state.getEditAboutUsData = !state.getEditAboutUsData
      state.isLoading = false
    },
    [updateAboutUsTextThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getEditAboutUsValues } = editAboutUsSlice.actions
export default editAboutUsSlice.reducer
