import React, { createContext, useState, useEffect, useContext } from "react";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [listsData, setListsData] = useState(null);

  const fetchLists = async () => {
    const response = await fetch(
      "https://shop-leaf-backend.onrender.com/api/lists"
    );
    const json = await response.json();
    if (response.ok) {
      setListsData(json);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const refreshLists = () => {
    fetchLists();
  };

  return (
    <ListContext.Provider value={{ listsData, refreshLists }}>
      {children}
    </ListContext.Provider>
  );
}

export const useListContext = () => useContext(ListContext);
