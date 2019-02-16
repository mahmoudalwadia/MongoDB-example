const { Survey, Responed, Option } = require('../models');
const { formatQusetions, createReplies } = require('../utlis');

const getAllSurveys = async (req, res, next) => {
	const survey = await Survey.find();

	return res.render('index', {
		survey
	});
};

const createSurvey = async (req, res, next) => {
	try {
		const { questions, name, title } = req.body;

		const survey = new Survey({
			name,
			title,
			questions: formatQusetions(questions)
		});
		await survey.save();

		return res.redirect('/surveys');
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const createResponed = async (req, res, next) => {
	try {
		const { surveyId } = req.params;
		const { responses } = req.body;

		const survey = await Survey.findOne({ _id: surveyId });
		const mappedRes = createReplies(responses, survey);

		await responses.map(async (response) => {
			const question = survey.questions.filter((q) => q._id == response.questionId)[0];
			const updatedOptions = question.options.map((option) => {
				if (option._id == response.optionId) {
					console.log('asdasd');
					option.counts = option.counts + 1;
				}

				return option;
			});

			await Survey.update(
				{ _id: surveyId, 'questions._id': response.questionId },
				{
					$set: {
						'questions.$.options': updatedOptions
					}
				}
			);
		});

		const newResponse = new Responed({
			replies: mappedRes,
			survey: surveyId
		});
		await newResponse.save();

		return res.redirect('/surveys/' + surveyId);
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const redirectToSurveys = (req, res, next) => {
	return res.redirect('/surveys');
};

const getSurvey = async (req, res, next) => {
	try {
		const { surveyId } = req.params;

		const surveyData = {};
		surveyData.survey = await Survey.findOne({ _id: surveyId });
		surveyData.responses = await Responed.find({
			survey: surveyId
		});

		return res.render('survey', {
			surveyData
		});
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const createSurveyForm = (req, res, next) => {
	return res.render('createSurvey');
};

const createResponedForm = async (req, res, next) => {
	try {
		const { surveyId } = req.params;
		const survey = await Survey.findOne({ _id: surveyId });

		return res.render('createRespond', {
			survey
		});
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const getQuestionsData = async (req, res, next) => {
	try {
		const { surveyId } = req.params;

		const survey = await Survey.findOne({ _id: surveyId });

		return res.json({
			questions: survey.questions
		});
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

module.exports = {
	createSurvey,
	createSurveyForm,
	createResponed,
	createResponedForm,
	getSurvey,
	getAllSurveys,
	redirectToSurveys,
	getQuestionsData
};
