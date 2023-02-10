import styled from 'styled-components'

export const SectionOneTwoThreeWrapper = styled.div`
  .top {
    position: absolute;
    right: 5%;
  }
  .image-box {
    display: grid;
    grid-template-columns: 1fr auto;
    margin-right: 4rem;
  }
  .top-image {
    max-width: 150px;
    max-height: 150px;

    img {
      width: 100%;
    }
  }
  .box {
    display: flex;
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
  .upload-image {
    height: 120px;
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    max-width: 80vw;
  }
`
