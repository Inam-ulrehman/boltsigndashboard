import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  editServiceThunk,
  getStateValues,
} from '../../features/services/serviceSlice'
import InputHolder from './InputHolder'

const EditSingleService = () => {
  const dispatch = useDispatch()
  const { service } = useSelector((state) => state)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = service
    const { uploadImage } = service
    if (uploadImage.length < 1) {
      return toast.warning('You must have One picture.')
    }
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }
    dispatch(editServiceThunk(service))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  return (
    <InputHolder
      service={service}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditSingleService
