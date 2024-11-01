import React from "react";
import NavBar from "./blocks/NavBar";

import ListInventory from "./blocks/ListInventory";
import { ListProvider } from "./context/ListContext";
import UserProvider from "./context/UserProvider";
function App() {
  return (
    <>
      <UserProvider>
        <ListProvider>
          <NavBar />
          <ListInventory />
        </ListProvider>
      </UserProvider>
    </>
  );
}

export default App;
