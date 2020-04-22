import React from "react";

type CategoriesProps = {
  categories: Category[];
  toggleCategory: (categoryName: string) => void;
};
export type Category = { category: string; checked: boolean };
export const CategoriesChecklist = (props: CategoriesProps) =>
  props.categories.length === 1 ? (
    <div>"No category to choose"</div>
  ) : (
    <form>
      <p>Data Soource</p>
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
  );