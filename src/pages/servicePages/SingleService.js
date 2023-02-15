import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { EditSingleService } from '../../components/service'
import { singleServiceThunk } from '../../features/services/serviceSlice'
import EditUploadImagesHook from '../../hooks/images/EditUploadImagesHook'

const SingleService = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    dispatch(singleServiceThunk(_id))
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      <Link className='btn' to={'/dashboard/services'}>
        Back to services
      </Link>
      {/* <EditUploadImage /> */}
      <EditUploadImagesHook path={'editing'} />
      <EditSingleService />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .btn {
    float: right;
  }
`
export default SingleService
