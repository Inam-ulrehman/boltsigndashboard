import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  getEditAboutUsValues,
  SingleEditAboutUsThunk,
  updateAboutUsTextThunk,
} from '../../../../features/aboutUs/editAboutUsSlice'
import EditUploadImage from './EditUploadImage'

const EditAboutUs = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()
  const {
    name,
    profession,
    paragraph,
    uploadImage,
    isLoading,
    getEditAboutUsData,
  } = useSelector((state) => state.editAboutUs)

  // handle Submit

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateAboutUsTextThunk({ name, profession, paragraph, _id }))
  }

  // handle change
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getEditAboutUsValues({ name, value }))
  }
  useEffect(() => {
    dispatch(SingleEditAboutUsThunk(_id))
    // eslint-disable-next-line
  }, [getEditAboutUsData])
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
      <EditUploadImage />
      <form onSubmit={handleSubmit}>
        <div className='cart container'>
          <div className='containerHolder'>
            <div className='image'>
              <img src={uploadImage[0]?.secure_url} alt={name} />
            </div>
            <div className='body'>
              <div className='spanHolder'>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleChange}
                />

                <input
                  type='text'
                  name='profession'
                  value={profession}
                  onChange={handleChange}
                />
              </div>
              <textarea
                className='text-small'
                name='paragraph'
                id=''
                cols='40'
                rows='10'
                value={paragraph}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='title'>
          <button type='submit' className='btn'>
            Update
          </button>
        </div>
      </form>
      <div className='changeCart'></div>
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
      input {
        width: 170px;
      }
    }
    textArea {
      margin-top: 10px;
      width: 340px;
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
export default EditAboutUs
