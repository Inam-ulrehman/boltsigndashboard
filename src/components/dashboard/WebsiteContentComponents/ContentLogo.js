import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import UploadImage from '../../UploadImage'

const initialState = {
  secure_url: '',
  isLoading: false,
}
const ContentLogo = () => {
  const [state, setState] = useState(initialState)

  const cbFunction = async (e) => {
    const secure_url = e.data.contentLogo.uploadImage.secure_url
    console.log(secure_url)
    setState({ ...state, secure_url })
  }
  const getData = async () => {
    try {
      const result = await customFetch.get('/contentLogo')
      const secure_url = result.data.contentLogo.uploadImage.secure_url
      setState({ ...state, secure_url })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <UploadImage
        path={'/contentLogo'}
        cbFunction={cbFunction}
        state={state}
        setState={setState}
      />
      <hr />
      <h3 className='title'>Website Logo </h3>
      <div className='title-underline'></div>
      <div className='imageHolder'>
        <img src={state.secure_url} alt='Logo' />
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .imageHolder {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    img {
      margin-top: 1rem;
      width: 100%;
    }
  }
`
export default ContentLogo
