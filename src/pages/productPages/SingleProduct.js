import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { UploadSingleProduct } from '../../components/product'
import { singleProductThunk } from '../../features/products/productSlice'
import EditUploadImagesHook from '../../hooks/images/EditUploadImagesHook'

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
      {/* <EditUploadImage /> */}
      <EditUploadImagesHook path={'editing'} />
      <UploadSingleProduct _id={_id} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .btn {
    float: right;
  }
`
export default SingleProduct
