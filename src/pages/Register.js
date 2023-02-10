import { React, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  forgetPasswordToggle,
  loginUserThunk,
} from '../features/user/userSlice'
import ForgetPassword from '../components/user/ForgetPassword'
import FormInput from '../components/FormInput'

const initialState = {
  email: '',
  password: '',
  forgetPassword: false,
  isLoading: false,
}

const Register = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const [state, setState] = useState(initialState)
  const { email, password, isLoading } = state

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      return toast.error('Please enter your email.')
    }
    if (!password) {
      return toast.error('Please enter your Password.')
    }
    dispatch(loginUserThunk({ email, password }))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  // handle Forget Password
  const handleForgetPassword = (e) => {
    dispatch(forgetPasswordToggle())
  }

  if (isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  if (user.isMember) {
    return <Navigate to={'/dashboard'} />
  }
  return (
    <Wrapper>
      {/* forget Password */}
      {user.forgetPassword ? (
        <ForgetPassword />
      ) : (
        // login form
        <form className='form' onSubmit={handleSubmit}>
          {/* Email */}
          <FormInput
            name='email'
            type={'email'}
            value={email}
            onChange={handleChange}
          />
          {/* Password */}
          <FormInput
            name='password'
            type={'password'}
            value={password}
            onChange={handleChange}
          />
          <div className='buttons'>
            <button
              className='btn'
              type='button'
              onClick={handleForgetPassword}
            >
              Forget Password
            </button>
            <button className='btn' type='submit'>
              Login
            </button>
          </div>
        </form>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  form {
    margin-top: 6rem;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`
export default Register
