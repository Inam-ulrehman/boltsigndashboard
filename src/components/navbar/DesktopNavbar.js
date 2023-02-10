import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { logOut } from '../../features/user/userSlice'
import Logo from '../Logo'

const DesktopNavbar = () => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <Logo />
      <ul>
        {user.isMember && (
          <li>
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
          </li>
        )}
        {user.isMember ? (
          <li onClick={() => dispatch(logOut())}>
            <Link to='/'>
              <FaSignOutAlt /> LogOut
            </Link>
          </li>
        ) : (
          <li>
            <Link to='/'>
              <FaSignInAlt /> LogIn
            </Link>
          </li>
        )}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  z-index: 5;
  overflow: hidden;
  box-shadow: var(--shadow-2);
  height: 3.2rem;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100vw;
  ul {
    display: flex;
    margin-right: 1rem;
    li {
      margin-top: -5px;
      a {
        padding: 1rem;
        color: var(--black);
        transition: var(--transition);
        :hover {
          background-color: var(--primary-5);
          color: var(--white);
        }
      }
    }
  }
  /* nav active */
  .active {
    background-color: var(--primary-5);
    color: var(--white);
  }
`
export default DesktopNavbar
