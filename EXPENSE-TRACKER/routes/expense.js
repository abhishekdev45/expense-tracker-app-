const express = require("express");
const expenseControllers = require("../controllers/expense")
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/add-data",auth.authenticate ,expenseControllers.postUserData);
router.get("/get-data"  ,auth.authenticate ,expenseControllers.getUserData);
router.delete("/delete-data/:id",auth.authenticate ,expenseControllers.postDeleteData);
// router.put('/update-data/:id', expenseControllers.postUpdateData);

module.exports = router;