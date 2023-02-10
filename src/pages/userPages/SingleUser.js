import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CreateUserNotes, HoldUserNotes } from '../../components/user'
import AdminRegisterUpdateUserInput from '../../components/user/AdminRegisterUpdateUserInput'
import { getSingleUserThunk } from '../../features/user/userSlice'
import { customFetch } from '../../utils/axios'

const SingleUser = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const { _id } = useParams()

  const method = customFetch.post

  useEffect(() => {
    dispatch(getSingleUserThunk(_id))
    // eslint-disable-next-line
  }, [user.refreshSingleUser])

  return (
    <Wrapper>
      <div className='single-user'>
        <AdminRegisterUpdateUserInput method={method} _id={_id} />
      </div>
      <hr />
      <CreateUserNotes />
      <hr />
      <HoldUserNotes />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .single-user {
    form {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      max-width: 80vw;
    }
  }
`
export default SingleUser
