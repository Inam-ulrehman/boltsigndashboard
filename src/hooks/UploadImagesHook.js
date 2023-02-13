import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils/localStorage'

const initialState = {
  showRequirements: false,
  showHowToUpload: false,
  uploadImage: getItemFromLocalStorage('uploadImage') || [],
  file: null,
  isLoading: false,
}
const UploadImagesHook = ({ path }) => {
  const { emptyUploadImages } = useSelector((state) => state.function)
  const [state, setState] = useState(initialState)
  const imageRef = useRef()

  const handleChange = (e) => {
    setState({ ...state, file: e.target.files[0] })
  }

  // handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.file) {
      return toast.warning('Please Chose a file.')
    }
    setState({ ...state, isLoading: true })
    const user = getItemFromLocalStorage('user')
    try {
      const formData = new FormData()
      formData.append('file', state.file)
      const result = await customFetch.post(
        `/images/upload/${path}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      setItemInLocalStorage('uploadImage', [...state.uploadImage, result.data])
      setState({
        ...state,
        isLoading: false,
        uploadImage: [...state.uploadImage, result.data],
        file: null,
      })
      imageRef.current.value = ''
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error('Error uploading Image.')
    }
  }

  // ===========handle delete===========
  const handleDelete = async (public_id) => {
    const user = getItemFromLocalStorage('user')
    const localImages = getItemFromLocalStorage('uploadImage')
    setState({ ...state, isLoading: true })
    try {
      await customFetch.post(
        '/images/delete',
        { public_id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const newImages = localImages.filter(
        (item) => item.public_id !== public_id
      )
      setState({ ...state, isLoading: false, uploadImage: newImages })

      if (newImages.length === 0) {
        return removeItemFromLocalStorage('uploadImage')
      }
      setItemInLocalStorage('uploadImage', newImages)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.success('Error deleting Image.')
    }
  }

  // =====handle show class buttons=======
  const handleRequirements = () => {
    setState({ ...state, showRequirements: !state.showRequirements })
  }
  const handleHowToUploadImage = () => {
    setState({ ...state, showHowToUpload: !state.showHowToUpload })
  }

  // =====================================
  useEffect(() => {
    setState(initialState)
  }, [emptyUploadImages])
  return (
    <Wrapper>
      <div className='file-upload-container'>
        <input
          type='file'
          className='custom-file-input'
          ref={imageRef}
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          {'Upload File'}
        </button>
      </div>
      {/* =========Button show and hide========= */}
      <div className='heading'>
        <div className='box-1'>
          <button type='button' onClick={handleRequirements}>
            Upload Image requirements?
          </button>
          <ul className={state.showRequirements ? null : 'hide'}>
            <li>Size must be under 10MB</li>
            <li>File must be PNG format</li>
          </ul>
        </div>
        <div className='box-2'>
          <button type='button' onClick={handleHowToUploadImage}>
            How to upload Image?
          </button>
          <ul className={state.showHowToUpload ? null : 'hide'}>
            <li>
              <strong>Step 1.</strong> Choose File
            </li>
            <li>
              <strong>Step 2.</strong> {'Upload File'}
            </li>
          </ul>
        </div>
      </div>
      {/* Show uploaded images */}
      <div className='image-container'>
        {state.uploadImage?.map((item, index) => {
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
        {state.isLoading && <div className='loading'></div>}
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
`
export default UploadImagesHook

// upload image hook use========

// 1.function slice dependency to remove uploadImage. So always clear image in upload thunk.
// 2.Pass path where to save your file
// 3. everything happening in local storage only clear upload image is in function folder.
