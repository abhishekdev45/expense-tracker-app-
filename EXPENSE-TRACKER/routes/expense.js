const express = require("express");
const expenseControllers = require("../controllers/expense")

const router = express.Router();

router.post("/add-data",expenseControllers.postUserData);
router.get("/get-data",expenseControllers.getUserData);
router.delete("/delete-data/:id",expenseControllers.postDeleteData);
// router.put('/update-data/:id', expenseControllers.postUpdateData);

module.exports = router;