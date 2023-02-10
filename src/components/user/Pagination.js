import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { index, next, prev } from '../../features/user/userSlice'
import PaginationHook from '../../hooks/PaginationHook'

const Pagination = () => {
  const { page, count, limit } = useSelector((state) => state.user)

  return (
    <Wrapper className='title'>
      <PaginationHook
        page={page}
        count={count}
        limit={limit}
        next={next}
        prev={prev}
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
