import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { index, next, prev } from '../../features/products/productSlice'
import PaginationHook from '../../hooks/PaginationHook'

const Pagination = () => {
  const { page, count, limit } = useSelector((state) => state.product)

  return (
    <Wrapper className='title'>
      <PaginationHook
        page={page}
        count={count}
        limit={limit}
        prev={prev}
        next={next}
        index={index}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    background-color: var(--primary-8);
  }
`
export default Pagination
