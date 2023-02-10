import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  changeFeatureValue,
  editProductThunk,
  getEditProductValue,
} from '../../features/products/editProductSlice'
import FormInput from '../FormInput'

const EditSingleProduct = () => {
  const dispatch = useDispatch()
  const { editProduct: product } = useSelector((state) => state)

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = product
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }

    dispatch(editProductThunk(product))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getEditProductValue({ name, value }))
  }
  if (product.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
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
          <div>
            <FormInput
              placeholder={'required'}
              type={'number'}
              name={'amount'}
              value={product.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* ===============div divider========= */}
        <div className='stock'>
          {/* Stock  */}
          <div>
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
              // onClick={() => dispatch(changeFeatureValue())}
              type='checkbox'
              name='feature'
              value={product.feature}
              onChange={() => dispatch(changeFeatureValue())}
              defaultChecked={product.feature}
            />
            <label htmlFor='feature'>
              {product.feature
                ? `Product is Feature.`
                : `Product is out of Feature.`}
            </label>
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
  /* git */
  .feature {
    padding-top: 1rem;
    label {
      margin-left: 1rem;
    }
  }
`
export default EditSingleProduct
