const express = require("express");
const router = express.Router();
const {add_product, get_products, get_product, update_product, delete_product} = require("../controllers/products");

router.get("/",get_products);
router.get(":/id",get_product);
router.post("/",add_product);
router.put("/",update_product);
router.delete("/",delete_product);

module.exports = router;