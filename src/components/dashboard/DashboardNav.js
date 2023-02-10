import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { dashboardNavLink } from '../../utils/data'

const DashboardNav = () => {
  const [value, setValue] = useState(0)
  const { user } = useSelector((state) => state)
  return (
    <Wrapper>
      <ul>
        {dashboardNavLink.map((item, index) => {
          return (
            <li onClick={() => setValue(index)} key={index}>
              <Link
                className={index === value ? 'btn active' : 'btn'}
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>

      <p>
        Welcome, <strong>{user.userName.toUpperCase()}</strong>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ul {
    display: flex;
    li {
      padding: 0 1rem;
      a {
        color: white;
      }
    }
  }
  p {
    color: white;
    background: var(--primary-5);
    padding: 0 1rem;
    strong {
      border-bottom: 2px solid var(--primary-8);
    }
  }

  background-color: var(--grey-2);
  .btn {
    background: var(--primary-8);
    :hover {
      background: var(--primary-5);
    }
  }
  .active {
    background: var(--primary-5);
  }
`

export default DashboardNav
