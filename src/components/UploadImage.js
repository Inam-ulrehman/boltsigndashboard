import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
import { getUserFromLocalStorage } from '../utils/localStorage'

const initialState = {
  showRequirements: false,
  showHowToUpload: false,
}
const UploadImage = ({ path, cbFunction, state, setState, imageTitle }) => {
  const [file, setFile] = useState(null)
  const [value, setValue] = useState(initialState)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    setState({ ...state, isLoading: true })
    const user = getUserFromLocalStorage()
    try {
      const formData = new FormData()
      formData.append('file', file)
      setFile(null)
      const result = await customFetch.post(`${path}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setState({ ...state, isLoading: false })
      cbFunction(result)
      toast.success('Image Updated.')
      return
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error('Image is not uploaded.')
      console.log(error)
    }
  }

  // =====handle show class buttons=======
  const handleRequirements = (e) => {
    e.preventDefault()
    setValue({ ...value, showRequirements: !value.showRequirements })
  }
  const handleHowToUploadImage = (e) => {
    e.preventDefault()
    setValue({ ...value, showHowToUpload: !value.showHowToUpload })
  }

  // =====================================

  return (
    <Wrapper>
      <div className='file-upload-container'>
        <input
          type='file'
          className='custom-file-input'
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          {imageTitle ? imageTitle : 'Upload File'}
        </button>
      </div>
      {/* =========Button show and hide========= */}
      <div className='heading'>
        <div className='box-1'>
          <button type='button' onClick={handleRequirements}>
            Upload Image requirements?
          </button>
          <ul className={value.showRequirements ? null : 'hide'}>
            <li>Size must be under 10MB</li>
            <li>File must be PNG format</li>
          </ul>
        </div>
        <div className='box-2'>
          <button type='button' onClick={handleHowToUploadImage}>
            How to upload Image?
          </button>
          <ul className={value.showHowToUpload ? null : 'hide'}>
            <li>
              <strong>Step 1.</strong> Choose File
            </li>
            <li>
              <strong>Step 2.</strong> {imageTitle ? imageTitle : 'Upload File'}
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  .heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    button {
      background: var(--primary-5);
      color: var(--white);
      border: transparent;
      transition: var(--transition-1);
      :hover {
        background: var(--primary-7);
        cursor: pointer;
      }
    }
    ul {
      margin: 0;
      margin-top: -5px;
      background-color: var(--grey-3);
    }
    .box-1,
    .box-2 {
      margin: 0 auto;
    }
  }
  .hide {
    display: none;
  }
`
export default UploadImage
