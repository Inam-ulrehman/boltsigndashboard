import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserInLocalStorage,
} from '../../utils/localStorage'
import { toast } from 'react-toastify'
import { addObjectInState } from '../../utils/helper'

const user = getUserFromLocalStorage()
const initialState = {
  // register user
  name: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'male',
  phone: '',
  email: '',
  // Address details
  apartment: '',
  house: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',

  // Authentication User
  token: user?.token || '',
  userName: user?.user?.name || '',
  isMember: user?.isAdmin ? true : false,
  forgetPassword: false,
  // Search User
  searchName: '',
  searchPhone: '',
  searchEmail: '',
  searchAddress: '',
  searchPostalCode: '',
  searchId: '',
  sort: '-createdAt',
  page: 1,
  limit: 10,
  // List of user
  list: [],
  count: '',
  // single User
  createdAt: '',
  updatedAt: '',
  notes: [],
  role: '',
  verified: '',
  updateId: '',
  refreshSingleUser: 0,
  // delete Id
  deleteId: '',
  refreshData: false,
  // deleteMany
  deleteMany: [],
  isLoading: false,
}

export const userThunk = createAsyncThunk(
  'user/userThunk',
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
// Register a user
export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/register', user)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// verify a user
export const verifyUserThunk = createAsyncThunk(
  'user/verifyUserThunk',
  async (id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/auth/verify/${id}`)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Login a user
export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/login', user)
      const token = response.data.token
      const isAdmin = await customFetch.post(
        '/auth/verifyAdmin',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      response.data.isAdmin = isAdmin.data.msg

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Forget Password Link
export const forgetPasswordLinkThunk = createAsyncThunk(
  'user/forgetPasswordLinkThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/forgetPassword', user)

      return response.data.msg
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Forget Password change
export const forgetPasswordChangeThunk = createAsyncThunk(
  'user/forgetPasswordChangeThunk',
  async (user, thunkAPI) => {
    const { id, password } = user
    try {
      const response = await customFetch.post(`/auth/forgetPassword/${id}`, {
        password,
      })

      return response.data.msg
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// change password
export const changePasswordThunk = createAsyncThunk(
  'user/changePasswordThunk',
  async (password, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        `/auth/changePassword`,
        password,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data.msg
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// ========= Get users ========
export const getUsersThunk = createAsyncThunk(
  'user/getUsersThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/auth/users?name=${state?.searchName}&phone=${state?.searchPhone}&email=${state?.searchEmail}&postalCode=${state?.searchPostalCode}&street=${state?.searchAddress}&_id=${state?.searchId}&limit=${state?.limit}&sort=${state?.sort}&page=${state?.page}`,
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
// ========= Get Single user ========
export const getSingleUserThunk = createAsyncThunk(
  'user/getSingleUserThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(`/auth/users/${_id}`, {
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
// Delete Users
export const deleteUserThunk = createAsyncThunk(
  'user/deleteUserThunk',
  async (_id, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.delete(`/auth/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Delete Many APPOINTMENTS====Start

export const deleteManyUsersThunk = createAsyncThunk(
  'user/deleteManyUsersThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`/auth/users`, data, {
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
// ==== Delete Many APPOINTMENTS====END

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },

    clearState: (state, { payload }) => {
      state.name = ''
      state.lastName = ''
      state.gender = 'male'
      state.dateOfBirth = ''
      state.phone = ''
      state.email = ''
      state.apartment = ''
      state.house = ''
      state.street = ''
      state.city = ''
      state.province = ''
      state.postalCode = ''
      // clear search
      state.searchName = ''
      state.searchPhone = ''
      state.searchEmail = ''
      state.searchAddress = ''
      state.searchPostalCode = ''
      state.searchId = ''
      state.sort = '-createdAt'
      state.page = 1
      state.limit = 10
    },
    logOut: (state, { payload }) => {
      removeUserFromLocalStorage('user')
      state.isMember = false
      toast.success('See you soon.')
    },
    forgetPasswordToggle: (state, { payload }) => {
      state.forgetPassword = !state.forgetPassword
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    getAddressValues: (state, { payload }) => {
      addObjectInState(payload, state)
    },

    //======pagination=======
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
      state.isLoading = false
    },
    // Register a user
    [registerUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [registerUserThunk.fulfilled]: (state, { payload }) => {
      setUserInLocalStorage(payload)
      state.token = payload.token
      state.userName = payload.user.name
      state.isMember = payload.isAdmin
      state.isLoading = false
      toast.success(`Welcome ${payload.user.name.toUpperCase()}.`)
    },
    [registerUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // login a user
    [loginUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [loginUserThunk.fulfilled]: (state, { payload }) => {
      setUserInLocalStorage(payload)
      state.token = payload.token
      state.userName = payload.user.name
      state.isMember = payload.isAdmin
      state.isLoading = false
      toast.success(`Welcome back ${payload.user.name.toUpperCase()}.`)
    },
    [loginUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // verify a user
    [verifyUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [verifyUserThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false

      toast.success(payload)
    },
    [verifyUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Forget Password Link
    [forgetPasswordLinkThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [forgetPasswordLinkThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [forgetPasswordLinkThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Forget Password change
    [forgetPasswordChangeThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [forgetPasswordChangeThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [forgetPasswordChangeThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Change Password
    [changePasswordThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [changePasswordThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [changePasswordThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // get all users
    [getUsersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getUsersThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { result, total } = payload
      state.list = result
      state.count = total
    },
    [getUsersThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // get Single user
    [getSingleUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getSingleUserThunk.fulfilled]: (state, { payload }) => {
      const dateOfBirth = payload.dateOfBirth?.split('T')[0]
      payload.dateOfBirth = dateOfBirth
      addObjectInState(payload, state)
      state.isLoading = false
    },
    [getSingleUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // delete User
    [deleteUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteUserThunk.fulfilled]: (state, { payload }) => {
      toast.success('User Deleted.')
      state.deleteId = ''
      state.refreshData = !state.refreshData

      state.isLoading = false
    },
    [deleteUserThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many APPOINTMENTS LIST
    [deleteManyUsersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyUsersThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyUsersThunk.rejected]: (state, { payload }) => {
      console.log(payload)
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  getAddressValues,
  getStateValues,
  clearState,
  next,
  prev,
  index,
  createFunction,
  logOut,
  forgetPasswordToggle,
} = userSlice.actions
export default userSlice.reducer
