module.exports = (questions) =>
	questions.map((question) => ({
		body: question.body,
		options: question.options.split(',').map((option) => ({
			title: option.trim(),
			counts: 0
		}))
	}));
