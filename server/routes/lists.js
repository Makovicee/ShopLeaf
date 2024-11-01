const express = require("express");
const router = express.Router();

const {
  createList,
  getLists,
  deleteList,
  updateList,
  addItem,
  addMember,
  itemDone,
  itemDelete,
  kickMember,
} = require("../controllers/controller");
//get all lists
router.get("/", getLists);

//create list
router.post("/create", createList);

//delete
router.delete("/delete/:id", deleteList);
//update
router.patch("/update/:id", updateList);

router.patch("/add/:id", addItem);

router.patch("/addMember/:id", addMember);

router.patch("/itemDone/:listId/:itemId", itemDone);

router.delete("/itemDelete/:listId/:itemId", itemDelete);

router.delete("/kickMember/:id", kickMember);

module.exports = router;
