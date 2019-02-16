const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let ReplySchema = new Schema({
  question: String,
  option: String
});

let ResponedSchema = new Schema({
  survey: { type: ObjectId, ref: 'Survey' },
  replies: [ReplySchema]
});

module.exports = {
  Responed: mongoose.model('Responed', ResponedSchema, 'responeds'),
  Reply: mongoose.model('Reply', ReplySchema)
};
