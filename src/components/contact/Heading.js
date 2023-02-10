import React from 'react'
import { useSelector } from 'react-redux'
import HeadingWrapper from '../../Wrapper/dashboard/HeadingWrapper'

const Heading = () => {
  const { count, page } = useSelector((state) => state.contact)
  return (
    <HeadingWrapper HeadingWrapper className='container-heading'>
      <span></span>
      <span>
        Total Results:
        <strong> {count}</strong>
      </span>
      <span>
        Page No:<strong>{page}</strong>
      </span>
    </HeadingWrapper>
  )
}

export default Heading
