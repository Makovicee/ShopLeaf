import React, { useContext } from "react";
import Icon from "@mdi/react";
import { mdiAccountCircleOutline, mdiLeaf } from "@mdi/js";
import ThemeController from "./ThemeController";
import { UserContext } from "../context/UserProvider";
export default function NavBar() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log(userList.find((user) => user.id === loggedInUser));
  console.log(loggedInUser);
  const currentUser = userList.find((user) => user.id === loggedInUser);
  const userMenu = userList.map((user, i) => (
    <li key={i} className="hover:text-secondary underline">
      <a onClick={() => setLoggedInUser(user.id)}>{user.name}</a>
    </li>
  ));

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <ThemeController />
      </div>
      <div className="navbar-center ">
        <a className="btn btn-ghost text-xl">
          ShopLeaf
          <Icon path={mdiLeaf} size={1} color={"limegreen"} />
        </a>
      </div>
      <div className="navbar-end">
        <div>{currentUser.name}</div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Icon path={mdiAccountCircleOutline} size={1} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-neutral text-primary  rounded-box   w-52 p-2 shadow text-right dropdown-hover "
          >
            {userMenu}
            <li>Log out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
