import React from "react";

export type ArticleProps = {
  id: number;
  date: string;
  image: string;
  preamble: string;
  title: string;
};

export const Article = (props: ArticleProps) => (
  <div>{props.title || "nic"}</div>
);
