import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  editProductThunk,
  getStateValues,
} from '../../features/products/productSlice'
import { customFetch } from '../../utils/axios'
import { getItemFromLocalStorage } from '../../utils/localStorage'
import InputHolder from './InputHolder'

const initialState = {
  file: null,
  isLoading: false,
}
const EditUploadImagesHook = ({ path }) => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)

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
      const newImages = [...product.uploadImage, result.data]
      // Add image in local state
      dispatch(getStateValues({ name: 'uploadImage', value: newImages }))
      const newProduct = { ...product, uploadImage: newImages }
      // Add image in server
      dispatch(editProductThunk(newProduct))
      setState({
        ...state,
        isLoading: false,
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
    const newImages = product.uploadImage.filter(
      (item) => item.public_id !== public_id
    )
    const user = getItemFromLocalStorage('user')
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
      dispatch(getStateValues({ name: 'uploadImage', value: newImages }))
      const newProduct = { ...product, uploadImage: newImages }
      dispatch(editProductThunk(newProduct))
      setState({ ...state, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.success('Error deleting Image.')
      // If image not deleted we still update product images.
      dispatch(getStateValues({ name: 'uploadImage', value: newImages }))
      const newProduct = { ...product, uploadImage: newImages }
      dispatch(editProductThunk(newProduct))
      setState({ ...state, isLoading: false })
    }
  }

  return (
    <InputHolder
      uploadImage={product.uploadImage}
      isLoading={state.isLoading}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      imageRef={imageRef}
    />
  )
}

export default EditUploadImagesHook

// upload image hook use========

// 1.function slice dependency 'emptyImageArrays' to remove uploadImage. So always clear image in upload thunk.
// 2.Pass path where to save your file
// 3. everything happening in local storage only clear upload image is in function folder.
