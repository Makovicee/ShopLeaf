import React from "react";

export function ArchiveSwapper({ archiveSwap, setArchiveSwap }) {
  return (
    <div className="join grid grid-cols-3">
      <button
        onClick={() => setArchiveSwap("all")}
        className={`join-item btn border-primary hover:btn-primary hover:border-secondary ${
          archiveSwap === "all" && "btn-secondary"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setArchiveSwap("active")}
        className={`join-item btn border-primary hover:btn-primary hover:border-secondary ${
          archiveSwap === "active" && "btn-secondary"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setArchiveSwap("archived")}
        className={`join-item btn border-primary hover:btn-primary hover:border-secondary ${
          archiveSwap === "archived" && "btn-secondary"
        }`}
      >
        Archived
      </button>
    </div>
  );
}
