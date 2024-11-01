import React from "react";
import { useState } from "react";
import AddListButton from "./AddListButton";
import { useListContext } from "../context/ListContext";
export default function AddItemModal({ listId }) {
  const [item, setItem] = useState("");
  const [error, setError] = useState(null);
  const { listsData, refreshLists } = useListContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const list = {
      name: item,
    };

    const response = await fetch(
      "http://https://shop-leaf-backend.onrender.com/api/lists/add/" + listId,
      {
        method: "PATCH",
        body: JSON.stringify(list),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setItem("");

      refreshLists();
      document.getElementById("add" + listId).close();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div data-theme>
          <dialog
            id={`add${listId}`}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box ">
              <h3
                className="font-bold text-lg text-center"
                style={{ marginBottom: "20px" }}
              >
                Add new item to the list
              </h3>

              <label className="input input-bordered flex items-center gap-2 input-accent">
                Item →
                <input
                  type="text"
                  className="grow"
                  placeholder="..."
                  onChange={(e) => setItem(e.target.value)}
                  value={item}
                />
              </label>
              {error && <div>{error}</div>}
              <div className="modal-action">
                <button type="submit">Add Item</button>
              </div>
            </div>
          </dialog>
        </div>
      </form>
    </>
  );
}
