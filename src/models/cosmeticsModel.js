const pool = require("../config/database");

const getCosmetics = async (name) => {
  if (name && name.trim()) {
    const result = await pool.query(
      `SELECT cosmetics.*, brands.nome AS brand_name 
       FROM cosmetics 
       LEFT JOIN brands ON cosmetics.brand_id = brands.id 
       WHERE cosmetics.nome ILIKE $1`, [`%${name.trim()}%`]
    );
    return result.rows;
  } else {
    const result = await pool.query(
      "SELECT cosmetics.*, brands.nome AS brand_name FROM cosmetics LEFT JOIN brands ON cosmetics.brand_id = brands.id"
    );
    return result.rows;
  }
};

const getCosmeticById = async (id) => {
  const result = await pool.query("SELECT * FROM cosmetics WHERE id = $1", [id]);
  return result.rows[0];
};

const createCosmetic = async (brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo) => {
  const result = await pool.query(
    "INSERT INTO cosmetics (brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [brand_id, nome, categoria, price_cosmetic, quantidade_disponivel, photo]
  );
  return result.rows[0];
};

const updateCosmetic = async (id, quantidade_disponivel) => {
  const result = await pool.query(
    "UPDATE cosmetics SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
    [quantidade_disponivel, id]
  );
  return result.rows[0];
};

const deleteCosmetic = async (id) => {
  const result = await pool.query("DELETE FROM cosmetics WHERE id = $1 RETURNING *", [id]);
  if (result.rowCount === 0) {
    return { error: "Cosmetic not found" };
  }
  return { message: "Cosmetic successfully deleted" };
};

module.exports = { getCosmetics, getCosmeticById, createCosmetic, updateCosmetic, deleteCosmetic };