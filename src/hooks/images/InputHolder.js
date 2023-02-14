import React, { useState } from 'react'
import styled from 'styled-components'

const initialState = {
  showRequirements: false,
  showHowToUpload: false,
}

const InputHolder = ({
  uploadImage,
  isLoading,
  handleDelete,
  handleSubmit,
  handleChange,
  imageRef,
}) => {
  const [localState, setLocalState] = useState(initialState)

  // =====handle show class buttons=======
  const handleRequirements = () => {
    setLocalState({
      ...localState,
      showRequirements: !localState.showRequirements,
    })
  }
  const handleHowToUploadImage = () => {
    setLocalState({
      ...localState,
      showHowToUpload: !localState.showHowToUpload,
    })
  }
  return (
    <Wrapper>
      <div className='file-upload-container'>
        <input
          type='file'
          className='custom-file-input'
          ref={imageRef}
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          {'Upload File'}
        </button>
      </div>
      {/* =========Button show and hide========= */}
      <div className='heading'>
        <div className='box-1'>
          <button type='button' onClick={handleRequirements}>
            Upload Image requirements?
          </button>
          <ul className={localState.showRequirements ? null : 'hide'}>
            <li>Size must be under 10MB</li>
            <li>File must be PNG format</li>
          </ul>
        </div>
        <div className='box-2'>
          <button type='button' onClick={handleHowToUploadImage}>
            How to upload Image?
          </button>
          <ul className={localState.showHowToUpload ? null : 'hide'}>
            <li>
              <strong>Step 1.</strong> Choose File
            </li>
            <li>
              <strong>Step 2.</strong> {'Upload File'}
            </li>
          </ul>
        </div>
      </div>
      {/* Show uploaded images */}
      <div className='image-container'>
        {uploadImage?.map((item, index) => {
          return (
            <div className='container' key={index}>
              <div className='image-holder'>
                <img src={item.url} alt='product' />
              </div>
              <div className='btn-container'>
                <button
                  onClick={() => handleDelete(item.public_id)}
                  className='btn btn-block'
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
        {isLoading && <div className='loading'></div>}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  .heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    button {
      background: var(--primary-5);
      color: var(--white);
      border: transparent;
      transition: var(--transition-1);
      :hover {
        background: var(--primary-7);
        cursor: pointer;
      }
    }
    ul {
      margin: 0;
      margin-top: -5px;
      background-color: var(--grey-3);
    }
    .box-1,
    .box-2 {
      margin: 0 auto;
    }
  }
  .hide {
    display: none;
  }
  .image-container {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;

    .container {
      max-width: 150px;
      max-height: 150px;
      overflow: hidden;
      text-align: center;
      border: 2px solid var(--primary-5);
      margin: 0.5rem;
      .image-holder {
        max-width: 110px;
      }
      img {
        width: 100%;
        margin-bottom: -7px;
      }
      .btn {
        border-radius: 0;
      }
    }
  }
`

export default InputHolder
