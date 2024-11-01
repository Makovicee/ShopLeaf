import React from "react";
import { useState, useContext } from "react";
import AddListButton from "./AddListButton";
import { useListContext } from "../context/ListContext";
import { UserContext } from "../context/UserProvider";
export default function AddMemberModal({ listId, members, owner }) {
  const [member, setMember] = useState("");
  const [error, setError] = useState(null);
  const { listsData, refreshLists } = useListContext();
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const filteredUserMenu = userList.filter(
    (user) => user.name !== owner && !members.includes(user.name)
  );
  const userMenu = filteredUserMenu.map((user, i) => (
    <option key={i} value={user.name}>
      {user.name}
    </option>
  ));

  async function handleSubmit(e) {
    e.preventDefault();
    const list = { member };

    const response = await fetch(
      "https://shop-leaf-backend.onrender.com/api/lists/addMember/" + listId,
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
      setMember("");

      refreshLists();
      document.getElementById("addMember" + listId).close();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div data-theme>
          <dialog
            id={`addMember${listId}`}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box ">
              <h3
                className="font-bold text-lg text-center"
                style={{ marginBottom: "20px" }}
              >
                Add new member to the list
              </h3>

              <label className="input input-bordered flex items-center gap-2 input-accent h-20">
                Member →
                <select
                  className="select select-ghost w-full max-w-xs text-center"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                >
                  <option disabled value="">
                    Select member
                  </option>
                  {userMenu}
                </select>
              </label>
              {error && <div>{error}</div>}
              <div className="modal-action">
                <button type="submit">Add member</button>
              </div>
            </div>
          </dialog>
        </div>
      </form>
    </>
  );
}
