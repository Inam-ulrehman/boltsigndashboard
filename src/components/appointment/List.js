import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import {
  deleteManyAppointmentsThunk,
  deleteAppointmentThunk,
  getStateValues,
} from '../../features/appointment/appointmentSlice'
import Warning from '../Warning'
import {
  showDeleteAllWarning,
  showWarning,
} from '../../features/functions/functionSlice'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import DeleteAllWarning from '../DeleteAllWarning'

const List = () => {
  const dispatch = useDispatch()
  const { appointment, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }
  // =======deleteMany  =======
  const handleSelectAll = () => {
    if (appointment.list.length === appointment.deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: appointment.list }))
  }
  const handleSelectOne = (_id) => {
    if (appointment.deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: appointment.deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = appointment.list.find((item) => item._id === _id)
    const newValue = [...appointment.deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======
  if (appointment.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <ListWrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning
          action={() => dispatch(deleteAppointmentThunk(appointment.deleteId))}
        />
      )}
      {/* show Delete All warning */}
      {warningHolder.deleteAllWarning && (
        <DeleteAllWarning
          action={() =>
            dispatch(deleteManyAppointmentsThunk(appointment.deleteMany))
          }
        />
      )}

      {/* show delete all button */}
      <div className='delete-all-button'>
        {appointment.deleteMany.length > 0 && (
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
                checked={
                  appointment.deleteMany.length === appointment.list.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {appointment.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      appointment.deleteMany.find(
                        (items) => items._id === item._id
                      )
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.slot?.startTime}</td>
                <td>{item.slot?.endTime}</td>
                <td>{formatDate(item.date.split('T')[0])}</td>
                <td>
                  <Link
                    className='btn'
                    to={`/dashboard/appointment/${item._id}`}
                  >
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
