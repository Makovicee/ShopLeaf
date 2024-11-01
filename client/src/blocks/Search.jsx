import React from "react";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
export default function Search({ onSearch }) {
  return (
    <div className="grid grid-cols-1">
      <div className="grid justify-items-center ">
        <label
          className="input input-bordered flex items-center gap-2 w-96"
          style={{ margin: "20px" }}
        >
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Icon path={mdiMagnify} size={1} />
        </label>
      </div>
    </div>
  );
}
