const express = require("express");
const userControllers = require("../controllers/user");

const router = express.Router();

router.post("/sign-up",userControllers.postAddUser);
router.get("/login" , userControllers.login);

module.exports = router;