import { React } from 'react'
import styled from 'styled-components'
import { Heading, List, Pagination } from '../../components/product'
import Search from '../../components/product/Search'

const Products = () => {
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
export default Products
