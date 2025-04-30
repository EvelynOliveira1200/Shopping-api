const brandsModel = require("../models/brandsModel");

const getBrands = async (req, res) => {
  try {
    const brands = await brandsModel.getBrands();
    res.status(200).json(brands);
  } catch {
    res.status(500).json({ message: "Erro ao buscar marcas" });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await brandsModel.getBrandById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Marca não encontrada" });
    }
    res.status(200).json(brand);
  } catch {
    res.status(500).json({ message: "Erro ao buscar marca" });
  }
};

const createBrand = async (req, res) => {
  try {
    const { nome, pais_origem } = req.body;

    if (!nome || !pais_origem) {
      return res.status(400).json({ message: "Nome e país de origem são obrigatórios." });
    }

    const newBrand = await brandsModel.createBrand(nome, pais_origem);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Marca já cadastrada." });
    }
    res.status(500).json({ message: "Erro ao criar marca." });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { nome, pais_origem } = req.body;
    const updatedBrand = await brandsModel.updateBrand(req.params.id, nome, pais_origem);

    if (!updatedBrand) {
      return res.status(404).json({ message: "Marca não encontrada" });
    }

    res.json(updatedBrand);
  } catch {
    res.status(500).json({ message: "Erro ao atualizar marca" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const result = await brandsModel.deleteBrand(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message || "Erro ao deletar marca" });
  }
};

module.exports = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
