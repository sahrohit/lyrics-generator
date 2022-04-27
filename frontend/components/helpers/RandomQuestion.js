const questions = ["you got to give what you take"];

const randomQuestion = () => {
	return questions[Math.floor(Math.random() * questions.length)];
};

export default randomQuestion;
