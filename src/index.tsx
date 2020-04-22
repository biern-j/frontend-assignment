import React from "react";
import ReactDOM from "react-dom";

import { articlesRequest } from "./api-helpers";
import { Article, ArticleProps } from "./components/article";
import { CategoriesChecklist, Category } from "./components/categories";
import { EmptyView } from "./components/empty-view";

import "bootstrap/dist/css/bootstrap.css";
//react-select for sort https://react-select.com/home#getting-started
// formik for filter https://jaredpalmer.com/formik/docs/overview

type State = {
  articles: ArticleProps[];
  categories: Category[];
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articles: [],
      categories: []
    };
    this.toggleCategory = this.toggleCategory.bind(this);
  }
  async componentDidMount() {
    const articles = await getArticles();

    this.setState({
      articles: articles,
      categories: getUniqueArticlesCategories(articles)
    });
  }

  toggleCategory(categoryName: string) {
    this.setState({
      categories: this.state.categories.map(category =>
        category.category === categoryName
          ? { ...category, checked: !category.checked }
          : category
      )
    });
  }

  render() {
    console.log(
      "this.state.articles",
      this.state.articles,
      "category",
      this.state.categories
    );
    return (
      <div>
        <div>
          {this.state.articles.length === 0 ? (
            <EmptyView />
          ) : (
            <div>
              <div>
                <CategoriesChecklist
                  categories={this.state.categories}
                  toggleCategory={this.toggleCategory}
                />
              </div>
              <ul>
                {this.state.articles.map((article: ArticleProps) => (
                  <li key={article.id}>
                    <Article {...article} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const getUniqueArticlesCategories = (articles: ArticleProps[]) => {
  const getUniqueCategorys = (acc: Category[], curr: ArticleProps) =>
    acc.find(item => item.category === curr.category)
      ? acc
      : [...acc, { category: curr.category, checked: true }];

  return articles.reduce(getUniqueCategorys, []);
};

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
