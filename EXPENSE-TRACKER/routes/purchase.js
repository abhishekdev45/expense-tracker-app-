const express = require("express");
const purchaseControllers = require("../controllers/purchase")
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/updatetransactionstatus",auth.authenticate ,purchaseControllers.updateTransactionStatus);
router.get("/premiummembership"  ,auth.authenticate ,purchaseControllers.purchasePremium); 


module.exports = router;