import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import FormInput from '../../FormInput'
const user = getUserFromLocalStorage()

const initialState = {
  facebook: '',
  twitter: '',
  instagram: '',
  isLoading: false,
}
const ContentSocialLinks = () => {
  const [state, setState] = useState(initialState)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await customFetch.post('/ContentSocialLinks', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })

      toast.success(result.statusText)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  const getData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/ContentSocialLinks')
      setState({ ...state, isLoading: false })
      setState(result.data.contentSocialLink)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data)
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
      <form className='form' onSubmit={handleSubmit}>
        {/* facebook */}
        <div>
          <FormInput
            name={'facebook'}
            onChange={handleChange}
            value={state.facebook}
          />
        </div>
        {/* twitter */}
        <div>
          <FormInput
            name={'twitter'}
            onChange={handleChange}
            value={state.twitter}
          />
        </div>
        {/* instagram */}
        <div>
          <FormInput
            name={'instagram'}
            onChange={handleChange}
            value={state.instagram}
          />
        </div>

        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .form {
    max-width: 80vw;
  }
`
export default ContentSocialLinks
