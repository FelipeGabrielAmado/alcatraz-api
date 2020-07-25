const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const getMovies = async (req, res) => {
    const response = await pool.query('SELECT * FROM movies ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getMoviesMain = async (req, res) => {
    const response = await pool.query('SELECT * FROM movies ORDER BY id DESC limit 24');
    res.status(200).json(response.rows);
};

const getMoviesAdmin = async (req, res) => {
    const response = await pool.query('SELECT * FROM movies ORDER BY id DESC limit 8')
    res.status(200).json(response.rows);
};

const getMoviesById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    res.json(response.rows);
};

const getMoviesByCategory = async (req, res) => {
    const category = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM movies WHERE category = $1 ORDER BY id DESC', [category]);
    res.json(response.rows);
};

const createMovie = async (req, res) => {
    const { name, description, genre, rating, trailer, director, stars, poster, background, category, netflix, disney, prime, hbo, youtube } = req.body;
    const response = await pool.query('INSERT INTO movies (name, description, genre, rating, trailer, director, stars, poster, background, category, netflix, disney, prime, hbo, youtube) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [
        name,
        description,
        genre,
        rating,
        trailer,
        director,
        stars,
        poster,
        background,
        category,
        netflix,
        disney,
        prime,
        hbo,
        youtube

    ]);

    res.json({
        message: 'Movie Added successfully',
        body: {
            movies: { name, description, genre, rating, trailer, director, stars, poster }
        }
    })
};

const updateMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, genre, rating, trailer, director, stars, poster } = req.body;

    const response = await pool.query('UPDATE movies SET name = $1, description = $2, genre = $3, rating = $4, trailer = $5, director = $6, stars = $7, poster = $8 WHERE id = $9', [
        name,
        description,
        genre,
        rating,
        trailer,
        director,
        stars,
        poster,
        id
    ]);
    res.json('Movie Updated Successfully');
};

const deleteMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM movies where id = $1', [
        id
    ]);
    res.json(`Movie ${id} deleted Successfully`);
};

module.exports = {
    getMovies,
    getMoviesById,
    getMoviesByCategory,
    getMoviesAdmin,
    createMovie,
    updateMovie,
    deleteMovie,
    getMoviesMain
};