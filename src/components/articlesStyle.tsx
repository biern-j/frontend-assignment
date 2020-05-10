import styled from 'styled-components'

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`

const media = {
  custom: customMediaQuery,

  desktop: customMediaQuery(922),

  tablet: customMediaQuery(768),

  phone: customMediaQuery(576),
}

export const ArticlesList = styled.ul`
  padding: 0;
`
export const SingleArticle = styled.li`
  list-style: none;
  .no-gutters {
    max-width: 100%;
    min-height: 150px;
  }

  .main {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .card-img {
    max-height: 150px;
  }

  .preamble {
    display: flex;
  }

  .card-text {
    min-width: 0;
    margin-bottom: 0;
  }

  .card-text a {
    white-space: nowrap;
  }

  .preamble-toggled {
    line-height: 1.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 3em;
  }
  ${media.phone} {
    .card-img {
      max-height: none;
    }
    .hide-preamble {
      display: none;
    }
    .no-gutters {
      max-width: 700px;
      height: inherit;
    }
  }
`
