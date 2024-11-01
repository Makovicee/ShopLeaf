import React from "react";

export default function RadialProgress({ value }) {
  return (
    <div
      className="radial-progress"
      style={{ "--value": value, "--size": "9rem", "--thickness": ".8rem" }}
      role="progressbar"
    >
      {Math.floor(value).toFixed(0)} %
    </div>
  );
}
