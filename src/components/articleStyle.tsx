import styled from "styled-components";

export const ArticlesList = styled.ul`
  padding: 0;
`;

export const SingleArticle = styled.li`
  list-style: none;
  .no-gutters {
    max-width: 700px;
    min-height: 150px;
  }
  .card-img {
    width: 100%;
    max-height: 150px;
    height: 100%;
  }

  .preamble {
    display: flex;
  }
  .card-text {
    min-width: 0;
    margin-bottom: 0;
  }

  //Change style for hyperlink element
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

  @media (max-width: 678px) {
    .card-img {
      width: 100%;
      max-height: none;
      height: 100%;
    }
    .hide-preamble {
      display: none;
    }
    .no-gutters {
      max-width: 700px;
      height: inherit;
    }
  }
`;
