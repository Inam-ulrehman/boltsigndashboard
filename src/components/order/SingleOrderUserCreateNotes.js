import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  note: '',
  isLoading: false,
}
const SingleOrderUserCreateNotes = ({ cbFunction, _id }) => {
  const [state, setState] = useState(initialState)

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
      cbFunction()
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

  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
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
export default SingleOrderUserCreateNotes
