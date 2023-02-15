import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { addObjectInState } from '../../utils/helper'
import {
  getUserFromLocalStorage,
  removeItemFromLocalStorage,
} from '../../utils/localStorage'
import { emptyUploadImagesArray } from '../functions/functionSlice'

const initialState = {
  // Search
  searchTitle: '',
  searchCategory: '',
  searchSubCategory: '',
  searchServiceId: '',
  searchFeature: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',

  // single service
  // ==========
  _id: '',
  title: '',
  amount: '',
  category: '',
  subCategory: '',
  inStock: true,
  feature: '',
  totalStock: 10,
  uploadImage: [],
  value: [],
  description: '',
  // ===========
  servicesList: [],
  serviceDeleteId: '',
  getServices: false,
  deleteMany: [],
  refreshData: '',
  isLoading: false,
}

// ========== Upload Service =======
export const uploadServiceThunk = createAsyncThunk(
  'service/uploadServiceThunk',
  async (service, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.post(
        '/services/uploadService',
        service,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      thunkAPI.dispatch(emptyUploadImagesArray())
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Get all services ========
export const getServicesThunk = createAsyncThunk(
  'service/getServicesThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/services?title=${state?.searchTitle}&category=${state?.searchCategory}&subCategory=${state?.searchSubCategory}&_id=${state?.searchServiceId}&feature=${state?.searchFeature}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`
      )
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Delete services ========
export const deleteServicesThunk = createAsyncThunk(
  'service/deleteServicesThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.delete(
        `/services/singleService/${_id}`,
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
// ==== Delete Many Services====

export const deleteManyServicesThunk = createAsyncThunk(
  'service/deleteManyServicesThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`services`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Get Single Service====
export const singleServiceThunk = createAsyncThunk(
  'service/singleServiceThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/services/singleService/${_id}`)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// edit Service
export const editServiceThunk = createAsyncThunk(
  'service/editServiceThunk',
  async (service, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(
        `/services/singleService/${service._id}`,
        service,
        {
          headers: {
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
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getUploadServiceAmount: (state, { payload }) => {
      state.amount = payload
    },
    // clear state
    clearState: (state, { payload }) => {
      // Search
      state.searchTitle = ''
      state.searchCategory = ''
      state.searchSubCategory = ''
      state.searchServiceId = ''
      state.searchFeature = ''
      // pagination
      state.page = 1
      state.limit = 10
      state.sort = '-createdAt'
      // single service
      state._id = ''
      state.title = ''
      state.amount = ''
      state.category = ''
      state.subCategory = ''
      state.inStock = true
      state.feature = false
      state.totalStock = 10
      state.uploadImage = []
      state.value = []
      state.description = ''
    },
    // ========
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },

    // pagination
    next: (state, { payload }) => {
      state.page = state.page + 1
    },
    prev: (state, { payload }) => {
      state.page = state.page - 1
    },
    index: (state, { payload }) => {
      const index = Number(payload)
      state.page = index
    },
  },
  extraReducers: {
    // ====== upload Service ======
    [uploadServiceThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadServiceThunk.fulfilled]: (state, { payload }) => {
      state.title = ''
      state.amount = ''
      state.category = ''
      state.subCategory = ''
      state.description = ''
      state.uploadImage = []
      removeItemFromLocalStorage('uploadImage')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      toast.success('Service is uploaded.')
      state.isLoading = false
    },
    [uploadServiceThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Get All Services ======
    [getServicesThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getServicesThunk.fulfilled]: (state, { payload }) => {
      const { totalOrders, result } = payload
      state.list = result
      state.count = totalOrders
      // delete this
      state.isLoading = false
    },
    [getServicesThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete Services ======
    [deleteServicesThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteServicesThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      toast.success('service is deleted.')
      state.isLoading = false
    },
    [deleteServicesThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many Services LIST
    [deleteManyServicesThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyServicesThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyServicesThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Get Single Service
    [singleServiceThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [singleServiceThunk.fulfilled]: (state, { payload }) => {
      addObjectInState(payload, state)
      state.isLoading = false
    },
    [singleServiceThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // ========== Edit Single service
    [editServiceThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [editServiceThunk.fulfilled]: (state, { payload }) => {
      toast.success('Service is updated.')
      state.isLoading = false
    },
    [editServiceThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
  },
})
export const {
  clearState,
  next,
  prev,
  index,
  createFunction,
  getStateValues,
  getUploadServiceAmount,
} = serviceSlice.actions
export default serviceSlice.reducer
