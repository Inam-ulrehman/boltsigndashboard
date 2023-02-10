import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DashboardSidebarNav } from '../../utils/data'

const SideBar = () => {
  const [value, setValue] = useState(0)

  return (
    <Wrapper>
      {DashboardSidebarNav.map((item, index) => {
        return (
          <li
            className={index === value ? 'active-li' : null}
            onClick={() => setValue(index)}
            key={index}
          >
            <Link
              className={index === value ? 'active-a' : null}
              to={item.path}
            >
              {item.title}
            </Link>
          </li>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.ul`
  background: var(--grey-2);
  margin: 0;
  height: 100%;
  li {
    transition: var(--transition);
    :hover {
      background-color: var(--primary-5);

      cursor: pointer;
      a {
        color: var(--white);
        margin-left: 5px;
      }
    }
    a {
      padding: 0.5rem 1rem;

      display: block;
      color: var(--primary-8);
      transition: var(--transition);
    }
  }
  .active-li {
    background-color: var(--primary-5);
  }
  .active-a {
    color: var(--white);
  }
`
export default SideBar
