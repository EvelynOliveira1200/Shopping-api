const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Rota para gerar PDF de marcas
router.get("/report/brands/pdf", reportController.exportBrandsPDF);

// Rota para gerar PDF de cosméticos
router.get("/report/cosmetics/pdf", reportController.exportCosmeticsPDF);

module.exports = router;