import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  getAboutUsValues,
  uploadAboutUsThunk,
} from '../../../../features/aboutUs/aboutUsSlice'
import FormInput from '../../../FormInput'

const UploadAboutUs = () => {
  const dispatch = useDispatch()
  const { aboutUs } = useSelector((state) => state)
  const { name, profession, paragraph, uploadImage } = aboutUs
  const handleSubmit = (e) => {
    e.preventDefault()
    if (uploadImage.length === 0) {
      return toast.warning('please upload Image First.')
    }
    if ((!name, !profession, !paragraph)) {
      return toast.warning('please enter all details.')
    }
    dispatch(uploadAboutUsThunk(aboutUs))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    dispatch(getAboutUsValues({ name, value }))
  }
  return (
    <Wrapper>
      <hr />
      <div className='box'>
        <strong>Step-3. </strong>
        <p>Fill information for about us card.</p>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <FormInput name='name' value={name} onChange={handleChange} />
        </div>
        {/* Profession */}
        <div>
          <FormInput
            name='profession'
            value={profession}
            onChange={handleChange}
          />
        </div>
        {/* paragraph */}
        <div>
          <label className='form-label' htmlFor='paragraph'>
            Paragraph
          </label>
          <textarea
            name='paragraph'
            id='paragraph'
            cols='40'
            rows='10'
            value={paragraph}
            onChange={handleChange}
          ></textarea>
        </div>
        <button onClick={handleSubmit} className='btn'>
          Submit
        </button>
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
export default UploadAboutUs
