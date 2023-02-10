import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { clearState, getStateValues } from '../../features/user/userSlice'
import GooglePlacesHook from '../../hooks/GooglePlacesHook'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import FormInput from '../FormInput'

const AdminRegisterUpdateUserInput = ({ method, _id }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const genderValue = [
    'male',
    'female',
    'transgender',
    'non-binary/non-conforming',
    'prefer not to respond',
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user.name || !user.email) {
      return toast.error('Please Provide Name and Email.')
    }

    const { token } = getUserFromLocalStorage()
    try {
      const result = await method(`/auth/users${_id ? `/${_id}` : ''}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!_id) {
        dispatch(clearState())
      }
      toast.success(result.statusText)
    } catch (error) {
      console.log(error)
      toast.warning(error.response?.data?.msg)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }

  return (
    <>
      <Wrapper className='form' onSubmit={handleSubmit}>
        <div className='box-1'>
          {/* name  */}
          <FormInput name='name' value={user?.name} onChange={handleChange} />
          {/* lastName  */}
          <FormInput
            name='lastName'
            label='Last Name'
            value={user?.lastName}
            onChange={handleChange}
          />
          {/* date of birth */}
          <div className='date-input'>
            <FormInput
              label={'Date Of Birth'}
              name='dateOfBirth'
              type='date'
              value={user?.dateOfBirth ? user.dateOfBirth : ''}
              onChange={handleChange}
            />
          </div>
          {/* gender */}
          <div className='gender'>
            <label htmlFor='gender'>Gender</label>
            <select name='gender' value={user?.gender} onChange={handleChange}>
              {genderValue.map((item, index) => {
                return (
                  <option
                    select={user?.gender?.toString()}
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
            value={user.phone === null ? '' : user.phone}
            onChange={handleChange}
          />
          {/* email */}
          <FormInput name='email' value={user?.email} onChange={handleChange} />
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
              value={user?.apartment}
              onChange={handleChange}
            />
            {/* houseNo/buildingNo  */}
            <FormInput
              name='house'
              placeholder={'#'}
              label={'House / Building Number'}
              value={user?.house}
              onChange={handleChange}
            />
          </div>
          {/* street*/}
          <FormInput
            name='street'
            label={'Street Address'}
            value={user?.street}
            onChange={handleChange}
          />
          <div className='box-2-inline'>
            {/* city  */}
            <FormInput name='city' value={user?.city} onChange={handleChange} />
            {/* province */}
            <FormInput
              name='province'
              value={user?.province}
              onChange={handleChange}
            />
          </div>
          {/* country */}
          <div className='box-2-inline'>
            <FormInput
              name='country'
              value={user?.country}
              onChange={handleChange}
            />
            {/* postalCode */}
            <FormInput
              name='postalCode'
              label='Postal Code'
              value={user?.postalCode}
              onChange={handleChange}
            />
          </div>

          <button className='btn' type='submit'>
            Submit
          </button>
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.form`
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
`

export default AdminRegisterUpdateUserInput
