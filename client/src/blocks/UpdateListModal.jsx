import React from "react";
import { useState } from "react";
import AddListButton from "./AddListButton";
import { useListContext } from "../context/ListContext";
export default function UpdateListModal({ listId }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const { listsData, refreshLists } = useListContext();
  async function handleSubmit(e) {
    e.preventDefault();
    const list = { name: name };
    console.log(listId);
    const response = await fetch(
      "http://localhost:8000/api/lists/update/" + listId,
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
      setName("");
      console.log("list updated", json);

      refreshLists();
      document.getElementById("update" + listId).close();
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div data-theme>
          <dialog
            id={`update${listId}`}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3
                className="font-bold text-lg text-center"
                style={{ marginBottom: "20px" }}
              >
                Change list's name
              </h3>

              <label className="input input-bordered flex items-center gap-2 input-accent">
                New name →
                <input
                  type="text"
                  className="grow"
                  placeholder="..."
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
              {error && <div>{error}</div>}
              <div className="modal-action">
                <button type="submit">Change</button>
              </div>
            </div>
          </dialog>
        </div>
      </form>
    </>
  );
}
