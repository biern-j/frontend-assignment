import React from "react";
// newlines
type SortingOrderProps = {
  sortingOrder: SortingOrders;
  toggleSortingOrder: () => void;
};
export type SortingOrders = "asc" | "desc";

export const SortOrdering = (props: SortingOrderProps) => (
  <div>
    <p>Sort by:</p>
    <form>
      <label>
        {props.sortingOrder === "asc" ? "Oldest" : "Newest"}
        <button type="button" onClick={props.toggleSortingOrder}>
          <span>
            {props.sortingOrder === "asc" ? (
              <i className="material-icons">expand_less</i>
            ) : (
              <i className="material-icons">expand_more</i>
            )}
          </span>
        </button>
      </label>
    </form>
  </div>
);
