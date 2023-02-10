import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { hideWarning } from '../features/functions/functionSlice'

const Warning = ({ action }) => {
  const dispatch = useDispatch()
  const handleYes = async () => {
    action()
    dispatch(hideWarning())
  }
  return (
    <Wrapper>
      <div className='background'></div>
      <div className='container'>
        <p>Are you sure about your action ?</p>
        <div className='button'>
          <button onClick={() => dispatch(hideWarning())} className='btn'>
            No
          </button>
          <button onClick={handleYes} className='btn'>
            YES
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  .background {
    position: fixed;
    background-color: var(--grey-8);
    height: 100vh;
    width: 100vw;
    opacity: 0.4;
    z-index: 1;
  }
  position: fixed;
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100vw;
  .container {
    z-index: 2;
    background-color: var(--white);
    padding: 1rem;
  }
  .button {
    display: flex;
    justify-content: space-around;
  }
`
export default Warning
