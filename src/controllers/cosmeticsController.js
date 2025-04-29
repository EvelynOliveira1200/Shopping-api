const cosmeticsModel = require("../models/cosmeticsModel");

const getCosmetics = async (req, res) => {
  try {
    const {name} = req.query
    const cosmetics = await cosmeticsModel.getCosmetics(name);
    res.status(200).json(cosmetics);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar cosméticos" });
  }
};

const getCosmeticById = async (req, res) => {
  try {
    const cosmetic = await cosmeticsModel.getCosmeticById(req.params.id);
    if (!cosmetic) {
      res.status(404).json({ message: "Cosmetic não encontrado" });
    }
    res.status(200).json(cosmetic);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar cosmetic" });
  }
};

const createCosmetic = async (req, res) => {
  try {
    const { brand_id, nome, categoria, price_cosmetic, quantidade_disponivel } = req.body;
    const photo = req.file ? req.file.filename : null;
    const newCosmetic = await cosmeticsModel.createCosmetic(
      brand_id,
      nome,
      categoria,
      price_cosmetic,
      quantidade_disponivel,
      photo
    );
    res.status(201).json(newCosmetic);
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      res.status(400).json({ message: "Cosmetico já cadastrado" });
    }
    res.status(404).json({ message: "Erro ao criar cosmetico" });
  }
};

const updateCosmetic = async (req, res) => {
  try {
    const { quantidade_disponivel } = req.body;
    const updateCosmetic = await cosmeticsModel.updateCosmetic(
      req.params.id,
      quantidade_disponivel
    );
    if (!updateCosmetic) {
      res.status(404).json({ message: "Cosmetico não encontrado." });
    } else {
      res.json(updateCosmetic);
    }
  } catch (error) {
    res.status(404).json({ message: "Erro ao atualizar cosmetico." });
  }
};

const deleteCosmetic = async (req, res) => {
  try {
    const message = await cosmeticsModel.deleteCosmetic(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(404).json({ message: "Erro ao deletar ingresso" });
  }
};

module.exports = { getCosmetics, getCosmeticById, createCosmetic, updateCosmetic, deleteCosmetic };