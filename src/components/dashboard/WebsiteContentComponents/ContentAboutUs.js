import React from 'react'
import {
  AboutUsHeading,
  AllAboutUs,
  UploadAboutUs,
  UploadImage,
} from './aboutComponent'

const ContentAboutUs = () => {
  return (
    <div>
      <AboutUsHeading />
      <hr />
      <UploadImage />
      <UploadAboutUs />
      <hr />
      <AllAboutUs />
    </div>
  )
}

export default ContentAboutUs
