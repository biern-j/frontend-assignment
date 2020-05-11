import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { sortWith, descend, ascend } from 'ramda'
import parse from 'date-fns/parse'
import nb from 'date-fns/locale/nb'

import { articlesRequest } from './apiHelpers'
import Articles, { Article } from './components/articles'
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

const months = [
  ['January', 'januar'],

  ['February', 'februar'],

  ['March', 'mars'],

  ['April', 'april'],

  [' May', 'mai'],

  ['June', 'juni'],

  [' July', 'juli'],

  ['August', 'august'],

  ['September', 'september'],

  ['October', 'oktober'],

  [' November', 'november'],

  ['December', 'desember'],
]

// type MyMapType = <U>(arg: T[]) => U[]

// const myMap = <U>(sampleArray: T[]): U[] => {
//   let newArray: U[] = []
//   for (let i: number = 0; i <= sampleArray.length; i++) {
//     newArray = newArray.push(i)
//   }
//   return newArray
// }
// const result: MyMapType = myMap<number>(['q', 'b', 'c']: string[])
// console.log('result', result)

type ArticlesState =
  | { kind: 'loading' }
  | { kind: 'loaded'; articles: Article[] }

const App = () => {
  const [loading, setLoader] = useState<boolean>(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [sortingOrder, toggleSortingOrder] = useState<'desc' | 'asc'>('desc')
  const [mood, toggleMood] = useState<Mood>('light')

  useEffect(() => {
    getArticles().then((response) => {
      setArticles(response)
      setCategories(getUniqueArticlesCategories(response))
      setLoader(false)
    })
  }, [])

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
  const sortedArticles = sortedArticlesByDateV2(articles, sortingOrder)
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

const sortedArticlesByDateV2 = (
  articles: Article[],
  sortingOrder: SortingOrders,
) => {
  const articlesToSort = articles.map((article) => {
    const date = article.date.replace('.', '').split(' ')
    const month = months.find((month) => {
      return month[1] === date[1]
    })!
    const parsedDate = new Date(`${month[0]} ${date[0]}, ${date[2]} 0:00:00`)
    return { ...article, parsedDate }
  })
  const sortDescend = sortWith<Article & { parsedDate: Date }>(
    sortingOrder === 'desc'
      ? [descend((art) => art.parsedDate)]
      : [ascend((art) => art.parsedDate)],
  )
  return sortDescend(articlesToSort)
}

ReactDOM.render(<App />, document.getElementById('app'))
