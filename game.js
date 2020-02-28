/* Constants in the program */
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

/* Variables inicialized */
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

/* Questions and the answer */
let questions = [];

fetch("question.json")
	.then(res => {
		return res.json();
	}
	)
	.thenloadedQuestions => {
		console.log(loadedQuestions);
		questions = loadedQuestions;
		startGame();
	}
	)
	.catch(err => {
		console.error(err);
	});
/* Constants */
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

/* Start the game function */
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  //console.log(availableQuesions);
  getNewQuestion();
};

/* Function New Question, this function select the next quiz */
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
/* Update the progress bar */
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  // console.log(availableQuesions);
  acceptingAnswers = true;
};

/* Check the result */
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
	
	const classToApply=
		selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
	
	/* Increment the score conditional */
	if (classToApply === "correct"){
		incrementScore(CORRECT_BONUS);
	}
	
	selectedChoice.parentElement.classList.add(classToApply);
		
	setTimeout(() => {
		selectedChoice.parentElement.classList.remove(classToApply);
		getNewQuestion();
	}, 1000);
	});
});

/* Update the score */
incrementScore = num => {
	score += num;
	scoreText.innerText = score;
};