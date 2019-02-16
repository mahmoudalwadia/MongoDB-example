module.exports = questions =>
  questions.map(question => ({
    counts: 0,
    body: question.body,
    options: question.options.split(',').map(option => ({
      title: option.trim()
    }))
  }));
