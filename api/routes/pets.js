const express = require("express");
const router = express.Router();
const {add_pet, get_pets, get_pet, update_pet, delete_pet} = require("../controllers/pets");

router.get("/",get_pets);
router.get(":/id",get_pet);
router.post("/",add_pet);
router.put("/",update_pet);
router.delete("/",delete_pet);

module.exports = router;