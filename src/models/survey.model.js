const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	body: String,
	counts: Number
});

let SurveySchema = new Schema({
	questions: [ QuestionSchema ]
});

module.exports = mongoose.model('Survey', SurveySchema);
