import React from 'react'
import styled from 'styled-components'
import { Heading, List } from '../../components/contact'
import Pagination from '../../components/contact/Pagination'
import Search from '../../components/contact/Search'

const Contact = () => {
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
export default Contact
