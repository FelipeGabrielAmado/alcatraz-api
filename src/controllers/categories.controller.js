const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const getCategories = async (req, res) => {
    const response = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getCategoriesById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    res.json(response.rows);
};

const createCategories = async (req, res) => {
    const { name, description, menu = false } = req.body;
    const response = await pool.query('INSERT INTO categories (name, description, menu) VALUES ($1, $2, $3)', [
        name,
        description,
        menu]);

    res.json({
        message: 'Category Added successfully',
        body: {
            categories: { name, description, menu }
        }
    })
};

const updateCategories = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, menu } = req.body;

    const response = await pool.query('UPDATE categories SET name = $1, description = $2, menu = $3 WHERE id = $4', [
        name,
        description,
        menu,
        id
    ]);
    res.json('Movie Updated Successfully');
};

const deleteCategories = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM categories where id = $1', [
        id
    ]);
    res.json(`Category ${id} deleted Successfully`);
};

module.exports = {
    getCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
};