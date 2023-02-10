import styled from 'styled-components'

const ListWrapper = styled.div`
  .delete-all-button {
    min-height: 30px;
    button {
      height: 30px;
    }
  }
  table {
    text-align: center;
    tbody {
      .btn {
        height: 40px;
        margin: 5px;
      }
      tr {
        .image-holder {
          width: 100px;

          img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-width: 105px;
          }
        }
        th {
          text-transform: capitalize;
          box-shadow: var(--shadow-3);
          border: 2px solid var(--grey-5);
          background-color: var(--grey-2);
        }
        td {
          border: 2px solid var(--grey-5);
          background-color: var(--grey-1);
        }
      }
    }
  }
`
export default ListWrapper
