import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SelectedAppointment } from '../../components/appointment'
import AppointmentDate from '../../components/appointment/AppointmentDate'
import AvailableSlots from '../../components/appointment/AvailableSlots'
import Category from '../../components/appointment/Category'
import CustomerDetails from '../../components/appointment/CustomerDetails'
import {
  clearState,
  getStateValues,
  singleAppointmentThunk,
  updateAppointmentThunk,
} from '../../features/appointment/appointmentSlice'

const SingleAppointment = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    dispatch(getStateValues({ name: 'updateId', value: _id }))
    dispatch(clearState())
    dispatch(singleAppointmentThunk(_id))
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <div className='category-appointment'>
        <Category />
        <AppointmentDate />
        <SelectedAppointment />
      </div>
      <AvailableSlots />
      <CustomerDetails action={updateAppointmentThunk} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .category-appointment {
    display: flex;
  }
`
export default SingleAppointment
