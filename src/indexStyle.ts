import styled, { createGlobalStyle } from 'styled-components'

type Theme = {
  foreground: string
  background: string
}

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
body {
  background-color: ${({ theme }) => theme.background};

}
`

export const ArticlesContainer = styled.div``

export const Loader = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  height: 100vh;
`

export const LeftCol = styled.div`
  position: relative;
  bottom: -70px;
  @media (max-width: 768px) {
    position: relative;
    bottom: 0;
  }
`

export const RightCol = styled.div`
  @media (max-width: 768px) {
    float: none;
  }
`

export const ArticlesControl = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.foreground};
  margin-top: 10rem;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`
