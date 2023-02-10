import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../../utils/axios'
import { getUserFromLocalStorage } from '../../../../utils/localStorage'
import FormInput from '../../../FormInput'
const user = getUserFromLocalStorage()

const initialState = {
  title: '',
  paragraph: '',
  isLoading: false,
}

const AboutUsHeading = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = state.title
    const paragraph = state.paragraph
    try {
      const response = await customFetch.post(
        '/contentAboutUsTitle',
        { title, paragraph },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      toast.success(response.statusText)
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
      const response = await customFetch.get('/contentAboutUsTitle')
      const { title, paragraph } = response.data.contentAboutUsTitle

      setState({ ...state, title, paragraph, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
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
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <div className='box'>
        <strong>Step-1. </strong>
        <p>About Us Page Heading and Title.</p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className='form'>
        {/* Title */}
        <div>
          <FormInput name='title' value={state.title} onChange={handleChange} />
        </div>
        {/* Paragraph */}
        <div>
          <label htmlFor='paragraph'>paragraph</label>
          <textarea
            name='paragraph'
            id='paragraph'
            cols='40'
            rows='10'
            value={state.paragraph}
            onChange={handleChange}
          />
          <div className='title'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .box {
    display: flex;
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
`
export default AboutUsHeading
