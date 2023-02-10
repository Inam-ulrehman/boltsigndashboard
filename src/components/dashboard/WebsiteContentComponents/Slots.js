import React, { useState } from 'react'
import { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import ListWrapper from '../../../Wrapper/dashboard/ListWrapper'
import FormInput from '../../FormInput'

const initialState = {
  startTime: '',
  endTime: '',
  available: true,
  isLoading: false,
  refreshData: false,
}
const Slots = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.startTime || !state.endTime) {
      return toast.error('Please fill both values.')
    }
    const { token } = getUserFromLocalStorage()
    await customFetch.post(`/slots`, state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setState({
      ...state,
      refreshData: !state.refreshData,
      startTime: '',
      endTime: '',
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  const handleDelete = async (_id) => {
    const { token } = getUserFromLocalStorage()
    const result = await customFetch.delete(`/slots/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(result)
    setState({ ...state, refreshData: !state.refreshData })
  }

  const fetchData = async () => {
    const { token } = getUserFromLocalStorage()
    const result = await customFetch.get(`/slots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setState({ ...state, ...result.data })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [state.refreshData])
  return (
    <Wrapper>
      <div className='create-slot'>
        <div className='title'>Add a slot.</div>
        <form className='form' onSubmit={handleSubmit}>
          {/* startTime */}
          <FormInput
            name='startTime'
            value={state.startTime}
            onChange={handleChange}
          />
          {/* endTime */}
          <FormInput
            name='endTime'
            value={state.endTime}
            onChange={handleChange}
          />

          <button type='submit' className='btn'>
            Add in List
          </button>
        </form>
      </div>
      <div className='slots-container'>
        {/* ==========table below============ */}
        <ListWrapper>
          <table>
            <tbody>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {state?.slots?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>{item.available ? 'Available' : 'Not-Available'}</td>
                    <td className='btn-holder'>
                      <Link to={`${item._id}`} className='btn'>
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
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    text-align: center;
  }
  .btn-holder {
    width: 160px;
  }
  form {
    margin: 0 auto;
    justify-content: center;
    min-width: 80vw;
    display: flex;
    div {
      margin: 1rem;
    }
    .btn {
      margin-top: 3rem;
      height: 2rem;
    }
  }
`
export default Slots
