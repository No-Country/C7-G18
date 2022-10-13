const express = require("express");
const router = express.Router();
const {add_subcategory, get_subcategories, get_subcategory, update_subcategory, delete_subcategory} = require("../controllers/subcategory");

router.get("/",get_subcategories);
router.get(":/id",get_subcategory);
router.post("/",add_subcategory);
router.put("/",update_subcategory);
router.delete("/",delete_subcategory);

module.exports = router;