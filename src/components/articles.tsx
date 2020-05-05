import React, { useState } from 'react'

import { SingleArticle, ArticlesList } from './articleStyle'

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

// export class Articles extends React.Component<
//   { articles: Article[] },
//   ArticlesState
// > {
//   constructor(props: { articles: Article[] }) {
//     super(props)
//     this.state = {}
//     this.toggledPreamble = this.toggledPreamble.bind(this)
//   }

//   toggledPreamble(e: React.MouseEvent, articleID: number) {
//     e.preventDefault()
//     this.setState({
//       preambleToggled:
//         this.state.preambleToggled === articleID ? undefined : articleID,
//     })
//   }

//   render() {
//     return (
//       <ArticlesList>
//         {this.props.articles.map((article: Article) => (
//           <SingleArticle key={article.id}>
//             <div className="card mb-2 article-card">
//               <div className="row no-gutters">
//                 <div className="col-sm-5 col-md-4">
//                   {article.image ? (
//                     <img
//                       className="card-img img-fluid"
//                       src={article.image}
//                       alt={article.category}
//                     />
//                   ) : (
//                     <div></div>
//                   )}
//                 </div>
//                 <div className="col-sm-4 col-md-8">
//                   <div className="card-body ">
//                     <div className="row">
//                       <h5 className="col-sm-12 col-md-2 card-title">
//                         {article.title}
//                       </h5>
//                       <p className="col-sm-12 col-md-4">{article.date}</p>
//                     </div>
//                     {article.preamble ? (
//                       <div className="col-md-12 hide-preamble">
//                         {this.state.preambleToggled === article.id ? (
//                           <div>
//                             <p className="card-text">
//                               {article.preamble}
//                               <a
//                                 href="#"
//                                 onClick={(e) =>
//                                   this.toggledPreamble(e, article.id)
//                                 }
//                               >
//                                 [See less]
//                               </a>
//                             </p>
//                           </div>
//                         ) : (
//                           <div className="preamble">
//                             <p className="card-text preamble-toggled">
//                               {article.preamble}
//                             </p>
//                             <a
//                               href="#"
//                               onClick={(e) =>
//                                 this.toggledPreamble(e, article.id)
//                               }
//                             >
//                               [Preamble]
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <></>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SingleArticle>
//         ))}
//       </ArticlesList>
//     )
//   }
// }
