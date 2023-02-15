import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  clearState,
  getStateValues,
  uploadProductThunk,
} from '../../features/products/productSlice'
import { getItemFromLocalStorage } from '../../utils/localStorage'
import InputHolder from './InputHolder'

const UploadSingleProduct = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = product
    const uploadImage = getItemFromLocalStorage('uploadImage')

    if (uploadImage === null) {
      return toast.warning('Please upload Image.')
    }
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }
    const data = { ...product, uploadImage: uploadImage }
    delete data['_id']
    dispatch(uploadProductThunk(data))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  useEffect(() => {
    dispatch(clearState())
    // eslint-disable-next-line
  }, [])
  return (
    <InputHolder
      product={product}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default UploadSingleProduct
