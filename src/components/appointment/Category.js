import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getStateValues } from '../../features/appointment/appointmentSlice'
import { customFetch } from '../../utils/axios'
const initialState = {
  uniqueCategories: [],
  isLoading: false,
}
const Category = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  const fetchData = async () => {
    try {
      const response = await customFetch.get('/products/static')
      const result = response.data.products.map((item) => item.category)
      const uniqueCategories = [...new Set(result)]
      setState({ ...state, uniqueCategories })
      return response.data
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <select
        name='category'
        id='category'
        value={state.category}
        onChange={handleChange}
      >
        <option value=''>SELECT CATEGORY</option>
        {state.uniqueCategories?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  select {
    max-width: fit-content;
  }
`
export default Category
