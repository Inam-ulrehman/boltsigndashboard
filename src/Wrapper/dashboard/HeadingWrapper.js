import styled from 'styled-components'

const HeadingWrapper = styled.div`
  position: relative;
  .btn {
    position: absolute;
    font-size: 1rem;
    padding: 0 5px;
    border-radius: 0;
  }
  border-bottom: 2px solid var(--grey-5);

  clear: auto;
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
`
export default HeadingWrapper
