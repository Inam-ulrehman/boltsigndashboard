import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate, formatPrice } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Warning from '../Warning'
import {
  showDeleteAllWarning,
  showWarning,
} from '../../features/functions/functionSlice'
import {
  deleteManyOrdersThunk,
  deleteSingleOrderThunk,
  getStateValues,
} from '../../features/order/orderSlice'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import DeleteAllWarning from '../DeleteAllWarning'

const List = () => {
  const dispatch = useDispatch()
  const { order, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  // =======deleteMany  =======START
  const handleSelectAll = () => {
    if (order.list.length === order.deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: order.list }))
  }
  const handleSelectOne = (_id) => {
    if (order.deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: order.deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = order.list.find((item) => item._id === _id)
    const newValue = [...order.deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======END
  return (
    <ListWrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning
          action={() => dispatch(deleteSingleOrderThunk(order.deleteId))}
        />
      )}
      {/* show Delete All warning */}
      {warningHolder.deleteAllWarning && (
        <DeleteAllWarning
          action={() => dispatch(deleteManyOrdersThunk(order.deleteMany))}
        />
      )}

      {/* show delete all button */}
      <div className='delete-all-button'>
        {order.deleteMany.length > 0 && (
          <div className='delete-all-button'>
            <button className='btn' onClick={handleDeleteMany}>
              Delete Selected
            </button>
          </div>
        )}
      </div>
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={order.deleteMany.length === order.list.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>payment</th>
            <th>Total</th>
            <th>status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {order.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      order.deleteMany.find((items) => items._id === item._id)
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td className='image-holder'>
                  {item.cart.map((item, index) => (
                    <img
                      key={index}
                      src={item.uploadImage[0].secure_url}
                      alt=''
                    />
                  ))}
                </td>
                <td>
                  {item.cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        height: '105px',
                        display: 'grid',
                        alignItems: `center`,
                        borderBottom: '2px solid var(--grey-3)',
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </td>
                <td>
                  {item.cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        height: '105px',
                        display: 'grid',
                        alignItems: `center`,
                        borderBottom: '2px solid var(--grey-3)',
                      }}
                    >
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  {item.cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        height: '105px',
                        display: 'grid',
                        alignItems: `center`,
                        borderBottom: '2px solid var(--grey-3)',
                      }}
                    >
                      {item.totalStock}
                    </div>
                  ))}
                </td>
                <td>{item.redirect_status}</td>
                <td>{formatPrice(item.total)}</td>
                <td>{item.shipment ? `completed` : `Processing`}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <Link className='btn' to={`/dashboard/orders/${item._id}`}>
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn'
                  >
                    <RiDeleteBack2Line />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </ListWrapper>
  )
}

export default List
