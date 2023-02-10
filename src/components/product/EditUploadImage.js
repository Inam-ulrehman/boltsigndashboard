import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  editLocalImage,
  editProductThunk,
} from '../../features/products/editProductSlice'
import { deleteImageThunk } from '../../features/products/productSlice'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
const user = getUserFromLocalStorage()

// =========function start here=====

const EditUploadImage = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { editProduct } = useSelector((state) => state)
  const { uploadImage } = editProduct

  // handle Change
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      setIsLoading(true)
      const response = await customFetch.post(
        '/products/uploadImage',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const newUploadImage = [...uploadImage, response.data]
      const newProduct = { ...editProduct, uploadImage: newUploadImage }
      dispatch(editProductThunk(newProduct))
      dispatch(editLocalImage(newUploadImage))
      setFile(null)
      setIsLoading(false)
    } catch (error) {
      console.log(error.response)
      setIsLoading(true)
    }
  }

  // handle Delete
  const handleDelete = async (public_id) => {
    if (editProduct.uploadImage.length === 1) {
      return toast.error('Must have one picture.')
    }
    const image = uploadImage.filter((item) => item.public_id !== public_id)
    dispatch(editLocalImage(image))
    const newProduct = { ...editProduct, uploadImage: image }
    dispatch(editProductThunk(newProduct))
    dispatch(deleteImageThunk(public_id))
  }
  if (isLoading)
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )

  return (
    <Wrapper>
      {/* ==== Uploading Image */}
      <div className='file-upload-container '>
        <input type='file' onChange={handleChange} />
        <button
          disabled={isLoading}
          className='btn'
          type='submit'
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
      {/* ==== Showing image Delete image */}
      <div className='image-container'>
        {uploadImage?.map((item, index) => {
          return (
            <div className='container' key={index}>
              <div className='img-box'>
                <img src={item.secure_url} alt={editProduct.title} />
              </div>
              <button
                onClick={() => handleDelete(item.public_id)}
                type='button'
                className='btn btn-block'
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;

  padding: 1rem;
  .container {
    max-width: 110px;
    box-shadow: var(--shadow-1);
    margin-right: 1rem;
  }
  button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .img-box {
    text-align: center;
    border: 2px solid var(--primary-5);
    border-bottom: transparent;
    overflow: hidden;
  }
  img {
    width: 100px;
  }
  /* file upload container */
  .file-upload-container {
    justify-content: center;
    display: flex;
    input {
      border: 2px solid var(--primary-5);
      :hover {
        cursor: pointer;
      }
    }
  }
  /* image container */
  .image-container {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
`
export default EditUploadImage
