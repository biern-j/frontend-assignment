import React from "react";
import ReactDOM from "react-dom";
import { articlesRequest } from "./api-helpers";
import { Article, ArticleProps } from "./components/article";

import "./bootstrap/css/bootstrap.css";

type State = {
  articles: ArticleProps[];
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articles: []
    };
  }
  async componentDidMount() {
    this.setState({ articles: await getArticles() });
  }
  render() {
    console.log("this.state.articles", this.state.articles);
    return (
      <div className="offset-1">
        <ul>
          {this.state.articles.map((article: ArticleProps) => (
            <li key={article.id}>
              <Article {...article} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const getArticles = async () => {
  const sportArticles = await articlesRequest("articles/sports");
  const fashionArticles = await articlesRequest("articles/fashion");
  const articles = [
    ...(sportArticles.articles || []),
    ...(fashionArticles.articles || [])
  ];
  console.log(
    "testSport",
    "sport",
    sportArticles,
    "fashion",
    fashionArticles,
    "articles",
    articles
  );

  return articles;
};

ReactDOM.render(<App />, document.getElementById("app"));
