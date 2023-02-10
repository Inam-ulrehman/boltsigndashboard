import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import {
  getItemFromLocalStorage,
  getUserFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../utils/localStorage'

const localUploadImage = getItemFromLocalStorage('aboutUsImage')

const initialState = {
  name: '',
  profession: '',
  paragraph: '',
  uploadImage: localUploadImage || [],
  aboutUsList: [],
  nbHits: '',
  aboutUsDeleteId: '',
  getAboutUs: false,
  isLoading: false,
}

export const aboutUsThunk = createAsyncThunk(
  'aboutUs/aboutUsThunk',
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
// ========== Upload image =======
export const uploadImageThunk = createAsyncThunk(
  'aboutUs/uploadImageThunk',
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
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========== Delete Image =======
export const deleteImageThunk = createAsyncThunk(
  'aboutUs/deleteImageThunk',
  async (public_id, thunkAPI) => {
    const data = { public_id: public_id }
    const user = getUserFromLocalStorage()
    try {
      await customFetch.post('/contentAboutUs/deleteImage', data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      return public_id
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========== Upload AboutUs =======
export const uploadAboutUsThunk = createAsyncThunk(
  'aboutUs/uploadAboutUsThunk',
  async (aboutUs, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        '/contentAboutUs/uploadContentAboutUs',
        aboutUs,
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
// ========= Get aboutUs ========
export const getAboutUsThunk = createAsyncThunk(
  'aboutUs/getAboutUsThunk',
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get('/contentAboutUs/admin', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Delete aboutUss ========
export const deleteAboutUsThunk = createAsyncThunk(
  'aboutUs/deleteAboutUsThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.delete(
        `/contentAboutUs/admin/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getAboutUsDeleteId: (state, { payload }) => {
      state.aboutUsDeleteId = payload
    },
    // ==========inUse============
    getAboutUsValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    getAboutUsData: (state, { payload }) => {
      state.getAboutUs = !state.getAboutUs
    },
  },
  extraReducers: {
    [aboutUsThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [aboutUsThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [aboutUsThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // ====== Upload Image ======
    [uploadImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadImageThunk.fulfilled]: (state, { payload }) => {
      state.uploadImage = [...state.uploadImage, payload]
      const uploadImage = state.uploadImage
      const name = 'aboutUsImage'
      setItemInLocalStorage(name, uploadImage)
      state.isLoading = false
    },
    [uploadImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete Image ======
    [deleteImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteImageThunk.fulfilled]: (state, { payload }) => {
      const newData = state.uploadImage.filter(
        (item) => item.public_id !== payload
      )
      state.uploadImage = newData
      const name = 'aboutUsImage'
      setItemInLocalStorage(name, state.uploadImage)
      state.isLoading = false
    },
    [deleteImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== upload AboutUs ======
    [uploadAboutUsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadAboutUsThunk.fulfilled]: (state, { payload }) => {
      removeItemFromLocalStorage('aboutUsImage')
      state.name = ''
      state.profession = ''
      state.paragraph = ''
      state.uploadImage = []
      state.getAboutUs = !state.getAboutUs
      toast.success('uploaded.')
      state.isLoading = false
    },
    [uploadAboutUsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Get AboutUs ======
    [getAboutUsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getAboutUsThunk.fulfilled]: (state, { payload }) => {
      const { contentAboutUs, nbHits } = payload
      state.aboutUsList = contentAboutUs
      state.nbHits = nbHits

      state.isLoading = false
    },
    [getAboutUsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete AboutUs ======
    [deleteAboutUsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteAboutUsThunk.fulfilled]: (state, { payload }) => {
      state.getAboutUs = !state.getAboutUs
      toast.success('aboutUs is deleted.')
      state.isLoading = false
    },
    [deleteAboutUsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  createFunction,
  getAboutUsValues,
  getAboutUsDeleteId,
  getAboutUsData,
} = aboutUsSlice.actions
export default aboutUsSlice.reducer
