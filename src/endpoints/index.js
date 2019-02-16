const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.post('/survies', controller.createSurvey);
router.get('/survies/:surveryId', controller.getSurvey);
router.post('/responds', controller.createResponed);

module.exports = router;
