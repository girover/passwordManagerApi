const express = require('express');
const router = express.Router();
const passwordsRouter = require('../api/routers/passwordsRouter');
const categoriesRouter = require('../api/routers/categoriesRouter');
const usersRouter = require('../api/routers/usersRouter');

router.use('/categories', categoriesRouter);
router.use('/passwords', passwordsRouter);
router.use('/users', usersRouter);

module.exports = router;