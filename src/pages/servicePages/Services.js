import { React } from 'react'
import styled from 'styled-components'
import { Heading, List, Pagination } from '../../components/service'
import Search from '../../components/service/Search'

const Services = () => {
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
export default Services
