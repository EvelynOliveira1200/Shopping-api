const cosmeticsModel = require("../models/cosmeticsModel");

// Controller para buscar todos os cosméticos
const getCosmetics = async (req, res) => {
  try {
    const { name } = req.query;
    const cosmetics = await cosmeticsModel.getCosmetics(name);
    res.status(200).json(cosmetics);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar Cosméticos" });
  }
};

// Controller para buscar um cosmético por ID
const getCosmeticById = async (req, res) => {
  try {
    const cosmetic = await cosmeticsModel.getCosmeticById(req.params.id);
    if (!cosmetic) {
      return res.status(404).json({ message: "Cosmético não encontrado" });
    }
    res.status(200).json(cosmetic);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar cosmético" });
  }
};

// Controller para criar um novo cosmético
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
    console.error(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Cosmético já cadastrado" });
    }
    res.status(404).json({ message: "Erro ao criar  cosmético" });
  }
};

// Controller para atualizar um cosmético
const updateCosmetic = async (req, res) => {
  try {
    const { quantidade_disponivel } = req.body;

    const updatedCosmetic = await cosmeticsModel.updateCosmetic(
      req.params.id,
      quantidade_disponivel
    );

    if (!updatedCosmetic) {
      return res.status(404).json({ message: "Cosmético não encontrado." });
    }

    res.json(updatedCosmetic);
  } catch (error) {
    res.status(404).json({ message: "Erro ao atualizar  cosmético." });
  }
};

// Controller para deletar um cosmético
const deleteCosmetic = async (req, res) => {
  try {
    const message = await cosmeticsModel.deleteCosmetic(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(404).json({ message: "Erro ao deletar  cosmético" });
  }
};

// Exportação dos controllers
module.exports = {
  getCosmetics,
  getCosmeticById,
  createCosmetic,
  updateCosmetic,
  deleteCosmetic,
};