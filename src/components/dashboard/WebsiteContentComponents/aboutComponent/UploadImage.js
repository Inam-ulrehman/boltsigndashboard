import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  deleteImageThunk,
  getAboutUsData,
  uploadImageThunk,
} from '../../../../features/aboutUs/aboutUsSlice'

const UploadImage = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const { uploadImage, isLoading } = useSelector((state) => state.aboutUs)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    if (uploadImage.length >= 1) {
      return toast.warning('Only One Picture Required.')
    }
    const formData = new FormData()
    formData.append('file', file)
    dispatch(uploadImageThunk(formData))
    dispatch(getAboutUsData())
    setFile(null)
  }
  // handle Delete
  const handleDelete = (public_id) => {
    dispatch(deleteImageThunk(public_id))
  }
  return (
    <Wrapper>
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Upload Image for About Us Card.</p>
      </div>
      <div className='file-upload-container'>
        <input
          type='file'
          className='custom-file-input'
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <div className='image-container'>
        {uploadImage.map((item, index) => {
          return (
            <div className='container' key={index}>
              <div className='image-holder'>
                <img src={item.url} alt='product' />
              </div>
              <div className='btn-container'>
                <button
                  onClick={() => handleDelete(item.public_id)}
                  className='btn btn-block'
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
        {isLoading && <div className='loading'></div>}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  margin-left: 1rem;
  .box {
    display: flex;
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
  .image-container {
    display: flex;
    flex-wrap: wrap;

    .container {
      max-width: 150px;
      max-height: 150px;
      overflow: hidden;
      text-align: center;
      border: 2px solid var(--primary-5);
      margin: 0.5rem;
      .image-holder {
        max-width: 110px;
      }
      img {
        width: 100%;
        margin-bottom: -7px;
      }
      .btn {
        border-radius: 0;
      }
    }
  }
  .file-upload-container {
    text-align: center;
    input {
      border: 2px solid var(--primary-5);
    }
  }
`

export default UploadImage
