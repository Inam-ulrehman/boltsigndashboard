import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardTotalCard } from '../../components/cards'
import { getProductsThunk } from '../../features/products/productSlice'
import { getOrdersThunk } from '../../features/order/orderSlice'
import { getContactThunk } from '../../features/contact/contactSlice'
import { getUsersThunk } from '../../features/user/userSlice'
import { appointmentThunk } from '../../features/appointment/appointmentSlice'
import {
  CountAllChart,
  NewContactUs,
  NewRegisterOrders,
  NewRegisterUsers,
  ProductChart,
} from '../../components/dashboard'

const DashboardHome = () => {
  const { product, order, contact, user, appointment } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk(product))
    dispatch(getOrdersThunk(order))
    dispatch(getContactThunk(contact))
    dispatch(getUsersThunk(user))
    dispatch(appointmentThunk(appointment))

    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <div className='container'>
        <div className='total-card'>
          {/* Product Card */}
          <DashboardTotalCard
            title={`Products`}
            total={product.count}
            navigateLink={'/dashboard/products'}
          />
          {/* Order Card */}
          <DashboardTotalCard
            title={`Orders`}
            total={order.count}
            navigateLink={'/dashboard/orders'}
          />
          {/* Contact Card */}
          <DashboardTotalCard
            title={`Contacts`}
            total={contact.count}
            navigateLink={'/dashboard/Contact'}
          />
          {/* User Card */}
          <DashboardTotalCard
            title={`Users`}
            total={user?.count}
            navigateLink={'/dashboard/users'}
          />
          {/* Appointment Card */}
          <DashboardTotalCard
            title={`Appointments`}
            total={appointment?.count}
            navigateLink={'/dashboard/appointment'}
          />
        </div>
        <div className='charts'>
          <ProductChart />
          <div className='total-chart'>
            <CountAllChart />
          </div>
        </div>
        <div className='new-users'>
          <NewRegisterUsers />
          <NewRegisterOrders />
          <NewContactUs />
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .charts {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 10px;
  }
  .total-chart {
    background-color: white;
    span {
      background-color: var(--white);
    }
  }

  .total-card {
    display: flex;
  }

  .recharts-wrapper {
    background-color: var(--white);
    box-shadow: var(--shadow-3);
    transition: var(--transition);
    :hover {
      box-shadow: var(--shadow-4);
    }
  }

  @media (max-width: 1024px) {
  }
`
export default DashboardHome
