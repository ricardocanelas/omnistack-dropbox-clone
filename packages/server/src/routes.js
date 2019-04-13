const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const router = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

router.get('/hello', (req, res) =>{
    return res.send('Hello World');
})

router.get('/boxes/:id', BoxController.show);
router.post('/boxes', BoxController.store);
router.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = router;