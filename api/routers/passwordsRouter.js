const express = require('express');
const router = express.Router();
const passwordsController = require('../controllers/passwordsController');

router.get('/', passwordsController.get);
router.post('/', passwordsController.create);
router.get('/:id', passwordsController.getById);
router.patch('/:id', passwordsController.update);
router.delete('/:id', passwordsController.delete);
router.get('/site/url/', passwordsController.getBySiteName);

module.exports = router;