import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { updateAboutUsImageThunk } from '../../../../features/aboutUs/editAboutUsSlice'

const initialState = {
  showRequirements: false,
  showHowToUpload: false,
}

const EditUploadImage = () => {
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.editAboutUs)
  const [file, setFile] = useState(null)
  const [value, setValue] = useState(initialState)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    const formData = new FormData()
    formData.append('file', file)

    dispatch(updateAboutUsImageThunk({ formData, _id }))
    setFile(null)
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
          Change Picture
        </button>
      </div>
      {/* ==========show warning======== */}
      <div className='heading'>
        <div className='box-1'>
          <button type='button' onClick={handleRequirements}>
            Upload Image requirements?
          </button>
          <ul className={value.showRequirements ? null : 'hide'}>
            <li>Size must be under 10MB</li>
            <li>File must be Png format</li>
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
              <strong>Step 2.</strong> {'Upload File'}
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  border-bottom: 2px solid black;
  height: 120px;
  .heading {
    margin-top: -1rem;
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
    .box-1,
    .box-2 {
      margin-top: 1rem;
      height: 100px;
    }
    .box-2 {
      margin-left: 2rem;
      button {
        width: 185px;
      }
    }
    ul {
      margin: 0;
      margin-top: -5px;
      background-color: var(--grey-3);
    }
  }
  .hide {
    display: none;
  }
`
export default EditUploadImage
