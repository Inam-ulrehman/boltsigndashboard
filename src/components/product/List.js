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
  deleteManyProductsThunk,
  deleteProductsThunk,
  getStateValues,
} from '../../features/products/productSlice'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import DeleteAllWarning from '../DeleteAllWarning'

const List = () => {
  const dispatch = useDispatch()
  const { product, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }
  // =======deleteMany  =======
  const handleSelectAll = () => {
    if (product.list.length === product.deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: product.list }))
  }
  const handleSelectOne = (_id) => {
    if (product.deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: product.deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = product.list.find((item) => item._id === _id)
    const newValue = [...product.deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======
  if (product.isLoading) {
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
          action={() => dispatch(deleteProductsThunk(product.deleteId))}
        />
      )}
      {/* show Delete All warning */}
      {warningHolder.deleteAllWarning && (
        <DeleteAllWarning
          action={() => dispatch(deleteManyProductsThunk(product.deleteMany))}
        />
      )}

      {/* show delete all button */}
      <div className='delete-all-button'>
        {product.deleteMany.length > 0 && (
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
                checked={product.deleteMany.length === product.list.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>SUBCATEGORY</th>
            <th>AVAILABLE</th>
            <th>CREATED AT</th>
            <th>FEATURE</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
          {product.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={
                      product.deleteMany.find((items) => items._id === item._id)
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.inStock ? 'Available' : 'out-of-Stock'}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.feature ? 'Feature' : null}</td>
                <td>{formatPrice(item.amount)}</td>
                <td className='buttons'>
                  <Link className='btn' to={`/dashboard/products/${item._id}`}>
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
              // ===========
            )
          })}
        </tbody>
      </table>
    </ListWrapper>
  )
}

export default List
