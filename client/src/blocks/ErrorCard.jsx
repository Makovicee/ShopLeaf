import React from "react";
import Icon from "@mdi/react";

export default function Error({ title, text, icon }) {
  return (
    <div class="grid grid-cols-1">
      <div class="grid justify-items-center ">
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{title}</h2>
            <p>{text}</p>
            <div className="card-actions justify-end">
              <Icon path={icon} size={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
