const express = require("express");
const premiumControllers = require("../controllers/premium")
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/showLeaderBoard"  ,auth.authenticate ,premiumControllers.getLeaderBoardData);

module.exports = router;