import React from 'react'
import styled from 'styled-components'
import List from '../order/List'

const NewRegisterOrders = () => {
  return (
    <>
      <Wrapper>
        <div className='title'>Recent Orders</div>
        <div className='title-underline'></div>
        <List />
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  padding: 10px;
  max-height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  box-shadow: var(--shadow-3);
  transition: var(--transition);
  :hover {
    box-shadow: var(--shadow-4);
    cursor: pointer;
  }
  margin: 10px;
  background-color: var(--white);
  .title-underline {
    margin-top: 5px;
  }
`
export default NewRegisterOrders
