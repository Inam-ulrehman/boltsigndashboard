import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { SelectedAppointment } from '../../components/appointment'
import AppointmentDate from '../../components/appointment/AppointmentDate'
import AvailableSlots from '../../components/appointment/AvailableSlots'
import Category from '../../components/appointment/Category'
import CustomerDetails from '../../components/appointment/CustomerDetails'
import { clearState } from '../../features/appointment/appointmentSlice'
import { createAppointmentThunk } from '../../features/appointment/appointmentSlice'

const RegisterAppointment = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearState())
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
      <CustomerDetails action={createAppointmentThunk} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .category-appointment {
    display: flex;
  }
`
export default RegisterAppointment
