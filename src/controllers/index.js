const { Survey, Responed } = require('../models');

const createSurvey = async (req, res, next) => {
	try {
		const { questions } = req.body;

		const survey = new Survey({
			questions: questions.map((question) => {
				question.counts = 0;
				return question;
			})
		});
		await survey.save();

		return res.status(201).json({
			message: 'Survey created successfully.'
		});
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const createResponed = async (req, res, next) => {
	try {
		const { responses, surveryId } = req.body;

		const survey = await Survey.findOne({ _id: surveryId });
		await responses.map(async (response) => {
			const question = survey.questions.filter((q) => q._id == response.questionId)[0];
			await Survey.update(
				{ _id: surveryId, 'questions._id': response.questionId },
				{
					$set: {
						'questions.$.counts': question.counts + 1
					}
				}
			);
		});

		const newResponse = new Responed({
			replies: responses,
			surveryId
		});
		await newResponse.save();

		return res.status(201).json({
			message: 'Responds created successfully.'
		});
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

const getSurvey = async (req, res, next) => {
	try {
		const { surveryId } = req.params;

		const survey = await Survey.find({ _id: surveryId });

		return res.status(200).json(survey);
	} catch (err) {
		return res.status(400).json({
			error: err.message ? err.message : 'Something wrong happend'
		});
	}
};

module.exports = {
	createSurvey,
	createResponed,
	getSurvey
};
