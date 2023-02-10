import React from 'react'
import styled from 'styled-components'
import { List, Pagination, Search } from '../../components/appointment'
import Heading from '../../components/appointment/Heading'

const Appointment = () => {
  return (
    <Wrapper>
      <Heading />
      <Search />
      <List />
      <Pagination />
    </Wrapper>
  )
}
const Wrapper = styled.div``

export default Appointment
