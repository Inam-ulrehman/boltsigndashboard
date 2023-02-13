import React from 'react'
import styled from 'styled-components'
import { UploadSingleProduct } from '../../components/product'
import UploadImagesHook from '../../hooks/UploadImagesHook'

const UploadProduct = () => {
  return (
    <Wrapper>
      <div className='box'>
        <strong>Step-. </strong>
        <p>Click Chose File after click upload file.</p>
      </div>
      <UploadImagesHook path={'testProducts'} />
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Upload your product Details and submit.</p>
      </div>
      <UploadSingleProduct />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .box {
    display: flex;
    strong {
      margin-left: 1rem;
    }
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
`
export default UploadProduct
