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
  const { listsData, refreshLists } = useListContext();
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
  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(
        "https://shop-leaf-backend.onrender.com/api/lists"
      );
      const json = await response.json();

      if (response.ok) {
        setListsData(json); //probably remove
      }
    };
    fetchLists();
  }, []);

  return (
    <>
      <Search onSearch={setSearch} />
      {isEmpty ? (
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
