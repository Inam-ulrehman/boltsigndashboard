import React from 'react'
import styled from 'styled-components'
import { address } from '../../utils/data'

const Address = () => {
  return (
    <Wrapper className='boxDesign'>
      <h3 className='title'>Contact US</h3>
      {address.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.title} : </p>
            <a href={item.titleInfo} target={item.target}>
              {item.titleText}
            </a>
          </div>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  p,
  a {
    margin: 0;
    display: inline;
  }
  a {
    color: var(--white);
    transition: var(--transition);
    padding: 0.3rem 1rem;
    border-radius: var(--radius-1);
    :hover {
      cursor: pointer;
      background-color: var(--primary-7);
    }
  }
`
export default Address
