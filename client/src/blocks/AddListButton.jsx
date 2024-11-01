import React from "react";
import Icon from "@mdi/react";
import { mdiSeedPlusOutline } from "@mdi/js";
export default function AddListButton({ event }) {
  return (
    <button
      onClick={event}
      className="btn btn-lg btn-circle"
      style={{ position: "fixed", bottom: 30 }}
    >
      <Icon path={mdiSeedPlusOutline} size={1.5} />
    </button>
  );
}
