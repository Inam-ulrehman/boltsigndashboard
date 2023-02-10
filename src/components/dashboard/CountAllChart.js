import React from 'react'
import { useSelector } from 'react-redux'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import styled from 'styled-components'

const CountAllChart = () => {
  const { product, order, contact, user } = useSelector((state) => state)

  const data = [
    {
      name: 'Products',
      value: product.count,
    },
    {
      name: 'users',
      value: user.count,
    },
    {
      name: 'Orders',
      value: order.count,
    },
    {
      name: 'contact',
      value: contact.count,
    },
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Wrapper>
      <PieChart width={200} height={250}>
        <Tooltip />
        <Pie
          data={data}
          cx={100}
          cy={80}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className='text-holder'>
        <strong style={{ color: `#0088FE` }}>PRODUCTS</strong>
        <strong style={{ color: `#00C49F` }}>USERS</strong>
        <strong style={{ color: `#FFBB28` }}>ORDERS</strong>
        <strong style={{ color: `#FF8042` }}>CONTACTS</strong>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  .text-holder {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    text-align: center;

    position: absolute;
    bottom: 0;
  }
`

export default CountAllChart
