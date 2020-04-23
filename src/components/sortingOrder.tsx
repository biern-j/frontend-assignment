import React from "react";
type SortingOrderProps = {
  sortingOrder: boolean;
  toggleSortingOrder: () => void;
};
export const SortingOrder = (props: SortingOrderProps) => (
  <div>
    <p>Sort:</p>
    <form>
      <label>
        {props.sortingOrder ? "Newest" : "Oldest"}
        <button type="button" onClick={props.toggleSortingOrder}>
          <span>
            {props.sortingOrder ? (
              <i className="material-icons">expand_more</i>
            ) : (
              <i className="material-icons">expand_less</i>
            )}
          </span>
        </button>
      </label>
    </form>
  </div>
);
