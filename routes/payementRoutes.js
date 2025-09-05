const router = require("express").Router();
const { generatePayement, verifyPayement } = require("../controllers/payementController");
const verifyToken = require("../middlewares/verifyToken")

router.post("/generate-payement", verifyToken, generatePayement)

router.post("/verify-payement", verifyToken, verifyPayement)

module.exports = router;