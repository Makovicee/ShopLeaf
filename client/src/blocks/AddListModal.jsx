import React from "react";
import { useState, useContext } from "react";
import AddListButton from "./AddListButton";
import { useListContext } from "../context/ListContext";
import { UserContext } from "../context/UserProvider";
export default function AddListModal() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const { listsData, refreshLists } = useListContext();
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const currentUser = userList.find((user) => user.id === loggedInUser);
  async function handleSubmit(e) {
    e.preventDefault();
    const list = { name, status: currentUser.name, members: currentUser.name };

    const response = await fetch(
      "https://shop-leaf-backend.onrender.com/api/lists/create",
      {
        method: "POST",
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
      console.log("new list created", json);

      refreshLists();
      document.getElementById("addListModal").close();
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <dialog
          id="addListModal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3
              className="font-bold text-lg text-center"
              style={{ marginBottom: "20px" }}
            >
              Create new list
            </h3>

            <label className="input input-bordered flex items-center gap-2 input-accent">
              Name →
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
              <button type="submit">Create List</button>
            </div>
          </div>
        </dialog>
      </form>
    </>
  );
}
