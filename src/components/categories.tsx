import React from "react";

import { CategoryCheckbox } from "./categoriesStyle";

type CategoriesProps = {
  categories: Category[];
  toggleCategory: (categoryName: string) => void;
};
export type Category = { category: string; checked: boolean };

export const CategoriesChecklist = (props: CategoriesProps) => (
  <div>
    Data Source:
    {props.categories.length === 1 ? (
      <div className="form-check">
        <label className="form-check-label">
          <input
            name={props.categories[0].category}
            type="checkbox"
            checked={true}
            value={props.categories[0].category}
            disabled
            className="form-check-input"
            onChange={e => props.toggleCategory(e.target.name)}
          />
          {props.categories[0].category}
        </label>
      </div>
    ) : (
      <form>
        {props.categories.map(category => (
          <CategoryCheckbox key={category.category} className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                name={category.category}
                checked={category.checked}
                value={category.category}
                onChange={e => props.toggleCategory(e.target.name)}
              />
              {category.category}
            </label>
          </CategoryCheckbox>
        ))}
      </form>
    )}
  </div>
);
