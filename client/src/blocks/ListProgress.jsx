import React from "react";

export default function ListProgress({ scrollProgress }) {
  return (
    <progress
      className="progress progress-accent h-3"
      style={{ marginTop: "20px" }}
      value={scrollProgress}
      max={100}
    ></progress>
  );
}
