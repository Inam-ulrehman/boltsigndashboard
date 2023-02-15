import React from 'react'
import styled from 'styled-components'
import { UploadSingleService } from '../../components/service'
import UploadImagesHook from '../../hooks/images/UploadImagesHook'

const UploadService = () => {
  return (
    <Wrapper>
      <div className='box'>
        <strong>Step-. </strong>
        <p>Click Chose File after click upload file.</p>
      </div>
      <UploadImagesHook path={'testServices'} />
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Upload your service Details and submit.</p>
      </div>
      <UploadSingleService />
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
export default UploadService
