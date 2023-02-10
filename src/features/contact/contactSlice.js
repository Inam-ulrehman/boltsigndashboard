import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  // Search
  searchName: '',
  searchEmail: '',
  searchPhone: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',
  // Single Contact
  refreshData: false,
  singleContact: [],
  deleteId: '',
  deleteMany: [],
  isLoading: false,
}

export const contactThunk = createAsyncThunk(
  'contact/contactThunk',
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
// ==== GET CONTACT LIST====

export const getContactThunk = createAsyncThunk(
  'contact/getContactThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.get(
        `/contacts?name=${state?.searchName}&phone=${state?.searchPhone}&email=${state?.searchEmail}&limit=${state?.limit}&sort=${state?.sort}&page=${state?.page}`,
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
// ==== GET Single CONTACT LIST====

export const getSingleContactThunk = createAsyncThunk(
  'contact/getSingleContactThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(`contacts/${_id}`, {
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
// ==== Delete Single CONTACT LIST====

export const deleteSingleContactThunk = createAsyncThunk(
  'contact/deleteSingleContactThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.delete(`contacts/${_id}`, {
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
// ==== Delete Many CONTACTS====Start

export const deleteManyContactsThunk = createAsyncThunk(
  'contact/deleteManyContactsThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`contacts`, data, {
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
// ==== Delete Many CONTACTS====END

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },

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
    [contactThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [contactThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [contactThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // === GET CONTACT LIST
    [getContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getContactThunk.fulfilled]: (state, { payload }) => {
      const { result, total } = payload
      state.list = result
      state.count = total
      state.isLoading = false
    },
    [getContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === GET Single CONTACT
    [getSingleContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getSingleContactThunk.fulfilled]: (state, { payload }) => {
      state.singleContact = payload.contacts
      state.isLoading = false
    },
    [getSingleContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Single CONTACT LIST
    [deleteSingleContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteSingleContactThunk.fulfilled]: (state, { payload }) => {
      toast.success('Form deleted.')
      state.refreshData = !state.refreshData
      state.isLoading = false
    },
    [deleteSingleContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many CONTACTS LIST
    [deleteManyContactsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyContactsThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyContactsThunk.rejected]: (state, { payload }) => {
      console.log(payload)
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  getStateValues,
  next,
  prev,
  index,
  createFunction,
  getContactDeleteId,
} = contactSlice.actions
export default contactSlice.reducer
