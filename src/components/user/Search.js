import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearchAlt2 } from 'react-icons/bi'
import {
  clearState,
  getStateValues,
  getUsersThunk,
} from '../../features/user/userSlice'
import SearchWrapper from '../../Wrapper/dashboard/SearchWrapper'

const Search = () => {
  const dispatch = useDispatch()
  const {
    searchName,
    searchPhone,
    searchEmail,
    searchAddress,
    searchPostalCode,
    searchId,
    sort,
    page,
    limit,
    refreshData,
  } = useSelector((state) => state.user)

  const handleClear = () => {
    dispatch(clearState())
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    dispatch(
      getUsersThunk({
        searchName,
        searchPhone,
        searchEmail,
        searchAddress,
        searchPostalCode,
        searchId,
        sort,
        page,
        limit,
      })
    )
    // eslint-disable-next-line
  }, [
    searchName,
    searchPhone,
    searchEmail,
    searchAddress,
    searchPostalCode,
    searchId,
    sort,
    page,
    limit,
    refreshData,
  ])
  return (
    <SearchWrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <div className='limit-sort-input'>
        <div className='limit-sort'>
          <div className='limit'>
            <label htmlFor='limit'>Limit</label>
            <select
              name='limit'
              id='limit'
              value={limit}
              onChange={handleChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div className='sort'>
            <label htmlFor='sort'>Sort</label>
            <select name='sort' id='sort' value={sort} onChange={handleChange}>
              <option value='-createdAt'>SELECT OPTIONS</option>
              <option value='-createdAt'>DATE NEW</option>
              <option value='createdAt'>DATE OLD</option>
              <option value='title'>NAME A-Z</option>
              <option value='-title'>NAME Z-A</option>
            </select>
          </div>
        </div>
      </div>
      {/* ============box divided */}
      <div className='search'>
        {/* name */}
        <div>
          <input
            type='text'
            name='searchName'
            placeholder='Name'
            value={searchName}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>

        {/* email */}
        <div>
          <input
            type='email'
            name='searchEmail'
            placeholder='Email'
            value={searchEmail}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>

        {/* address */}
        <div>
          <input
            type='text'
            name='searchAddress'
            placeholder='Street Name'
            value={searchAddress}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>

        {/* PostalCode */}
        <div>
          <input
            type='text'
            name='searchPostalCode'
            placeholder='Postal Code'
            value={searchPostalCode}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>

        {/* phone */}
        <div>
          <input
            type='number'
            name='searchPhone'
            placeholder='Phone'
            value={searchPhone}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>

        {/* user Id */}
        <div>
          <input
            type='text'
            name='searchId'
            placeholder='User Id'
            value={searchId}
            onChange={handleChange}
          />
          <BiSearchAlt2 />
        </div>
      </div>
    </SearchWrapper>
  )
}

export default Search
