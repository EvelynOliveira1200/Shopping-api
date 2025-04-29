const brandsModel = require("../models/brandsModel");

const getBrands = async (req, res) => {
  try {
    const brands = await brandsModel.getBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar Brands" });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await brandsModel.getBrandById(req.params.id);
    if (!brand) {
      res.status(404).json({ message: "Brand não encontrado" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar brand" });
  }
};

const createBrand = async (req, res) => {
  try {
    const { nome, pais_origem } = req.body;
    const newBrand = await brandsModel.createBrand(nome, pais_origem);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "Brand já cadastrado." });
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
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar marca" }); 
  }
};

const deleteBrand = async (req, res) => {
  try {
    const result = await brandsModel.deleteBrand(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message || "Erro ao deletar brand" });
  }
};

module.exports = { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };