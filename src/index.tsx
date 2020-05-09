import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { sortWith, descend, ascend } from 'ramda'
import parse from 'date-fns/parse'
import nb from 'date-fns/locale/nb'

import { articlesRequest } from './apiHelpers'
import { Articles, Article } from './components/articles'
import { CategoriesChecklist, Category } from './components/categories'
import { EmptyView } from './components/emptyView'
import { SortOrdering, SortingOrders } from './components/sortOrdering'

import {
  LeftCol,
  RightCol,
  ArticlesControl,
  Loader,
  ArticlesContainer,
  GlobalStyle,
} from './indexStyle'
import { ThemeContext, themes, Mood } from './themes'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [loading, setLoader] = useState<boolean>()
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [sortingOrder, toggleSortingOrder] = useState<'desc' | 'asc'>('desc')
  const [mood, toggleMood] = useState<Mood>('light')

  useEffect(() => {
    getArticles().then((response) => {
      setLoader(false)
      setArticles(response)
      console.log('x', getUniqueArticlesCategories(response))

      setCategories(getUniqueArticlesCategories(response))
      console.log('y')
    })
  }, [])
  console.log('categories', categories)
  return loading ? (
    <Loader>
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Loader>
  ) : articles.length === 0 ? (
    <EmptyView />
  ) : (
    <ThemeContext.Provider value={themes[mood]}>
      <GlobalStyle theme={themes[mood]} />
      <ArticlesContainer className="container">
        <button
          type="button"
          onClick={() => toggleMood(mood === 'dark' ? 'light' : 'dark')}
        >
          Mood
        </button>

        <ArticlesControl theme={themes[mood]} className="row">
          <LeftCol className="col col-md-8 justify-content-start">
            <CategoriesChecklist
              categories={categories}
              toggleCategory={(categoryName: string) =>
                setCategories(
                  categories.map((category) =>
                    category.category === categoryName
                      ? { ...category, checked: !category.checked }
                      : category,
                  ),
                )
              }
            />
          </LeftCol>

          <RightCol className="col col-md-4 justify-content-end">
            <SortOrdering
              sortingOrder={sortingOrder}
              toggleSortingOrder={() =>
                toggleSortingOrder(sortingOrder === 'desc' ? 'asc' : 'desc')
              }
            />
          </RightCol>
        </ArticlesControl>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8">
            <Articles
              articles={prepareArticlesList(articles, sortingOrder, categories)}
            />
          </div>
        </div>
      </ArticlesContainer>
    </ThemeContext.Provider>
  )
}

const prepareArticlesList = (
  articles: Article[],
  sortingOrder: SortingOrders,
  categories: Category[],
) => {
  const sortedArticles = sortedArticlesByDate(articles, sortingOrder)
  const filteredArticles = filterByCategory(sortedArticles, categories)
  return filteredArticles
}

const sortedArticlesByDate = (
  articles: Article[],
  sortingOrder: SortingOrders,
) => {
  const parseDateFormat = (a: Article) =>
    parse(a.date, 'dd. MMMM yyyy', new Date(), { locale: nb })

  const sortByOrder = sortWith<Article>(
    sortingOrder === 'asc'
      ? [ascend(parseDateFormat)]
      : [descend(parseDateFormat)],
  )

  return sortByOrder(articles)
}

const filterByCategory = (articles: Article[], categories: Category[]) => {
  const categoriesNames = categories
    .filter((category) => category.checked)
    .map((catgory) => catgory.category)

  if (categoriesNames.length === 0) {
    return articles
  } else {
    return articles.filter((article) =>
      categoriesNames.includes(article.category),
    )
  }
}

const getUniqueArticlesCategories = (articles: Article[]) => {
  const getUniqueCategorys = (acc: Category[], curr: Article) =>
    acc.find((item) => item.category === curr.category)
      ? acc
      : [...acc, { category: curr.category, checked: true }]

  return articles.reduce(getUniqueCategorys, [])
}

const getArticles = async (): Promise<Article[]> => {
  const articles = await Promise.all([
    articlesRequest('articles/sports'),
    articlesRequest('articles/fashion'),
  ])
  return articles.reduce(
    (acc, curr) => [...acc, ...(curr.articles || [])],
    [] as Article[],
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
