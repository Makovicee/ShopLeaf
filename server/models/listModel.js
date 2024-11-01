const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { _id: true }
); // This automatically adds an `_id` field to each item

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [itemSchema],
      required: false,
    },
    status: {
      type: String,
      required: false, //change to true later on
    },
    members: {
      type: Array,
      required: false, //change to true later on
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
