import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import SideBar from '../../components/dashboard/SideBar'

const Dashboard = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='Welcome to your Dashboard.' />
        <link rel='canonical' href='/Dashboard' />
      </Helmet>
      <div className='box box-1-sidebar'>
        <SideBar />
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
export default Dashboard
