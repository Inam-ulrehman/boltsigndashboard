import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import AdminRegisterUpdateUserInput from '../../components/user/AdminRegisterUpdateUserInput'
import { clearState } from '../../features/user/userSlice'
import { customFetch } from '../../utils/axios'

const AdminRegisterUser = () => {
  const dispatch = useDispatch()
  const method = customFetch.post

  useEffect(() => {
    dispatch(clearState())
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      <h3 className='title'>Register New User Form</h3>
      <AdminRegisterUpdateUserInput method={method} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  form {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    max-width: 80vw;
  }
`
export default AdminRegisterUser
