import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import ContentSideBar from './WebsiteContentComponents/ContentSideBar'

const WebsiteContent = () => {
  return (
    <Wrapper>
      <div className='box box-1-sidebar'>
        <ContentSideBar />
      </div>
      <div className='box box-2-dashboard'>
        <Outlet />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  display: flex;
  .box {
  }
  .box-1-sidebar {
    width: 200px;
  }
  .box-2-dashboard {
    width: 100%;
  }
`
export default WebsiteContent
