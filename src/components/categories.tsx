import React from "react";

type CategoriesProps = {
  categories: Category[];
  toggleCategory: (categoryName: string) => void;
};
export type Category = { category: string; checked: boolean };
export const CategoriesChecklist = (props: CategoriesProps) => (
  <div>
    <p>Data Source: </p>
    {props.categories.length === 1 ? (
      <div>{props.categories[0].category}</div>
    ) : (
      <form>
        {props.categories.map(category => (
          <label key={category.category}>
            {category.category}
            <input
              name={category.category}
              type="checkbox"
              checked={category.checked}
              value={category.category}
              onChange={e => props.toggleCategory(e.target.name)}
            />
          </label>
        ))}
      </form>
    )}
  </div>
);
