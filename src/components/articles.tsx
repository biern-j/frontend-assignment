import React, { useState, useContext } from 'react'

import { SingleArticle, ArticlesList } from './articlesStyle'
import { ThemeContext, Themes } from './../themes'

export type Article = {
  id: number
  date: string
  image?: string | null
  category: string
  preamble?: string | null
  title: string
}

export const Articles = (props: { articles: Article[] }) => {
  const [preambleToggled, toggledPreamble] = useState<number | undefined>()
  const theme = useContext<Themes>(ThemeContext)
  console.log('theme', theme)
  return (
    <ArticlesList>
      {props.articles.map((article: Article) => (
        <SingleArticle key={article.id}>
          <div className="card mb-2 article-card">
            <div className="row no-gutters">
              <div className="col-sm-2 col-md-4">
                {article.image ? (
                  <img
                    className="card-img"
                    src={article.image}
                    alt={article.category}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="col-sm-4 col-md-8">
                <div className="card-body">
                  <div className="row">
                    <h5 className="col-sm-12 col-md-8 card-title">
                      {article.title}
                    </h5>
                    <p className="col-sm-12 col-md-4">{article.date}</p>
                  </div>
                  {article.preamble ? (
                    <div className="col-md-12 hide-preamble">
                      {preambleToggled === article.id ? (
                        <div>
                          <p className="card-text">
                            {article.preamble}
                            <a
                              href="#"
                              onClick={() =>
                                toggledPreamble(
                                  preambleToggled === article.id
                                    ? undefined
                                    : article.id,
                                )
                              }
                            >
                              [See less]
                            </a>
                          </p>
                        </div>
                      ) : (
                        <div className="preamble">
                          <p className="card-text preamble-toggled">
                            {article.preamble}
                          </p>
                          <a
                            href="#"
                            onClick={() =>
                              toggledPreamble(
                                preambleToggled === article.id
                                  ? undefined
                                  : article.id,
                              )
                            }
                          >
                            [Preamble]
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SingleArticle>
      ))}
    </ArticlesList>
  )
}
