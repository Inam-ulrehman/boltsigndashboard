import React from 'react'

const FormInput = ({ type, placeholder, name, value, onChange, label }) => {
  return (
    <div>
      <label className='form-label' htmlFor={name}>
        {label || name}
      </label>
      <input
        placeholder={
          placeholder ? placeholder.toUpperCase() : name.toUpperCase()
        }
        className='form-input'
        type={type || 'text'}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
