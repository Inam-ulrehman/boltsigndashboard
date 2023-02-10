import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeadingWrapper from '../../Wrapper/dashboard/HeadingWrapper'

const Heading = () => {
  const { count, page } = useSelector((state) => state.product)
  return (
    <HeadingWrapper className='container-heading'>
      <Link className='btn' to={'/dashboard/upload'}>
        New Product
      </Link>
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
