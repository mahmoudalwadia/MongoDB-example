const getQuestion = (survey, response) =>
  survey.questions.filter(q => q._id == response.questionId)[0];
const getOption = (question, response) =>
  question.options.filter(opts => opts._id == response.optionId)[0];

module.exports = (responses, survey) => {
  return responses.map(response => {
    const question = getQuestion(survey, response);
    const option = getOption(question, response);

    return {
      question: question.body,
      option: option.title
    };
  });
};
