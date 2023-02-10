import React, { useEffect, useRef, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import { customFetch } from '../../utils/axios'

const initialState = {
  data: [],
}
const ProductChart = () => {
  const [state, setState] = useState(initialState)
  const containerWidthRef = useRef()
  const width = containerWidthRef.current?.clientWidth

  const getData = async () => {
    const result = await customFetch('/products/static')
    const products = result.data.products
    // get Categories
    const categories = [...new Set(products.map((item) => item.category))]
    //  map Categories
    const totalStock = categories.map((item) => {
      // Categories match Products
      const categoriesResult = products.filter((items) => {
        return items.category === item
      })
      // All Item stock
      const stockArray = categoriesResult.map((item) => item.totalStock)
      // Total counted item
      const totalItemsCount = categoriesResult.map((item) => item.category)

      // Add Stock
      const total = stockArray.reduce((acc, value) => {
        const count = acc + value
        return count
      }, 0)
      // Convert in data
      const finalResult = {
        category: item,
        TotalStock: total,
        TotalItems: totalItemsCount.length,
      }

      return finalResult
    })

    setState({ ...state, data: totalStock })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper ref={containerWidthRef}>
      <BarChart width={width} height={250} data={state.data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='category' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='TotalStock' fill='#8884d8' />
        <Bar dataKey='TotalItems' fill='#82ca9d' />
      </BarChart>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  line {
    display: none;
  }
`

export default ProductChart
