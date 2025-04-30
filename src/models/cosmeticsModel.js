const pool = require("../config/database");

// Função para buscar todos os cosméticos (com ou sem filtro por nome)
const getCosmetics = async (name) => {
  if (name && name.trim()) {
    const result = await pool.query(
      `SELECT cosmetics.*, brands.nome AS brand_name 
       FROM cosmetics 
       LEFT JOIN brands ON cosmetics.brand_id = brands.id 
       WHERE cosmetics.nome ILIKE $1`,
      [`%${name.trim()}%`]
    );
    return result.rows;
  }

  const result = await pool.query(
    `SELECT cosmetics.*, brands.nome AS brand_name 
     FROM cosmetics 
     LEFT JOIN brands ON cosmetics.brand_id = brands.id`
  );
  return result.rows;
};

// Função para buscar um cosmético por ID
const getCosmeticById = async (id) => {
  const result = await pool.query("SELECT * FROM cosmetics WHERE id = $1", [id]);
  return result.rows[0];
};

// Função para criar um novo cosmético
const createCosmetic = async (brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo) => {
  const result = await pool.query(
    `INSERT INTO cosmetics (brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo]
  );
  return result.rows[0];
};

// Função para atualizar a quantidade disponível de um cosmético
const updateCosmetic = async (id, quantidade_disponivel) => {
  const result = await pool.query(
    `UPDATE cosmetics 
     SET quantidade_disponivel = $1 
     WHERE id = $2 RETURNING *`,
    [quantidade_disponivel, id]
  );
  return result.rows[0];
};

// Função para deletar um cosmético
const deleteCosmetic = async (id) => {
  const result = await pool.query(
    `DELETE FROM cosmetics 
     WHERE id = $1 RETURNING *`,
    [id]
  );

  if (result.rowCount === 0) {
    return { error: "Cosmetic not found" };
  }

  return { message: "Cosmético deletado com sucesso" };
};

// Exportação das funções
module.exports = {
  getCosmetics,
  getCosmeticById,
  createCosmetic,
  updateCosmetic,
  deleteCosmetic,
};