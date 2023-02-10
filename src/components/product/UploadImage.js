import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  deleteImageThunk,
  uploadImageThunk,
} from '../../features/products/productSlice'
const initialState = {
  showRequirements: false,
  showHowToUpload: false,
}

const UploadImage = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const { product } = useSelector((state) => state)
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
    dispatch(uploadImageThunk(formData))
    setFile(null)
  }
  // handle Delete
  const handleDelete = (public_id) => {
    dispatch(deleteImageThunk(public_id))
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
      <div className='box'>
        <strong>Step-1. </strong>
        <p>Upload your product Images.</p>
      </div>
      <div className='file-upload-container'>
        <hr />
        <input
          type='file'
          className='custom-file-input'
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          Upload
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

      <div className='image-container'>
        {product.uploadImage.map((item, index) => {
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
        {product.isLoading && <div className='loading'></div>}
      </div>
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
  display: grid;
  margin-left: 1rem;
  .image-container {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;

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
  /* ===========button show */
  .heading {
    height: 5.5rem;
    display: grid;
    margin: 0 auto;
    width: 448px;
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
