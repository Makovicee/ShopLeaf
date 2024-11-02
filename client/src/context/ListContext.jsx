import React, { createContext, useState, useEffect, useContext } from "react";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [listsData, setListsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://shop-leaf-backend.onrender.com/api/lists"
      );
      const json = await response.json();
      if (response.ok) {
        setListsData(json);
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);

  const refreshLists = () => {
    fetchLists();
  };

  return (
    <ListContext.Provider value={{ listsData, refreshLists, loading }}>
      {children}
    </ListContext.Provider>
  );
}

export const useListContext = () => useContext(ListContext);
