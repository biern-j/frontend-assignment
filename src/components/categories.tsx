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
      // If only one option is avaliable, I want to show it for the user. It don't have to be disabled input, it can be just label with name of avaliable category
      <div>
        <label>
          {props.categories[0].category}
          <input
            name={props.categories[0].category}
            type="checkbox"
            checked={true}
            value={props.categories[0].category}
            disabled
          />
        </label>
      </div>
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
