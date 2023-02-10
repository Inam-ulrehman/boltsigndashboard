import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { EditSingleProduct, EditUploadImage } from '../../components/product'
import { singleProductThunk } from '../../features/products/editProductSlice'

const SingleProduct = () => {
  const dispatch = useDispatch()

  const { _id } = useParams()

  useEffect(() => {
    dispatch(singleProductThunk(_id))
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <Link className='btn' to={'/dashboard/products'}>
        Back to products
      </Link>
      <EditUploadImage />
      <EditSingleProduct />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .btn {
    float: right;
  }
`
export default SingleProduct
