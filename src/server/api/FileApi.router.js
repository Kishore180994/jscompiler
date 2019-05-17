const express = require('express');
const router = express.Router();

const fileController = require('./FileApi.controller');

/**
 * `POST` request to run the file
 */
router.post('/file/:lang', fileController.runFile);

/**
 * `GET` request to load the template
 */
router.get('/file/getTemplate/:lang', fileController.getTemplate);

module.exports = router;
