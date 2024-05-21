const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.get);
router.post('/', categoriesController.create);
router.get('/:id', categoriesController.getById);
router.patch('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

module.exports = router;