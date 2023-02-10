import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import FormInput from '../../FormInput'

const initialState = {
  startTime: '',
  endTime: '',
  available: '',
  isLoading: false,
}
const EditSlot = () => {
  const [state, setState] = useState(initialState)
  const { _id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.patch(`/slots/${_id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { startTime, endTime, available } = result.data.slot
      setState({ ...state, startTime, endTime, available, isLoading: false })
      toast.success('Result updated.')
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }

  const fetchData = async (e) => {
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.get(`/slots/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { startTime, endTime, available } = result.data.slot
      setState({ ...state, startTime, endTime, available, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <FormInput
          name='startTime'
          value={state.startTime}
          onChange={handleChange}
        />
        <FormInput
          name='endTime'
          value={state.endTime}
          onChange={handleChange}
        />
        <div className='available'>
          <input
            // onClick={() => dispatch(changeFeatureValue())}
            type='checkbox'
            name='available'
            value={state.available}
            onChange={() => setState({ ...state, available: !state.available })}
            defaultChecked={state.available}
          />
          <label htmlFor='available'>
            {state.available ? `Slot is available.` : `Slot is Not available.`}
          </label>
        </div>
        <button className='btn' type='submit'>
          Update
        </button>
      </form>
    </div>
  )
}

export default EditSlot
