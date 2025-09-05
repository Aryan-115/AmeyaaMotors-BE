const {createProduct, updateProduct, deleteProduct, getProducts, getProductsByName, blacklistProduct, removeFromBlacklist} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer")

const router = require("express").Router();

router.post("/create-product", verifyToken, upload.array("images",4), createProduct)

router.put("/update-product/:id", verifyToken, updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/get-products", getProducts);

router.get("/get-products-by-name/:name", getProductsByName);

router.put("/blacklist-product/:id", verifyToken, blacklistProduct);

router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist)

module.exports = router;