import styled from 'styled-components'

const SearchWrapper = styled.div`
  position: relative;
  .clear-filter {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0;
  }
  .limit-sort-input {
  }
  .limit-sort {
    display: flex;

    padding: 0 1rem;
    div {
      margin: 0 1rem;
    }
    label {
      padding: 5px;
    }
    select {
      border: transparent;
      background: var(--primary-5);
      color: var(--white);
      transition: var(--transition-1);
      padding: 3.5px;
      :hover {
        cursor: pointer;
        background-color: var(--primary-7);
      }
    }
    option {
      background-color: var(--white);
      color: var(--black);
    }
    .feature {
      Button {
        border-radius: 0;
      }
    }
    .active {
      background-color: var(--primary-7);
    }
  }
  /* Input css here */

  .search {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    div {
      display: flex;
      border: 2px solid var(--grey-2);
      margin-right: 2rem;
      justify-content: center;

      svg {
        margin-top: 3px;
        font-size: 1.2rem;
        margin-right: 5px;
      }
      input {
        padding: 3px;
        background: transparent;
        border: transparent;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`
export default SearchWrapper
