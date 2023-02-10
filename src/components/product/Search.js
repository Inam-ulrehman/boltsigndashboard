import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearchAlt2 } from 'react-icons/bi'
import {
  clearState,
  getProductsThunk,
  getStateValues,
} from '../../features/products/productSlice'
import SearchWrapper from '../../Wrapper/dashboard/SearchWrapper'

const Search = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const {
    searchTitle,
    searchCategory,
    searchSubCategory,
    searchProductId,
    searchFeature,
    sort,
    limit,
    page,
    refreshData,
  } = product

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleClear = () => {
    dispatch(clearState())
  }

  const handleFeature = () => {
    const name = 'searchFeature'
    if (searchFeature) {
      dispatch(getStateValues({ name, value: '' }))
    } else {
      dispatch(getStateValues({ name, value: true }))
    }
  }

  useEffect(() => {
    dispatch(
      getProductsThunk({
        searchTitle,
        searchCategory,
        searchSubCategory,
        searchProductId,
        searchFeature,
        sort,
        limit,
        page,
        refreshData,
      })
    )

    // eslint-disable-next-line
  }, [
    searchTitle,
    searchCategory,
    searchSubCategory,
    searchProductId,
    searchFeature,
    sort,
    limit,
    page,
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
            </select>
          </div>
          <div className='feature'>
            <button
              className={searchFeature === '' ? 'btn' : 'btn active'}
              onClick={handleFeature}
            >
              Feature
            </button>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          {/* title */}
          <div>
            <input
              type='text'
              name='searchTitle'
              placeholder='Title'
              value={searchTitle}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>
          {/* category */}
          <div>
            <input
              type='text'
              name='searchCategory'
              placeholder='Category'
              value={searchCategory}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>

          {/* SubCategory */}
          <div>
            <input
              type='text'
              placeholder='SubCategory'
              name='searchSubCategory'
              value={searchSubCategory}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>

          {/* ProductId */}
          <div>
            <input
              type='text'
              placeholder='Product Id'
              name='searchProductId'
              value={searchProductId}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>
        </div>
      </div>
    </SearchWrapper>
  )
}

export default Search
