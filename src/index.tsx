import React from "react";
import ReactDOM from "react-dom";
import { sortWith, descend, ascend } from "ramda";
import parse from "date-fns/parse";
import nb from "date-fns/locale/nb";

import { articlesRequest } from "./apiHelpers";
import { Article, ArticleProps } from "./components/article";
import { CategoriesChecklist, Category } from "./components/categories";
import { EmptyView } from "./components/emptyView";
import { Sorter } from "./components/sorter";

import "bootstrap/dist/css/bootstrap.css";
//react-select for sort https://react-select.com/home#getting-started
// formik for filter https://jaredpalmer.com/formik/docs/overview

type State = {
  loading: boolean;
  articles: ArticleProps[];
  categories: Category[];
  sortingOrder: string;
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      categories: [],
      sortingOrder: "des"
    };
    this.toggleCategory = this.toggleCategory.bind(this);
    this.toggleSortingOrder = this.toggleSortingOrder.bind(this);
  }
  async componentDidMount() {
    const articles = await getArticles();

    this.setState({
      articles: articles,
      categories: getUniqueArticlesCategories(articles),
      loading: false
    });
  }

  toggleSortingOrder() {
    this.setState({
      sortingOrder: this.state.sortingOrder === "des" ? "asc" : "des"
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
    return (
      <div>
        <div>
          {this.state.loading ? (
            "loader"
          ) : this.state.articles.length === 0 ? (
            <EmptyView />
          ) : (
            <div>
              <div>
                <Sorter
                  sortingOrder={this.state.sortingOrder}
                  toggleSortingOrder={this.toggleSortingOrder}
                />
              </div>
              <div>
                <CategoriesChecklist
                  categories={this.state.categories}
                  toggleCategory={this.toggleCategory}
                />
              </div>
              <ul>
                {...prepareArticlesList(
                  this.state.articles,
                  this.state.sortingOrder,
                  this.state.categories
                ).map((article: ArticleProps) => (
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

const prepareArticlesList = (
  articles: ArticleProps[],
  sortingOrder: string,
  categories: Category[]
) => {
  const sortedArticles = sortedArticlesByDate(articles, sortingOrder);
  const filteredArticles = filterByCategory(sortedArticles, categories);
  return filteredArticles;
};

const sortedArticlesByDate = (
  articles: ArticleProps[],
  sortingOrder: string
) => {
  //   // const splitedFirstDate = a.date.split(" ");
  //   // const splitedSecondDate = b.date.split(" ");
  //   // const firstDateEvent = new Date(a.date);
  //   // const secondDateEvent = new Date(b.date);
  //   // const UTCFirstDate = firstDateEvent.toUTCString();
  //   // const UTCSecondDate = secondDateEvent.toUTCString();

  const parseDateFormat = (a: ArticleProps) =>
    parse(a.date, "dd. MMMM yyyy", new Date(), { locale: nb });

  const sortByOrder = sortWith<ArticleProps>(
    sortingOrder === "asc"
      ? [ascend(parseDateFormat)]
      : [descend(parseDateFormat)]
  );

  return sortByOrder(articles);
};

const filterByCategory = (articles: ArticleProps[], categories: Category[]) => {
  const checkedCategory = categories.filter(category => category.checked);
  const checkoedCategoryName = checkedCategory.map(catgory => catgory.category);
  if (checkedCategory.length === 0) {
    return articles;
  } else {
    return articles.filter(article =>
      checkoedCategoryName.includes(article.category)
    );
  }
};

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

  return articles;
};

ReactDOM.render(<App />, document.getElementById("app"));
