const express = require('express');
const {handleGenerateNewShortURL,handleRedirectOriginalURL,handleGetAnalytics} = require('../controllers/url')
const router = express.router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleRedirectOriginalURL);
router.get('/analytics/:shortId',handleGetAnalytics);


module.exports = router;