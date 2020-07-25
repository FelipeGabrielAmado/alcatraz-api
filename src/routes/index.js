const { Router } = require('express');
const router = Router();

const { getMovies, getMoviesById, createMovie, updateMovie, deleteMovie, getMoviesMain, getMoviesByCategory, getMoviesAdmin } = require('../controllers/index.controller');
const { getCategories, getCategoriesById, createCategories, updateCategories, deleteCategories } = require('../controllers/categories.controller');

router.get('/movies', getMovies);
router.get('/moviesmain', getMoviesMain);
router.get('/movies/:id', getMoviesById);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie);
router.get('/moviesadmin', getMoviesAdmin);


router.get('/categories', getCategories);
router.get('/categories/:id', getCategoriesById);
router.post('/categories', createCategories);
router.put('/categories/:id', updateCategories)
router.delete('/categories/:id', deleteCategories);

router.get('/movies/categories/:id', getMoviesByCategory);

module.exports = router;