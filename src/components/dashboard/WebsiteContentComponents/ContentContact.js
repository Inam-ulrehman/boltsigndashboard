import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import FormInput from '../../FormInput'
const user = getUserFromLocalStorage()

const initialState = {
  address: '',
  googleLocation: '',
  mobileNumber: '',
  landLine: '',
  email: '',
  isLoading: false,
}
const ContentContact = () => {
  const [state, setState] = useState(initialState)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await customFetch.post('/contentContact', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })

      toast.success(result.statusText)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  const getData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/contentContact')
      setState({ ...state, isLoading: false })
      setState(result?.data?.contentContact)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data)
    }
  }
  useEffect(() => {
    getData()
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
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        {/* Address */}
        <div>
          <FormInput
            name={'address'}
            onChange={handleChange}
            value={state.address}
          />
        </div>
        {/* Google location */}
        <div>
          <FormInput
            label={'Google Location'}
            name={'googleLocation'}
            onChange={handleChange}
            value={state.googleLocation}
          />
        </div>
        {/* mobileNumber */}
        <div className='number'>
          <FormInput
            label={'Mobile Number'}
            name={'mobileNumber'}
            type={'number'}
            onChange={handleChange}
            value={state.mobileNumber}
          />
        </div>
        {/* landLine */}
        <div className='number'>
          <FormInput
            label={'Land Line'}
            name={'landLine'}
            type={'number'}
            onChange={handleChange}
            value={state.landLine}
          />
        </div>
        {/* email */}
        <div>
          <FormInput
            name={'email'}
            onChange={handleChange}
            value={state.email}
          />
        </div>
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .form {
    max-width: 80vw;
  }
  .number {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`
export default ContentContact
