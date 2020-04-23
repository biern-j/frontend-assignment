import React from "react";

import { EmptyView } from "./emptyView";
import { SingleArticle } from "./articleStyle";

// As a PO I decided to allow image and preamble to be null, but if other articles' property is null, article shouldn't be rendered.
export type Article = {
  id: number;
  date: string;
  image?: string | null;
  category: string;
  preamble?: string | null;
  title: string;
};

export const Articles = (props: { articles: Article[] }) => (
  <div>
    <ul>
      {props.articles.map((article: Article) => (
        <li key={article.id}>
          <div className="container">
            <div className="row">
              <div className="col img">
                {article.image ? (
                  <img src={article.image} alt={article.category} />
                ) : (
                  <EmptyView />
                )}
              </div>
              <div className="col article-description">
                <div className="row article-headers">
                  <div className="col title">
                    {article.title || <EmptyView />}
                  </div>
                  <div className="col data">
                    {article.date || <EmptyView />}
                  </div>
                </div>

                {(
                  <div className="row">
                    <div className="article-preamble">{article.preamble}</div>
                    <button>[preamble]</button>
                  </div>
                ) || <EmptyView />}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
