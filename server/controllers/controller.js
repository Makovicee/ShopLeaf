const { json } = require("express");
const List = require("../models/listModel");
const mongoose = require("mongoose");
//get all lists
const getLists = async (req, res) => {
  const lists = await List.find({}).sort({ createdAt: -1 });
  res.status(200).json(lists);
};

//create list
const createList = async (req, res) => {
  const { name, items, status, members } = req.body;
  try {
    const list = await List.create({ name, items, status, members });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete list
const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findOneAndDelete({ _id: id });

    if (!list) {
      return res
        .status(404)
        .json({ error: "No such list exists in the database" });
    }

    res.status(200).json({ message: "List deleted successfully", list });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

//update list
const updateList = async (req, res) => {
  const { id } = req.params;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such list exists in the database" });
  }

  // Attempt to update the list
  const list = await List.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  // If the list is not found, return a 404 error
  if (!list) {
    return res
      .status(404)
      .json({ error: "No such list exists in the database" });
  }

  // Return the updated list
  res.status(200).json(list);
};

const addItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  const list = await List.findOneAndUpdate(
    { _id: id },
    { $push: { items: req.body } }
  );

  if (!list) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  res.status(200).json(list);
};
const addMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  const list = await List.findOneAndUpdate(
    { _id: id },
    { $push: { members: req.body.member } }
  );

  if (!list) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  res.status(200).json(list);
};
const itemDone = async (req, res) => {
  const { listId, itemId } = req.params;
  const { status } = req.body;

  // Validate listId
  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return res.status(404).json({ error: "Invalid list ID" });
  }

  try {
    // Update the item's status
    const list = await List.findOneAndUpdate(
      { _id: listId, "items._id": itemId }, // Match list and item by custom id
      { $set: { "items.$.status": status } }, // Set status
      { new: true } // Return updated document
    );

    if (!list) {
      return res.status(404).json({ error: "List or item not found" });
    }

    // Send the successful response only once
    return res.status(200).json(list);
  } catch (error) {
    // Log and send an error response
    console.error("Error updating item status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const itemDelete = async (req, res) => {
  const { listId, itemId } = req.params;

  // Validate listId and itemId
  if (
    !mongoose.Types.ObjectId.isValid(listId) ||
    !mongoose.Types.ObjectId.isValid(itemId)
  ) {
    return res.status(404).json({ error: "Invalid list or item ID" });
  }

  console.log("List ID:", listId);
  console.log("Item ID:", itemId);

  try {
    // Update the item's status
    const list = await List.findByIdAndUpdate(
      listId,
      { $pull: { items: { _id: itemId } } }, // Remove item with matching _id from items array
      { new: true } // Return the updated list after deletion
    );

    if (!list) {
      return res.status(404).json({ error: "List or item not found" });
    }

    // Send the successful response only once
    return res.status(200).json(list);
  } catch (error) {
    // Log and send an error response
    console.error("Error updating item status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const kickMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  const list = await List.findOneAndUpdate(
    { _id: id },
    { $pull: { members: req.body.member } }
  );

  if (!list) {
    res.status(404).json({ error: "No such list exits in the database" });
  }

  res.status(200).json(list);
};
module.exports = {
  createList,
  getLists,
  deleteList,
  updateList,
  addItem,
  addMember,
  itemDone,
  itemDelete,
  kickMember,
};
