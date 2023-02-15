import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  clearState,
  getStateValues,
  uploadServiceThunk,
} from '../../features/services/serviceSlice'
import { getItemFromLocalStorage } from '../../utils/localStorage'
import InputHolder from './InputHolder'

const UploadSingleService = () => {
  const dispatch = useDispatch()
  const { service } = useSelector((state) => state)
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = service
    const uploadImage = getItemFromLocalStorage('uploadImage')
    if (uploadImage.length <= 0) {
      return toast.warning('Please upload Image.')
    }
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }
    const data = { ...service, uploadImage: uploadImage }
    delete data['_id']
    dispatch(uploadServiceThunk(data))
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
      service={service}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default UploadSingleService
