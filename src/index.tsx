import React from "react";
import ReactDOM from "react-dom";
import { sortWith, descend, ascend, props } from "ramda";
import parse from "date-fns/parse";
import nb from "date-fns/locale/nb";

import { articlesRequest } from "./apiHelpers";
import { Articles, Article } from "./components/articles";
import { CategoriesChecklist, Category } from "./components/categories";
import { EmptyView } from "./components/emptyView";
import { SortOrdering, SortingOrders } from "./components/sortOrdering";

import "bootstrap/dist/css/bootstrap.css";
//react-select for sort https://react-select.com/home#getting-started
// formik for filter https://jaredpalmer.com/formik/docs/overview

type State = {
  loading: boolean;
  articles: Article[];
  categories: Category[];
  sortingOrder: SortingOrders;
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      categories: [],
      sortingOrder: "desc"
    };
    this.toggleCategory = this.toggleCategory.bind(this);
    this.toggleSortingOrder = this.toggleSortingOrder.bind(this);
  }
  async componentDidMount() {
    const articles = await getArticles();

    this.setState({
      articles,
      categories: getUniqueArticlesCategories(articles),
      loading: false
    });
  }

  toggleSortingOrder() {
    this.setState({
      sortingOrder: this.state.sortingOrder === "desc" ? "asc" : "desc"
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
                <SortOrdering
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
              <Articles
                articles={prepareArticlesList(
                  this.state.articles,
                  this.state.sortingOrder,
                  this.state.categories
                )}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const prepareArticlesList = (
  articles: Article[],
  sortingOrder: SortingOrders,
  categories: Category[]
) => {
  const sortedArticles = sortedArticlesByDate(articles, sortingOrder);
  const filteredArticles = filterByCategory(sortedArticles, categories);
  return filteredArticles;
};

const sortedArticlesByDate = (
  articles: Article[],
  sortingOrder: SortingOrders
) => {
  const parseDateFormat = (a: Article) =>
    parse(a.date, "dd. MMMM yyyy", new Date(), { locale: nb });

  const sortByOrder = sortWith<Article>(
    sortingOrder === "asc"
      ? [ascend(parseDateFormat)]
      : [descend(parseDateFormat)]
  );

  return sortByOrder(articles);
};

const filterByCategory = (articles: Article[], categories: Category[]) => {
  const categoriesNames = categories
    .filter(category => category.checked)
    .map(catgory => catgory.category);

  if (categoriesNames.length === 0) {
    return articles;
  } else {
    return articles.filter(article =>
      categoriesNames.includes(article.category)
    );
  }
};

const getUniqueArticlesCategories = (articles: Article[]) => {
  const getUniqueCategorys = (acc: Category[], curr: Article) =>
    acc.find(item => item.category === curr.category)
      ? acc
      : [...acc, { category: curr.category, checked: true }];

  return articles.reduce(getUniqueCategorys, []);
};

const getArticles = async (): Promise<Article[]> => {
  const articles = await Promise.all([
    articlesRequest("articles/sports"),
    articlesRequest("articles/fashion")
  ]);
  return articles.reduce(
    (acc, curr) => [...acc, ...(curr.articles || [])],
    [] as Article[]
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
