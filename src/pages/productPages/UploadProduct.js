import React from 'react'
import styled from 'styled-components'
import { UploadImage, UploadSingleProduct } from '../../components/product'

const UploadProduct = () => {
  return (
    <Wrapper>
      <UploadImage />
      <UploadSingleProduct />
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default UploadProduct
