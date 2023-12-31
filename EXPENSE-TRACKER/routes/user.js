const express = require("express");
const userControllers = require("../controllers/user");

const router = express.Router();

router.post("/sign-up",userControllers.postAddUser);
router.post("/login" , userControllers.login);
router.get("/download", userControllers.getDownload);

module.exports = router;