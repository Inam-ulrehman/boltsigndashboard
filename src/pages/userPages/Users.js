import React from 'react'
import styled from 'styled-components'
import { Heading, List, Pagination, Search } from '../../components/user'

const Users = () => {
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
export default Users
