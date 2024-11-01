import React from "react";
import Icon from "@mdi/react";
import {
  mdiAccountStarOutline,
  mdiAccountSupervisor,
  mdiPlusBox,
  mdiDeleteForever,
  mdiCubeOutline,
  mdiCheckBold,
  mdiCloseThick,
  mdiAccountPlus,
  mdiFountainPenTip,
  mdiEyeCircle,
  mdiEyeCircleOutline,
  mdiTagCheck,
  mdiTagRemove,
  mdiEye,
  mdiBookmarkRemove,
  mdiAccountRemove,
  mdiExitRun,
  mdiRun,
} from "@mdi/js";
import { useState, useEffect, useContext } from "react";
import RadialProgress from "./RadialProgress";
import AddItemModal from "./AddItemModal";
import { useListContext } from "../context/ListContext";
import UpdateListModal from "./UpdateListModal";
import AddMemberModal from "./AddMemberModal";
import { UserContext } from "../context/UserProvider";
import KickMemberModal from "./KickMemberModal";
export default function ListCard({ list }) {
  const [done, setDone] = useState(Array(list.items.length).fill(false));
  const [showAll, setShowAll] = useState(true);
  const { listsData, refreshLists } = useListContext();
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const currentUser = userList.find((user) => user.id === loggedInUser);
  console.log(showAll);
  const filteredListItems = showAll
    ? list.items.filter((item) => item.status === true || item.status === false)
    : list.items.filter((item) => item.status === false);
  async function handleCheck(itemId, state) {
    const response = await fetch(
      "http://https://shop-leaf-backend.onrender.com/api/lists/itemDone/" +
        list._id +
        "/" +
        itemId,
      {
        method: "PATCH",
        body: JSON.stringify({ status: state }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("done:", json);

      refreshLists();
    }
  }

  async function handleDelete() {
    const response = await fetch(
      "http://https://shop-leaf-backend.onrender.com/api/lists/delete/" +
        list._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("deleted:", json);
      refreshLists();
    }
  }

  async function handleDeleteItem(itemId) {
    const response = await fetch(
      "http://https://shop-leaf-backend.onrender.com/api/lists/itemDelete/" +
        list._id +
        "/" +
        itemId,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("deleted:", json);

      refreshLists();
    }
  }

  async function handleLeave(user, listId) {
    const list = user;
    console.log(list);
    const response = await fetch(
      "http://https://shop-leaf-backend.onrender.com/api/lists/kickMember/" +
        listId,
      {
        method: "DELETE",
        body: JSON.stringify(list),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("user left:", json);

      refreshLists();
    }
  }

  const completedItems = list.items.filter(
    (item) => item.status === true
  ).length;
  const allItems = list.items.length;

  const listMembers = list.members.map((member, i) => (
    <li key={i}>{member}</li>
  ));

  const listItems = filteredListItems.map((item, i) => (
    <>
      <li
        key={i}
        className="flex items-center list-inside list-disc border-b-2 border-neutral"
        style={item.status ? { textDecoration: "line-through" } : {}}
      >
        {item.name}
        <div className="flex justify-end w-full gap-2">
          <Icon
            onClick={() => handleCheck(item._id, !item.status)}
            path={item.status ? mdiCloseThick : mdiCheckBold}
            size={0.9}
          />

          <Icon
            onClick={() => handleDeleteItem(item._id)}
            path={mdiBookmarkRemove}
            size={0.8}
          />
        </div>
      </li>
    </>
  ));
  //TODO: Add key to the <li> elements
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border-base-300 bg-primary border text-primary-content card-bordered border-8 border-neutral"
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-center    ">
        <div class="grid grid-cols-6 gap-4 items-center">
          <div className="col-span-1">
            {list.status === currentUser.name ? (
              <Icon path={mdiAccountStarOutline} size={1.25} />
            ) : (
              <Icon path={mdiAccountSupervisor} size={1.25} />
            )}
          </div>
          <div className="col-span-5 flex items-center ">
            <span className=" text-xl">
              {completedItems}/{allItems}
            </span>

            <Icon path={mdiCubeOutline} size={1.15} />
          </div>
        </div>

        <div className="text-xl text-center ml-7">{list.name}</div>
      </div>
      <div className="collapse-content">
        <div className="items-center card-actions justify-center">
          {list.status === currentUser.name && (
            <div>
              <button
                className="btn btn-negative btn-xl btn-circle mb-3  "
                onClick={() =>
                  document.getElementById("update" + list._id).showModal()
                }
              >
                <Icon path={mdiFountainPenTip} size={1.15} />
              </button>
              <UpdateListModal listId={list._id} />
            </div>
          )}
          <div>
            <button
              className="btn btn-negative btn-xl btn-circle mb-3  "
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <Icon path={mdiTagCheck} size={1.15} />
              ) : (
                <Icon path={mdiTagRemove} size={1.15} />
              )}
            </button>
          </div>
        </div>
        <div className="card bg-secondary text-primary-content w-96  card-bordered border-4 border-neutral">
          <div className="card-body ">
            <ul className="list-disc pl-5 ">{listItems}</ul>
            <div className="flex justify-center ">
              {list.items.length > 0 ? (
                <RadialProgress value={(completedItems / allItems) * 100} />
              ) : (
                <h3>No items</h3>
              )}
            </div>
            <div className="flex justify-center">
              <div tabIndex={0} className="collapse collapse-arrow  bg-ghost ">
                <input type="checkbox" />
                <div className="collapse-title text-xs font-medium text-center ">
                  Show members
                </div>
                <div className="collapse-content">
                  <ul className="list-disc pl-5">{listMembers}</ul>
                </div>
              </div>
            </div>
            <div className="card-actions justify-center">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("add" + list._id).showModal()
                }
              >
                <Icon path={mdiPlusBox} size={1.25} color={"white"} />
              </button>

              <AddItemModal listId={list._id} />
              {list.status !== currentUser.name && (
                <button
                  className="btn"
                  onClick={() =>
                    handleLeave({ member: currentUser.name }, list._id)
                  }
                >
                  <Icon path={mdiExitRun} size={1.25} color={"white"} />
                </button>
              )}

              {list.status === currentUser.name && (
                <>
                  <button className="btn" onClick={handleDelete}>
                    <Icon path={mdiDeleteForever} size={1.25} color={"white"} />
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      document
                        .getElementById("addMember" + list._id)
                        .showModal()
                    }
                  >
                    <Icon path={mdiAccountPlus} size={1.25} color={"white"} />
                  </button>
                  <AddMemberModal
                    listId={list._id}
                    members={list.members}
                    owner={list.status}
                  />
                  <button
                    className="btn"
                    onClick={() =>
                      document
                        .getElementById("kickMember" + list._id)
                        .showModal()
                    }
                  >
                    <Icon path={mdiAccountRemove} size={1.25} color={"white"} />
                  </button>
                  <KickMemberModal
                    listId={list._id}
                    members={list.members}
                    owner={list.status}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
