const express = require('express');
const router = express.Router();
const { getAllArticles, createArticle } = require('../controllers/articleController');

// Get all articles
router.get('/', getAllArticles);

// Create a new article
router.post('/', createArticle);

module.exports = router;
