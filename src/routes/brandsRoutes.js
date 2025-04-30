const express = require("express");
const router = express.Router();
const brandsController = require("../controllers/brandsController");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

router.get("/brands", brandsController.getBrands);
router.get("/brands/:id", brandsController.getBrandById);
router.post("/brands", brandsController.createBrand);
router.put("/brands/:id", brandsController.updateBrand);
router.delete("/brands/:id", brandsController.deleteBrand);

module.exports = router;