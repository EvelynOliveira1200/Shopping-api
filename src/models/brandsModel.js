const pool = require("../config/database");

// Verifica se a marca já existe
const checkBrandExists = async (nome) => {
  const result = await pool.query("SELECT * FROM brands WHERE nome = $1", [nome]);
  return result.rows.length > 0;
};

// Buscar todas as marcas
const getBrands = async () => {
  const result = await pool.query("SELECT * FROM brands");
  return result.rows;
};

// Buscar uma marca por ID
const getBrandById = async (id) => {
  const result = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
  return result.rows[0];
};

// Criar uma nova marca
const createBrand = async (nome, pais_origem) => {
  if (await checkBrandExists(nome)) {
    const error = new Error("Marca já cadastrada.");
    error.code = "23505"; // Código manual para identificar esse erro no controller
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO brands (nome, pais_origem) VALUES ($1, $2) RETURNING *`,
    [nome, pais_origem]
  );
  return result.rows[0];
};

// Atualizar uma marca
const updateBrand = async (id, nome, pais_origem) => {
  const result = await pool.query(
    `UPDATE brands SET nome = $1, pais_origem = $2 WHERE id = $3 RETURNING *`,
    [nome, pais_origem, id]
  );
  return result.rows[0];
};

// Deletar uma marca
const deleteBrand = async (id) => {
  const result = await pool.query(`DELETE FROM brands WHERE id = $1`, [id]);
  if (result.rowCount === 0) {
    throw new Error("Marca não encontrada.");
  }
  return { message: "Marca deletada com sucesso" };
};

module.exports = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
