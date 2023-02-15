import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getStateValues } from '../../features/services/serviceSlice'
import FormInput from '../FormInput'

const InputHolder = ({ service, handleChange, handleSubmit }) => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      {/* ====FORM INPUT */}
      <form className='form' onSubmit={handleSubmit}>
        <div>
          {/* title  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'title'}
              value={service.title}
              onChange={handleChange}
            />
          </div>

          {/* category  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'category'}
              value={service.category}
              onChange={handleChange}
            />
          </div>
          {/* amount  */}
          <div>
            <FormInput
              placeholder={'required'}
              type='number'
              name={'amount'}
              value={service.amount}
              onChange={handleChange}
            />
          </div>
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
              value={service.subCategory}
              onChange={handleChange}
            />
          </div>
          {/* totalStock  */}
          <div>
            <FormInput
              type={'number'}
              name={'totalStock'}
              value={service.totalStock}
              onChange={handleChange}
            />
          </div>
          {/* featured */}
          <div className='feature'>
            <input
              type='checkbox'
              name='feature'
              value={service.feature}
              checked={service.feature && true}
              onChange={() =>
                dispatch(
                  getStateValues({ name: 'feature', value: !service.feature })
                )
              }
            />
            <label htmlFor='feature'>Feature service</label>
          </div>
        </div>
        {/* ===============div divider========= */}
        <div>
          <label htmlFor='description'>Service Description</label>
          <textarea
            placeholder={'REQUIRED'}
            name='description'
            value={service.description}
            onChange={handleChange}
            id='description'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <button disabled={service.isLoading} type='submit' className='btn'>
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
  .feature {
    padding-top: 1rem;
    label {
      margin-left: 1rem;
    }
  }
`
export default InputHolder
