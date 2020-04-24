import React from "react";

type SortingOrderProps = {
  sortingOrder: SortingOrders;
  toggleSortingOrder: () => void;
};
export type SortingOrders = "asc" | "desc";

export const SortOrdering = (props: SortingOrderProps) => (
  <form>
    <div className="form-row align-items-center">
      <div> Sort by:</div>
      <div className="col-auto my-1">
        <select
          className="custom-select mr-sm-2"
          value={props.sortingOrder}
          onChange={props.toggleSortingOrder}
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  </form>
);
