import React from 'react'
import styled from 'styled-components'
import { UploadSingleProduct } from '../../components/product'
import UploadImagesHook from '../../hooks/UploadImagesHook'

const UploadProduct = () => {
  return (
    <Wrapper>
      <UploadImagesHook path={'testProducts'} />
      <UploadSingleProduct />
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default UploadProduct
