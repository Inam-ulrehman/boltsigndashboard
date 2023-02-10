import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getUploadProductAmount } from '../../features/products/productSlice'

const initialState = {
  dollars: '',
  cent: '00',
}

const AmountUploadSingleProduct = () => {
  const dispatch = useDispatch()
  const { amount } = useSelector((state) => state.product)
  const [state, setState] = useState(initialState)
  const totalAmount = state.dollars + state.cent

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  useEffect(() => {
    dispatch(getUploadProductAmount(totalAmount))
    // eslint-disable-next-line
  }, [state.dollars, state.cent])

  // use effect to clear amount from state

  useEffect(() => {
    if (amount.length === 0) {
      setState({ ...state, dollars: '', cent: '00' })
    }
    // eslint-disable-next-line
  }, [amount])
  return (
    <Wrapper className='amount'>
      <label className='form-label' htmlFor='amount'>
        Amount
      </label>
      <div className='input'>
        <input
          placeholder='DOLLARS'
          className='form-input'
          type='number'
          name='dollars'
          value={state.dollars}
          onChange={handleChange}
        />
        <input
          placeholder='CENTS'
          className='form-input'
          type='number'
          name='cent'
          value={state.cent}
          onChange={handleChange}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .input {
    display: flex;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
    input {
      max-width: 120px;
    }
  }
`
export default AmountUploadSingleProduct
