import React from "react";
import Icon from "@mdi/react";
import { mdiEyeCircleOutline, mdiEyeCircle } from "@mdi/js";

export default function Swap() {
  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" />

      {/* sun icon */}

      <Icon
        path={mdiEyeCircleOutline}
        size={2}
        className="swap-on h-10 w-10 fill-current"
      ></Icon>

      {/* moon icon */}

      <Icon
        path={mdiEyeCircle}
        size={2}
        className="swap-off h-10 w-10 fill-current"
      ></Icon>
    </label>
  );
}
