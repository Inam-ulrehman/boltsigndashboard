import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  getStateValues,
  uploadProductThunk,
} from '../../features/products/productSlice'
import FormInput from '../FormInput'
import AmountUploadSingleProduct from './AmountUploadSingleProduct'

const UploadSingleProduct = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description, uploadImage } = product
    if (uploadImage.length <= 0) {
      return toast.warning('Please upload Image.')
    }
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }
    dispatch(uploadProductThunk(product))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  return (
    <Wrapper>
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Upload your product Details and submit.</p>
      </div>
      {/* ==== VALUE INPUT */}

      {/* ====FORM INPUT */}
      <form className='form' onSubmit={handleSubmit}>
        <div>
          {/* title  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'title'}
              value={product.title}
              onChange={handleChange}
            />
          </div>

          {/* category  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'category'}
              value={product.category}
              onChange={handleChange}
            />
          </div>
          {/* amount  */}
          <AmountUploadSingleProduct />
        </div>
        {/* ===============div divider========= */}
        <div>
          {/* Stock  */}
          <div className='stock'>
            <label className='form-label' htmlFor='stock'>
              Stock
            </label>
            <select
              onChange={handleChange}
              style={{ padding: '3px' }}
              className='form-input'
              name='inStock'
              id=''
            >
              <option value='true'>Select Options</option>
              <option value='true'>In-Stock</option>
              <option value='false'>Out-Of-Stock</option>
            </select>
          </div>
          {/* subCategory  */}
          <div>
            <FormInput
              placeholder={'Optional not required.'}
              name={'subCategory'}
              value={product.subCategory}
              onChange={handleChange}
            />
          </div>
          {/* totalStock  */}
          <div>
            <FormInput
              type={'number'}
              name={'totalStock'}
              value={product.totalStock}
              onChange={handleChange}
            />
          </div>
          {/* featured */}
          <div className='feature'>
            <input
              type='checkbox'
              name='feature'
              value='true'
              onChange={handleChange}
            />
            <label htmlFor='feature'>Feature product</label>
          </div>
        </div>
        {/* ===============div divider========= */}
        <div>
          <label htmlFor='description'>Product Description</label>
          <textarea
            placeholder={'REQUIRED'}
            name='description'
            value={product.description}
            onChange={handleChange}
            id='description'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <button disabled={product.isLoading} type='submit' className='btn'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .box {
    display: flex;
    strong {
      margin-left: 1rem;
    }
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    min-width: 800px;
  }
  .stock {
    select {
      color: var(--grey-9);
    }
  }
  .feature {
    padding-top: 1rem;
    label {
      margin-left: 1rem;
    }
  }
`
export default UploadSingleProduct
