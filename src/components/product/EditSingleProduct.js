import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  editProductThunk,
  getStateValues,
} from '../../features/products/productSlice'
import InputHolder from './InputHolder'

const EditSingleProduct = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = product
    const { uploadImage } = product
    if (uploadImage.length < 1) {
      return toast.warning('You must have One picture.')
    }
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }
    dispatch(editProductThunk(product))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  return (
    <InputHolder
      product={product}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditSingleProduct
