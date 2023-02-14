import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../utils/localStorage'
import InputHolder from './InputHolder'

const initialState = {
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
      toast.error('Error deleting Image.')
    }
  }

  // =====================================
  useEffect(() => {
    setState(initialState)
  }, [emptyUploadImages])
  return (
    <InputHolder
      uploadImage={state.uploadImage}
      isLoading={state.isLoading}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      imageRef={imageRef}
    />
  )
}
export default UploadImagesHook

// upload image hook use========

// 1.function slice dependency 'emptyImageArrays' to remove uploadImage. So always clear image in upload thunk.
// 2.Pass path where to save your file
// 3. everything happening in local storage only clear upload image is in function folder.
