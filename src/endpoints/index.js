const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.get('/', controller.redirectToSurveys);
router.get('/surveys/create', controller.createSurveyForm);
router.post('/surveys', controller.createSurvey);
router.get('/surveys/:surveyId', controller.getSurvey);
router.get('/surveys/:surveyId/responed', controller.createResponedForm);
router.get('/surveys', controller.getAllSurveys);
router.post('/surveys/:surveyId/responed', controller.createResponed);

module.exports = router;
