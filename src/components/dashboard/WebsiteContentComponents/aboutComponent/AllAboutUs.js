import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import {
  deleteAboutUsThunk,
  getAboutUsThunk,
} from '../../../../features/aboutUs/aboutUsSlice'
import { capitalizeFirstLetter } from '../../../../utils/helper'

const AllAboutUs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { getAboutUs, aboutUsList, isLoading } = useSelector(
    (state) => state.aboutUs
  )

  const handleDelete = async (_id) => {
    dispatch(deleteAboutUsThunk(_id))
  }
  const handleEdit = async (_id) => {
    navigate(`${_id}`)
  }

  useEffect(() => {
    dispatch(getAboutUsThunk())
    // eslint-disable-next-line
  }, [getAboutUs])
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <div className='container'>
        {aboutUsList?.map((item, index) => {
          return (
            <div className='containerHolder' key={index}>
              <div className='image'>
                <button className='btn' onClick={() => handleDelete(item._id)}>
                  <FaTimes />
                </button>
                <button
                  className='btn secondBtn'
                  onClick={() => handleEdit(item._id)}
                >
                  <FaEdit />
                </button>
                <img src={item.uploadImage[0]?.secure_url} alt={item.name} />
              </div>
              <div className='body'>
                <div className='spanHolder'>
                  <span>{item.name}</span>
                  <span>{item.profession}</span>
                </div>
                <p className='text-small'>
                  {capitalizeFirstLetter(item.paragraph)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .containerHolder {
    box-shadow: var(--shadow-2);
    width: 80vw;
    margin: 1rem auto;
    position: relative;
    background: var(--white);

    .image {
      background: var(--grey-4);
      border-top-left-radius: var(--radius-2);
      border-top-right-radius: var(--radius-2);
    }
    img {
      width: 80vw;
      height: 30vh;
      object-fit: contain;
      border-bottom: 2px solid var(--primary-5);
    }
    .btn {
      position: absolute;
      right: 0;
    }
    .secondBtn {
      right: 12%;
    }
    .body {
      margin-top: -8px;
      padding: 1rem;
      background: var(--white);
    }
    .spanHolder {
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;
    }
    p {
      margin-bottom: 0;
      color: var(--grey-5);
    }
    @media (min-width: 600px) {
      width: 45vw;
      img {
        width: 45vw;
      }
    }
    @media (min-width: 1024px) {
      width: 30vw;
      img {
        width: 30vw;
      }
    }
  }
`

export default AllAboutUs
