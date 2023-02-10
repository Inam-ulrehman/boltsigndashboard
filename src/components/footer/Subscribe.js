import { useRef } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'

const Subscribe = () => {
  const emailInput = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const value = emailInput.current.value
    const at = '@'
    const dot = '.'
    if (value.length > 9 && value.includes(at) && value.includes(dot)) {
      return toast.success('Thank you for subscription .')
    } else {
      try {
        const response = await customFetch.post('email')
        console.log(response)
      } catch (error) {
        console.log(error.response)
      }
      return toast.error('Please enter a valid email .')
    }
  }

  return (
    <Wrapper className='boxDesign'>
      <h3 className='title'>News letter</h3>
      <p>Receive updates on the latest news and Offers.</p>
      <form className='subscribe-form' onSubmit={handleSubmit}>
        <input type='text' ref={emailInput} />
        <button className='btn' type='submit'>
          Subscribe
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  p,
  h3 {
    padding: 0 1rem;
    margin: 0;
  }

  .subscribe-form {
    padding: 5px;
    input {
      cursor: pointer;
      border: transparent;
      padding: 4px;
      margin-right: 5px;
    }
  }
`
export default Subscribe
