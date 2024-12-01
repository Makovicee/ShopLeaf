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

const {
  listValidationSchema,
  updateListSchema,
} = require("../validation/listValidation");
const { validateDtoIn } = require("../validation/validateMiddleware");
const { idValidation } = require("../validation/idValidation");

//get all lists
router.get("/", getLists);

//create list
router.post("/create", validateDtoIn(listValidationSchema), createList);

//delete
router.delete("/delete/:id", idValidation, deleteList);
//update
router.patch(
  "/update/:id",
  validateDtoIn(updateListSchema),
  idValidation,
  updateList
);

router.patch("/add/:id", addItem);

router.patch("/addMember/:id", addMember);

router.patch("/itemDone/:listId/:itemId", itemDone);

router.delete("/itemDelete/:listId/:itemId", itemDelete);

router.delete("/kickMember/:id", kickMember);

module.exports = router;
