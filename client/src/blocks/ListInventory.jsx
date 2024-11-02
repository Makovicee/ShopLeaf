import React from "react";
import ListCard from "./ListCard";
import ListProgress from "./ListProgress";
import Icon from "@mdi/react";
import { mdiSpiderThread, mdiBugOutline } from "@mdi/js";
import { useState, useEffect } from "react";
import Search from "./Search";
import Error from "./ErrorCard";
import AddListButton from "./AddListButton";
import AddListModal from "./AddListModal";
import { useListContext } from "../context/ListContext";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
export default function ListInventory() {
  const [search, setSearch] = useState("");
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const currentUser = userList.find((user) => user.id === loggedInUser);
  const { listsData, refreshLists, loading } = useListContext();
  const filteredListData =
    listsData &&
    listsData.filter(
      (list) =>
        list.name.toLowerCase().includes(search.toLowerCase()) &&
        list.members.includes(currentUser.name)
    );
  const isEmpty =
    listsData &&
    listsData.filter((list) => list.members.includes(currentUser.name))
      .length === 0;
  const badSearch = listsData && filteredListData.length === 0;

  return (
    <>
      <Search onSearch={setSearch} />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-ring loading-lg"></span> <br />
          <p>Waiting for the server to awake from sleep ...</p>
        </div>
      ) : isEmpty ? (
        <>
          <Error
            title={"Lets get started!"}
            text={
              "You currently have no leaves add them by clicking the Add button below. Have fun!"
            }
            icon={mdiSpiderThread}
          />
        </>
      ) : badSearch ? (
        <Error
          title={"This doesn't seem right..."}
          text={"No leaves matching your search input."}
          icon={mdiBugOutline}
        />
      ) : (
        <div className="flex justify-center flex-wrap gap-4 h-96">
          {filteredListData &&
            filteredListData.map((list) => (
              <div key={list._id}>
                <ListCard list={list} />
              </div>
            ))}
        </div>
      )}
      <div className="flex justify-center">
        <AddListButton
          event={() => document.getElementById("addListModal").showModal()}
        />

        <AddListModal />
      </div>
    </>
  );
}
