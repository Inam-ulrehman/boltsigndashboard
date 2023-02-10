import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  // Search
  searchPhone: '',
  searchEmail: '',
  searchOrderId: '',
  searchStripeId: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',

  // ======Single Order
  deleteId: '',
  updateId: '',
  refreshData: false,
  deleteMany: [],
  isLoading: false,
}

export const orderThunk = createAsyncThunk(
  'order/orderThunk',
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
// Get All Orders
export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/admin/orders?phone=${state?.searchPhone}&email=${state?.searchEmail}&_id=${state?.searchOrderId}&payment_intent=${state?.searchStripeId}&sort=${state?.sort}&page=${state?.page}&limit=${state?.limit}`,
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
// ==== Delete Single Order====

export const deleteSingleOrderThunk = createAsyncThunk(
  'order/deleteSingleOrderThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.delete(`admin/orders/${_id}`, {
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
// ==== DeleteOrders ====

export const deleteManyOrdersThunk = createAsyncThunk(
  'contact/deleteManyOrdersThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`/admin/orders`, data, {
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
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    // clear state
    clearState: (state, { payload }) => {
      // Search
      state.searchPhone = ''
      state.searchEmail = ''
      state.searchOrderId = ''
      state.searchStripeId = ''
      // pagination
      state.page = 1
      state.limit = 10
      state.sort = '-createdAt'

      // ======Single Order
      state.deleteId = ''
      state.updateId = ''
    },
    // state value
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
    [orderThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [orderThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [orderThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // Get All Orders
    [getOrdersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getOrdersThunk.fulfilled]: (state, { payload }) => {
      state.list = payload.result
      state.count = payload.totalOrders
      state.isLoading = false
    },
    [getOrdersThunk.rejected]: (state, { payload }) => {
      state.list = []
      state.count = 0

      state.isLoading = false
    },
    // === Delete Single Order
    [deleteSingleOrderThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteSingleOrderThunk.fulfilled]: (state, { payload }) => {
      toast.success('Order deleted.')
      state.refreshData = !state.refreshData
      state.isLoading = false
    },
    [deleteSingleOrderThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many Orders LIST
    [deleteManyOrdersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyOrdersThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyOrdersThunk.rejected]: (state, { payload }) => {
      console.log(payload)
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { clearState, createFunction, getStateValues, next, prev, index } =
  orderSlice.actions
export default orderSlice.reducer
