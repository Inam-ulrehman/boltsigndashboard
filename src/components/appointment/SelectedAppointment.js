import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { isObjectEmpty } from '../../utils/helper'

const SelectedAppointment = () => {
  const { slot } = useSelector((state) => state.appointment)
  if (isObjectEmpty(slot)) {
    return
  }
  return (
    <Wrapper className='day-body'>
      <div className='active'>
        {slot.startTime} - {slot.endTime}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    max-width: fit-content;
    margin: 1rem;
    padding: 1rem;
    background-color: var(--green-light);
  }
`
export default SelectedAppointment
