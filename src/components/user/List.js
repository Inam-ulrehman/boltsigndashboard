import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import {
  deleteManyUsersThunk,
  deleteUserThunk,
  getStateValues,
} from '../../features/user/userSlice'
import Warning from '../Warning'
import {
  showDeleteAllWarning,
  showWarning,
} from '../../features/functions/functionSlice'
import DeleteAllWarning from '../DeleteAllWarning'
import maleAvatar from '../../images/Male.svg'
import femaleAvatar from '../../images/female.svg'
import undefinedAvatar from '../../images/undefined.svg'
import styled from 'styled-components'

const List = () => {
  const dispatch = useDispatch()
  const { user, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }
  // =======deleteMany  =======
  const handleSelectAll = () => {
    if (user.list.length === user.deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: user.list }))
  }
  const handleSelectOne = (_id) => {
    if (user.deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: user.deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = user.list.find((item) => item._id === _id)
    const newValue = [...user.deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======
  if (user.isLoading) {
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
        <Warning action={() => dispatch(deleteUserThunk(user.deleteId))} />
      )}
      {/* show Delete All warning */}
      {warningHolder.deleteAllWarning && (
        <DeleteAllWarning
          action={() => dispatch(deleteManyUsersThunk(user.deleteMany))}
        />
      )}

      {/* show delete all button */}
      <div className='delete-all-button'>
        {user.deleteMany.length > 0 && (
          <div className='delete-all-button'>
            <button className='btn' onClick={handleDeleteMany}>
              Delete Selected
            </button>
          </div>
        )}
      </div>
      {/* show table */}
      <Wrapper>
        <tbody>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={user.deleteMany.length === user.list.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Member Since</th>
            <th>Action</th>
          </tr>
          {user.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      user.deleteMany.find((items) => items._id === item._id)
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td className='avatar'>
                  <div className='div'>
                    {item.gender === 'male' && (
                      <img src={maleAvatar} alt='male'></img>
                    )}
                    {item.gender === 'female' && (
                      <img src={femaleAvatar} alt='male'></img>
                    )}
                    {item.gender === 'transgender' && (
                      <img src={undefinedAvatar} alt='prefer not to say'></img>
                    )}
                    {item.gender === 'non-binary/non-conforming' && (
                      <img src={undefinedAvatar} alt='prefer not to say'></img>
                    )}
                    {item.gender === 'prefer not to respond' && (
                      <img src={undefinedAvatar} alt='prefer not to say'></img>
                    )}
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className='address'>
                  <span className='house'>{item.house}</span>
                  <span>{item.street}</span>
                </td>
                <td>{item.postalCode}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <Link className='btn' to={`/dashboard/users/${item._id}`}>
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
      </Wrapper>
    </ListWrapper>
  )
}
const Wrapper = styled.table`
  .avatar {
    overflow: hidden;
    width: 70px;
    .div {
      max-width: 70px;
    }

    img {
      width: 100%;
      margin-bottom: -15px;
    }
  }
  .address {
    .house {
      margin-right: 3px;
    }
  }
`
export default List
