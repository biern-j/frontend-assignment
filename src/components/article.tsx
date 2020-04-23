import React from "react";

import { EmptyView } from "./emptyView";

export type ArticleProps = {
  id: number;
  date: string;
  image: string;
  category: string;
  preamble: string;
  title: string;
};

export const Article = (props: ArticleProps) => (
  <div className="container">
    <div className="row">
      <div className="col img">
        {props.image ? (
          <img src={props.image} alt={props.category} />
        ) : (
          <EmptyView />
        )}
      </div>
      <div className="col article-description">
        <div className="row article-headers">
          <div className="col title">{props.title || <EmptyView />}</div>
          <div className="col data">{props.date || <EmptyView />}</div>
        </div>
        <div className="row article-preamble">
          {props.preamble || <EmptyView />}
        </div>
      </div>
    </div>
  </div>
);
