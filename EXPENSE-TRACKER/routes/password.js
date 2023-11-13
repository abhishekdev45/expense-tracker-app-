const express = require("express");
const passwordControllers = require("../controllers/password");

const router = express.Router();

router.post("/forgotPassword" , passwordControllers.forgotPassword);
router.get("/resetPasword/:requestId" , passwordControllers.getResetPassword);
router.post('/updatePassword' , passwordControllers.postUpdatePassword);

module.exports = router;