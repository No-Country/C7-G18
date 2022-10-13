const express = require("express");
const router = express.Router();
const {add_category, get_categories, get_category, update_category, delete_category} = require("../controllers/category");

router.get("/",get_categories);
router.get(":/id",get_category);
router.post("/",add_category);
router.put("/",update_category);
router.delete("/",delete_category);

module.exports = router;