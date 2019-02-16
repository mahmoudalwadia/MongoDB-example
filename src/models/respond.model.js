const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let ReplySchema = new Schema({
	questionId: { type: ObjectId, ref: 'QuestionSchema' },
	reply: { type: String, required: true, max: 100 }
});

let ResponedSchema = new Schema({
	surveryId: { type: ObjectId, ref: 'SurverySchema' },
	replies: [ ReplySchema ]
});

module.exports = mongoose.model('Responed', ResponedSchema);
