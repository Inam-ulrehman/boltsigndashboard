import React, { useEffect } from 'react'
import { useState } from 'react'

import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../../components/FormInput'
import SingleOrderUserCreateNotes from './SingleOrderUserCreateNotes'
import SingleOrderUserNotesHolder from './SingleOrderUserNotesHolder'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import GooglePlacesHook from '../../hooks/GooglePlacesHook'
const genderValue = [
  'male',
  'female',
  'transgender',
  'non-binary/non-conforming',
  'prefer not to respond',
]
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
  isLoading: false,
  refreshData: false,
}
const SingleOrderUser = ({ _id }) => {
  const [state, setState] = useState(initialState)
  // handle Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.name || !state.email) {
      toast.error('Please Provide Name and Email.')
    }
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.post(`/auth/users/${_id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setState({ ...state, isLoading: false })
      toast.success(result.statusText)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data.msg)
    }
  }

  // handle change
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  // fetch Data=====
  const fetchSingleUser = async () => {
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch(`/auth/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (result.data.phone === null) {
        delete result.data.phone
      }
      setState({ ...state, isLoading: false, ...result.data })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error.response)
    }
  }

  const cbFunction = () => {
    setState({ ...state, refreshData: !state.refreshData })
  }
  // use Effect=
  useEffect(() => {
    fetchSingleUser()
    // eslint-disable-next-line
  }, [state.refreshData])

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
      <div className='single-user'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='box-1'>
            {/* name  */}
            <FormInput
              name='name'
              value={state?.name}
              onChange={handleChange}
            />
            {/* lastName  */}
            <FormInput
              name='lastName'
              label='Last Name'
              value={state?.lastName}
              onChange={handleChange}
            />
            {/* date of birth */}
            <div className='date-input'>
              <FormInput
                label={'Date Of Birth'}
                name='dateOfBirth'
                type='date'
                value={state?.dateOfBirth ? state.dateOfBirth : ''}
                onChange={handleChange}
              />
            </div>
            {/* gender */}
            <div className='gender'>
              <label htmlFor='gender'>Gender</label>
              <select
                name='gender'
                value={state?.gender}
                onChange={handleChange}
              >
                {genderValue.map((item, index) => {
                  return (
                    <option
                      select={state?.gender?.toString()}
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                })}
              </select>
            </div>
            {/* phone */}
            <FormInput
              name='phone'
              type='number'
              value={state.phone === null ? '' : state.phone}
              onChange={handleChange}
            />
            {/* email */}
            <FormInput
              name='email'
              value={state?.email}
              onChange={handleChange}
            />
          </div>
          {/* ====================Box Divider=============*/}
          <div className='box-2'>
            <GooglePlacesHook />
            <div className='box-2-inline'>
              {/* apartment  */}
              <FormInput
                name='apartment'
                label={'Apartment Number'}
                placeholder={'#'}
                value={state?.apartment}
                onChange={handleChange}
              />
              {/* houseNo/buildingNo  */}
              <FormInput
                name='house'
                placeholder={'#'}
                label={'House / Building Number'}
                value={state?.house}
                onChange={handleChange}
              />
            </div>
            {/* street*/}
            <FormInput
              name='street'
              label={'Street Address'}
              value={state?.street}
              onChange={handleChange}
            />
            <div className='box-2-inline'>
              {/* city  */}
              <FormInput
                name='city'
                value={state?.city}
                onChange={handleChange}
              />
              {/* province */}
              <FormInput
                name='province'
                value={state?.province}
                onChange={handleChange}
              />
            </div>
            {/* country */}
            <div className='box-2-inline'>
              <FormInput
                name='country'
                value={state?.country}
                onChange={handleChange}
              />
              {/* postalCode */}
              <FormInput
                name='postalCode'
                label='Postal Code'
                value={state?.postalCode}
                onChange={handleChange}
              />
            </div>

            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
      <hr />
      <SingleOrderUserCreateNotes _id={_id} cbFunction={cbFunction} />

      <hr />
      <SingleOrderUserNotesHolder notes={state.notes} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .single-user {
    form {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      max-width: 80vw;
      label {
        text-transform: uppercase;
      }
      .date-input {
        input {
          text-transform: uppercase;
        }
      }
      select {
        text-transform: uppercase;
      }
      .gender {
        padding: 5px 0;
        display: grid;
      }
      .box-2-inline {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
      }
    }
  }
`
export default SingleOrderUser
