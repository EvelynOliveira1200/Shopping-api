const pool = require("../config/database");

const getBrands = async () => {
  const result = await pool.query("SELECT * FROM brands");
  return result.rows;
};

const getBrandById = async (id) => {
  const result = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
  return result.rows[0];
};

const createBrand = async (nome, pais_origem) => {
  const result = await pool.query(
    `INSERT INTO brands (nome, pais_origem) 
     VALUES ($1, $2) RETURNING *`,
    [nome, pais_origem]
  );
  return result.rows[0];
};

const updateBrand = async (id, nome, pais_origem) => {
  const result = await pool.query(
    `UPDATE brands
     SET nome = $1, pais_origem = $2 
     WHERE id = $3 RETURNING *`,
    [nome, pais_origem, id]
  );
  return result.rows[0];
};

const deleteBrand = async (id) => {
  const result = await pool.query(
    `DELETE FROM brands
     WHERE id = $1`,
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error("Brand not found");
  }
  return { message: "Brand deleted successfully" };
};

module.exports = { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };