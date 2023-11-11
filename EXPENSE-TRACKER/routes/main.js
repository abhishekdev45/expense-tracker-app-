
const express = require("express");
const mainControllers = require("../controllers/main")

const router = express.Router();

router.get("/",mainControllers.getMainPage);

module.exports = router;