const PDFDocument = require("pdfkit");
const brandsModel = require("../models/brandsModel");
const cosmeticsModel = require("../models/cosmeticsModel");

// PDF de Marcas
const exportBrandsPDF = async (req, res) => {
  try {
    const brands = await brandsModel.getBrands();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=brands.pdf");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Título
    doc.fontSize(20).text("Relatório de Marcas", { align: "center", underline: true });
    doc.moveDown(1);

    // Cabeçalho
    doc.fontSize(14).fillColor("black").text("ID | Nome da Marca | País de Origem", {
      underline: true,
    });
    doc.moveDown(0.5);

    // Conteúdo
    let isAlternate = false;
    brands.forEach((brand) => {
      if (isAlternate) {
        doc.fillColor("#f0f0f0").rect(50, doc.y, 500, 15).fill();
      }
      doc
        .fillColor("black")
        .text(`${brand.id} | ${brand.nome} | ${brand.pais_origem}`, {
          continued: false,
        });
      doc.moveDown(0.5);
      isAlternate = !isAlternate;
    });

    doc.end();
  } catch (error) {
    console.error("Erro ao gerar o PDF de marcas:", error);
    res.status(500).json({ message: "Erro ao gerar o PDF de marcas" });
  }
};

// PDF de Cosméticos
const exportCosmeticsPDF = async (req, res) => {
  try {
    const cosmetics = await cosmeticsModel.getCosmetics();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=cosmeticos.pdf");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Título
    doc
      .fontSize(20)
      .text("Relatório de Cosméticos", { align: "center", underline: true });
    doc.moveDown(1);

    // Cabeçalho
    doc.fontSize(12).fillColor("black").text(
      "ID | Nome | Categoria | Preço | Quantidade | Marca",
      { underline: true }
    );
    doc.moveDown(0.5);

    // Conteúdo com linhas alternadas
    let isAlternate = false;
    cosmetics.forEach((cosmetic) => {
      if (isAlternate) {
        doc.fillColor("#f0f0f0").rect(50, doc.y, 500, 15).fill();
      }

      const preco = `R$ ${parseFloat(cosmetic.price_cosmetic).toFixed(2).replace(".", ",")}`;

      doc
        .fillColor("black")
        .text(
          `${cosmetic.id} | ${cosmetic.nome} | ${cosmetic.categoria} | ${preco} | ${cosmetic.quantidade_disponivel} | ${cosmetic.brand_name}`
        );
      doc.moveDown(0.5);
      isAlternate = !isAlternate;
    });

    doc.end();
  } catch (error) {
    console.error("Erro ao gerar o PDF de cosméticos:", error);
    res.status(500).json({ message: "Erro ao gerar o PDF de cosméticos" });
  }
};

module.exports = {
  exportBrandsPDF,
  exportCosmeticsPDF,
};
