import React from 'react'
import styled from 'styled-components'
import Heading from '../../components/order/Heading'
import List from '../../components/order/List'
import Pagination from '../../components/order/Pagination'
import Search from '../../components/order/Search'

const Orders = () => {
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
export default Orders
