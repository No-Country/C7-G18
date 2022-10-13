const express = require("express");
const router = express.Router();
const {add_brand, get_brands, get_brand, update_brand, delete_brand} = require("../controllers/brand");

router.get("/",get_brands);
router.get(":/id",get_brand);
router.post("/",add_brand);
router.put("/",update_brand);
router.delete("/",delete_brand);

module.exports = router;