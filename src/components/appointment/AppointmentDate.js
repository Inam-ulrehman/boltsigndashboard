import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStateValues } from '../../features/appointment/appointmentSlice'

const AppointmentDate = () => {
  const dispatch = useDispatch()
  const { appointment } = useSelector((state) => state)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper className='btn'>
      <div>SELECT DATE</div>
      <input
        className='form-input '
        type='date'
        name='date'
        id='date'
        min={new Date().toLocaleDateString('en-ca')}
        value={appointment.date}
        onChange={handleChange}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text-align: center;
  max-width: fit-content;
  margin-left: 1rem;
  transition: var(--transition-1);
  border-radius: 0;
  height: 95px;
  margin-bottom: 1rem;
  :hover {
    transition: var(--transition-1);
    background-color: var(--primary-7);
  }
`
export default AppointmentDate
