import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Warning from '../Warning'
import {
  showDeleteAllWarning,
  showWarning,
} from '../../features/functions/functionSlice'
import {
  deleteManyContactsThunk,
  deleteSingleContactThunk,
  getStateValues,
} from '../../features/contact/contactSlice'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import DeleteAllWarning from '../DeleteAllWarning'

const List = () => {
  const dispatch = useDispatch()
  const { contact, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  // =======deleteMany  =======
  const handleSelectAll = () => {
    if (contact.list.length === contact.deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: contact.list }))
  }
  const handleSelectOne = (_id) => {
    if (contact.deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: contact.deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = contact.list.find((item) => item._id === _id)
    const newValue = [...contact.deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======
  if (contact.isLoading) {
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
          action={() => dispatch(deleteSingleContactThunk(contact.deleteId))}
        />
      )}
      {/* show Delete All warning */}
      {warningHolder.deleteAllWarning && (
        <DeleteAllWarning
          action={() => dispatch(deleteManyContactsThunk(contact.deleteMany))}
        />
      )}

      {/* show delete all button */}
      <div className='delete-all-button'>
        {contact.deleteMany.length > 0 && (
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
                checked={contact.deleteMany.length === contact.list.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {contact.list?.map((item, index) => {
            return (
              <tr className='tr' key={index}>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      contact.deleteMany.find((items) => items._id === item._id)
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.subject}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td className='buttons'>
                  <Link className='btn' to={`/dashboard/contact/${item._id}`}>
                    <FiEdit />
                  </Link>
                  <button
                    className='btn'
                    onClick={() => handleDelete(item._id)}
                    type='button'
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
