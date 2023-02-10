import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { getStateValues } from '../../features/user/userSlice'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  note: '',
  isLoading: false,
}
const CreateUserNotes = () => {
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const { _id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, isLoading: true })
    const { token } = getUserFromLocalStorage()
    try {
      const result = await customFetch.patch(`/auth/users/${_id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success(result.statusText)
      setState({ ...state, isLoading: false, note: '' })
      dispatch(
        getStateValues({ name: 'refreshSingleUser', value: Math.random() })
      )
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data.msg)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form note'>
        <label className='form-label' htmlFor='note'>
          Add customer note for future References.
        </label>

        <textarea
          className='form-textarea'
          name='note'
          id='note'
          cols='30'
          rows='10'
          value={state.note}
          onChange={handleChange}
        ></textarea>
        <button className='btn' type='submit'>
          Add Note
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .note {
    max-width: 80vw;
  }
`
export default CreateUserNotes
