import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../../components/FormInput'
import {
  clearState,
  getStateValues,
} from '../../features/appointment/appointmentSlice'
import { isObjectEmpty } from '../../utils/helper'

const CustomerDetails = ({ action }) => {
  const dispatch = useDispatch()
  const { name, email, phone, note, category, date, slot, updateId } =
    useSelector((state) => state.appointment)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || isObjectEmpty(slot) || !name || !email || !phone) {
      return toast.warning('Please fill all details.')
    }
    if (updateId === '') {
      dispatch(clearState())
    }
    dispatch(
      action({ name, email, phone, note, category, date, slot, updateId })
    )
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      <div className='customer-details'>
        <form className='form' onSubmit={handleSubmit}>
          <div>
            {/* name */}
            <FormInput name='name' value={name} onChange={handleChange} />
            {/* email */}
            <FormInput name='email' value={email} onChange={handleChange} />
            {/* phone */}
            <FormInput
              name='phone'
              type='number'
              value={phone}
              onChange={handleChange}
            />
          </div>
          {/* ===========BOX Divider==== */}
          {/* Note */}
          <div>
            <label className='form-label' htmlFor='note'>
              Appointment Note
            </label>
            <textarea
              className='form-textarea'
              name='note'
              id='note'
              cols='30'
              rows='10'
              value={note}
              onChange={handleChange}
            ></textarea>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  form {
    min-width: 80vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`
export default CustomerDetails
