import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const DashboardTotalCard = ({ total, navigateLink, title }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(navigateLink)
  }
  return (
    <Wrapper onClick={handleClick} className='container'>
      <div className='box'>
        <div className='heading'>
          <p className='title'>{title}</p>
          <div className=' title-underline'></div>
        </div>
        <div className='body'>
          <span>Total: </span>
          <span>
            <strong>{total}</strong>
          </span>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

  .box {
    background-color: var(--white);
    margin: 10px;
    margin-top: 0;
    border-top: 2px solid var(--primary-2);
    .heading {
      p {
        margin-top: 0;
        text-transform: uppercase;
      }
    }
    box-shadow: var(--shadow-2);
    padding: 5px;
    transition: var(--transition);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-4);
    }
  }
  .body {
    display: flex;
    justify-content: space-evenly;
  }
`
export default DashboardTotalCard
