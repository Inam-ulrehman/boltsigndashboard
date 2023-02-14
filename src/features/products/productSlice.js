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
  searchProductId: '',
  searchFeature: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',

  // single product
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
  productsList: [],
  productDeleteId: '',
  getProducts: false,
  deleteMany: [],
  refreshData: '',
  isLoading: false,
}

// ========== Upload Product =======
export const uploadProductThunk = createAsyncThunk(
  'product/uploadProductThunk',
  async (product, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.post(
        '/products/uploadProduct',
        product,
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
// ========= Get all products ========
export const getProductsThunk = createAsyncThunk(
  'product/getProductsThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/products?title=${state?.searchTitle}&category=${state?.searchCategory}&subCategory=${state?.searchSubCategory}&_id=${state?.searchProductId}&feature=${state?.searchFeature}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`
      )
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Delete products ========
export const deleteProductsThunk = createAsyncThunk(
  'product/deleteProductsThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.delete(
        `/products/singleProduct/${_id}`,
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
// ==== Delete Many Products====

export const deleteManyProductsThunk = createAsyncThunk(
  'product/deleteManyProductsThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`products`, data, {
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
// ==== Get Single Product====
export const singleProductThunk = createAsyncThunk(
  'product/singleProductThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/products/singleProduct/${_id}`)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// edit Product
export const editProductThunk = createAsyncThunk(
  'product/editProductThunk',
  async (product, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(
        `/products/singleProduct/${product._id}`,
        product,
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
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getUploadProductAmount: (state, { payload }) => {
      state.amount = payload
    },
    // clear state
    clearState: (state, { payload }) => {
      // Search
      state.searchTitle = ''
      state.searchCategory = ''
      state.searchSubCategory = ''
      state.searchProductId = ''
      state.searchFeature = ''
      // pagination
      state.page = 1
      state.limit = 10
      state.sort = '-createdAt'
      // single product
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
    // ====== upload Product ======
    [uploadProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadProductThunk.fulfilled]: (state, { payload }) => {
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
      toast.success('Product is uploaded.')
      state.isLoading = false
    },
    [uploadProductThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Get All Products ======
    [getProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getProductsThunk.fulfilled]: (state, { payload }) => {
      const { totalOrders, result } = payload
      state.list = result
      state.count = totalOrders
      // delete this
      state.isLoading = false
    },
    [getProductsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete Products ======
    [deleteProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteProductsThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      toast.success('product is deleted.')
      state.isLoading = false
    },
    [deleteProductsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many Products LIST
    [deleteManyProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyProductsThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyProductsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Get Single Product
    [singleProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [singleProductThunk.fulfilled]: (state, { payload }) => {
      addObjectInState(payload, state)
      state.isLoading = false
    },
    [singleProductThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // ========== Edit Single product
    [editProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [editProductThunk.fulfilled]: (state, { payload }) => {
      toast.success('Product is updated.')
      state.isLoading = false
    },
    [editProductThunk.rejected]: (state, { payload }) => {
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
  getUploadProductAmount,
} = productSlice.actions
export default productSlice.reducer
