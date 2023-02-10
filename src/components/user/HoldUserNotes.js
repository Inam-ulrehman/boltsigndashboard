import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { formatDate } from '../../utils/helper'

const HoldUserNotes = () => {
  const { notes } = useSelector((state) => state.user)
  return (
    <Wrapper>
      {notes
        ?.map((item) => {
          return (
            <div className='notes-container' key={item._id}>
              <div className='title'>
                Created Date: <strong> {formatDate(item.createdAt)}</strong>
              </div>
              <p>{item.note}</p>
            </div>
          )
        })
        .reverse()}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .notes-container {
    padding: 1rem;
    margin: 1rem auto;
    padding: 0;
    max-width: 80vw;
    box-shadow: var(--shadow-1);
    .title {
      background: var(--primary-1);
    }
    p {
      padding: 1rem;
    }
  }
`
export default HoldUserNotes
