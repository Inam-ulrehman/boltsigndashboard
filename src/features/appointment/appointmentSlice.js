import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  // register
  name: '',
  email: '',
  phone: '',
  note: '',
  category: '',
  date: new Date().toLocaleDateString('en-ca'),
  availableTimes: '',
  slot: {},
  // search
  searchName: '',
  searchEmail: '',
  searchPhone: '',
  searchDate: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',
  searchConfirmed: false,
  // delete Id
  deleteId: '',
  // update Id
  updateId: '',
  refreshData: false,
  refreshSlotData: false,
  // deleteMany
  deleteMany: [],
  isLoading: false,
}

// Get appointments
export const appointmentThunk = createAsyncThunk(
  'appointment/appointmentThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.get(
        `/appointments?name=${state?.searchName}&email=${state?.searchEmail}&phone=${state?.searchPhone}&date=${state?.searchDate}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`,
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

// Create Appointments
export const createAppointmentThunk = createAsyncThunk(
  'appointment/createAppointmentThunk',
  async (state, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.post('/appointments', state, {
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

// Delete Appointments
export const deleteAppointmentThunk = createAsyncThunk(
  'appointment/deleteAppointmentThunk',
  async (_id, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.delete(`/appointments/${_id}`, {
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
// Single Appointment
export const singleAppointmentThunk = createAsyncThunk(
  'appointment/singleAppointmentThunk',
  async (_id, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.get(`/appointments/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data.appointment
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// update Appointments
export const updateAppointmentThunk = createAsyncThunk(
  'appointment/updateAppointmentThunk',
  async (state, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.patch(
        `/appointments/${state.updateId}`,
        state,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Delete Many APPOINTMENTS====Start

export const deleteManyAppointmentsThunk = createAsyncThunk(
  'appointment/deleteManyAppointmentsThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.patch(`appointments`, data, {
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
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    clearState: (state, { payload }) => {
      // register
      state.name = ''
      state.email = ''
      state.email = ''
      state.phone = ''
      state.note = ''
      state.category = ''
      state.date = new Date().toLocaleDateString('en-ca')
      state.availableTimes = ''
      state.slot = {}
      // search
      state.searchName = ''
      state.searchEmail = ''
      state.searchPhone = ''
      state.searchDate = ''
      // pagination
      state.page = 1
      state.limit = 10
      state.sort = '-createdAt'
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
    [appointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [appointmentThunk.fulfilled]: (state, { payload }) => {
      state.list = payload.result
      state.count = payload.totalOrders
      state.isLoading = false
    },
    [appointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },

    // create Appointment
    [createAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [createAppointmentThunk.fulfilled]: (state, { payload }) => {
      toast.success('Appointment created.')
      state.refreshSlotData = !state.refreshSlotData
    },
    [createAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },

    // delete Appointment
    [deleteAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteAppointmentThunk.fulfilled]: (state, { payload }) => {
      toast.success('Appointment Deleted.')
      state.deleteId = ''
      state.refreshData = !state.refreshData

      state.isLoading = false
    },
    [deleteAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // single Appointment
    [singleAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [singleAppointmentThunk.fulfilled]: (state, { payload }) => {
      state.name = payload.name
      state.email = payload.email
      state.phone = payload.phone
      state.note = payload.note
      state.slot = payload.slot
      state.date = payload.date.split('T')[0]
      state.category = payload.category
      state.isLoading = false
    },
    [singleAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // update Appointment
    [updateAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [updateAppointmentThunk.fulfilled]: (state, { payload }) => {
      state.refreshSlotData = !state.refreshSlotData
      toast.success('Updated.')
      state.isLoading = false
    },
    [updateAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Many APPOINTMENTS LIST
    [deleteManyAppointmentsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteManyAppointmentsThunk.fulfilled]: (state, { payload }) => {
      state.refreshData = !state.refreshData
      state.deleteMany = []
      toast.success(payload.msg)
      state.isLoading = false
    },
    [deleteManyAppointmentsThunk.rejected]: (state, { payload }) => {
      console.log(payload)
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getStateValues, next, prev, index, clearState } =
  appointmentSlice.actions
export default appointmentSlice.reducer
