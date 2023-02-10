import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { customFetch } from '../../../utils/axios'
import {
  getItemFromLocalStorage,
  getUserFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../../utils/localStorage'
import { SectionOneTwoThreeWrapper } from '../../../Wrapper/websitecontent/SectionOneTwoThreeWrapper'
import FormInput from '../../FormInput'
import UploadImage from '../../UploadImage'

const LocalStorageUploadImage = getItemFromLocalStorage('sectionTwoImage')

const initialState = {
  _id: 0,
  heading: '',
  buttonTitle: '',
  paragraph: '',
  uploadImage: LocalStorageUploadImage || [],
  fetchData: false,
  isLoading: false,
}
const ContentSectionTwo = () => {
  const [state, setState] = useState(initialState)

  // ====Handle Submit ====
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (state.uploadImage.length <= 0) {
      return toast.error('please upload image first.')
    }
    if ((!state.heading, !state.buttonTitle, !state.paragraph)) {
      return toast.error('Please fill all fields.')
    }
    setState({ ...state, isLoading: true })
    const user = getUserFromLocalStorage()
    try {
      const result = await customFetch.post('/sectionTwo', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })
      console.log(result)
      setState({ ...state, isLoading: false, fetchData: !state.fetchData })
      removeItemFromLocalStorage('sectionTwoImage')

      toast.success(result.statusText)
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }
  // ====handle Change=====

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }
  // ======cb Function======
  const cbFunction = async (result) => {
    const name = 'sectionTwoImage'
    const uploadImage = result.data.sectionTwo.uploadImage
    if (state._id === 0) {
      setItemInLocalStorage(name, uploadImage)
    }
    setState({ ...state, uploadImage: result.data.sectionTwo.uploadImage })
  }

  // =====fetch Data=====

  const fetchData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/sectionTwo')

      if (result.data.msg === 'folder is empty.') {
        setState({ ...state, isLoading: false })
        return
      }
      const data = result?.data?.sectionTwo
      setState({ ...state, ...data, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line
  }, [state.fetchData])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <SectionOneTwoThreeWrapper>
      <strong className='top'>Section -2</strong>

      <div className='box'>
        <strong>Step-1. </strong>
        <p>Upload your Image</p>
      </div>
      <hr />
      <div className='image-box'>
        <div className='upload-image'>
          <UploadImage
            path={`/sectionTwo/${state._id}`}
            cbFunction={cbFunction}
            state={state}
            setState={setState}
          />
        </div>
        <div className='top-image'>
          <img src={state.uploadImage[0]?.secure_url} alt='' />
        </div>
      </div>
      <hr />
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Fill details below and submit.</p>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='box-1'>
          {/* heading  */}
          <div>
            <FormInput
              label={'Heading'}
              name={'heading'}
              value={state.heading}
              onChange={handleChange}
            />
          </div>

          {/* Button Title  */}
          <div>
            <FormInput
              label={'Button Title'}
              name={'buttonTitle'}
              value={state.buttonTitle}
              onChange={handleChange}
            />
          </div>
          {/* desktop Image */}
          <div>
            <FormInput
              label={'Desktop Image Link'}
              name={'desktopImage'}
              value={state.uploadImage[0]?.secure_url}
              onChange={handleChange}
              disabled
            />
          </div>

          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
        <div className='box-2'>
          {/* paragraph */}
          <div className='paragraph'>
            <label className='form-label' htmlFor='paragraph'>
              Paragraph
            </label>
            <textarea
              className='form-input'
              name='paragraph'
              id='paragraph'
              cols='30'
              rows='10'
              value={state.paragraph}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
      {/* hello */}
    </SectionOneTwoThreeWrapper>
  )
}

export default ContentSectionTwo
