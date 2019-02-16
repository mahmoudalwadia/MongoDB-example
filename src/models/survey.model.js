const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
	counts: Number,
	title: String
});

const QuestionSchema = new Schema({
	body: String,
	options: [ OptionSchema ]
});

let SurveySchema = new Schema({
	name: String,
	title: String,
	questions: [ QuestionSchema ]
});

module.exports = {
	Survey: mongoose.model('Survey', SurveySchema, 'surveys'),
	Question: mongoose.model('Question', SurveySchema),
	Option: mongoose.model('Option', OptionSchema)
};
