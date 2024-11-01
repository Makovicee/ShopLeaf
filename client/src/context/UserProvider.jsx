import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState("1");
  const value = {
    userList: [
      { id: "1", name: "Šmajdalf" },
      { id: "2", name: "Bobromil" },
      { id: "3", name: "Fritol" },
    ],
    loggedInUser,
    setLoggedInUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
