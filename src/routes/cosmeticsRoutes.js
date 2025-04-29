const express = require("express");
const router = express.Router();
const cosmeticsController = require("../controllers/cosmeticsController");
const upload = require("../config/upload");

router.get("/cosmetics", cosmeticsController.getCosmetics);
router.get("/cosmetics/:id", cosmeticsController.getCosmeticById);
router.post("/cosmetics",  upload.single("photo"), cosmeticsController.createCosmetic);
router.put("/cosmetics/:id", cosmeticsController.updateCosmetic);
router.delete("/cosmetics/:id", cosmeticsController.deleteCosmetic);

module.exports = router;