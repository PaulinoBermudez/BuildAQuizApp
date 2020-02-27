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
let questions = [
  {
	/* 1 question */
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    /* 2 question */
	question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
	/* 3 question */
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
	/* 4 question */
	question: "What is Elvis Presley s middle name?",
	choice1: "Scott",
    choice2: "Logan",
    choice3: "Aaron",
    choice4: "Flint",
	answer: 3
  },
  {
	/* 5 question */
	question: "Which group did have a hit with the Macarena?",
	choice1: "Michael Jackson",
    choice2: "Jukebox Fenty",
    choice3: "Megan Thee Stallion",
    choice4: "Los Del Rio",
	answer: 4
  },
  {
	/* 6 question */
	question: "In which Spanish city did the Joan Miro museum open in 1975?",
	choice1: "Madrid",
    choice2: "Valencia",
    choice3: "Barcelona",
    choice4: "Murcia",
	answer: 3
  },
  {
	/* 7 question */
	question: "In which English town did Adolf Hitler study art?",
	choice1: "London",
    choice2: "Liverpool",
    choice3: "Glasgo",
    choice4: "Cambridge",
	answer: 2
  },
  {
	/* 7 question */
	question: "Who was the original author of Dracula?",
	choice1: "Gustave Eiffel",
    choice2: "Michelangelo",
    choice3: "Bram Stoker",
    choice4: "Mary Shelley",
	answer: 3
  },
  {
	/* 8 question */
	question: "Which device do we use to look at the stars?",
	choice1: "Telescope",
    choice2: "Lens",
    choice3: "Microscope",
    choice4: "Radio",
	answer: 1
  },
  {
	/* 9 question */
	question: "Who invented the barometer?",
	choice1: "Torricelli",
    choice2: "James Watt",
    choice3: "Picasso",
    choice4: "Rene Descartes",
	answer: 1
  },
  {
	/* 10 question */
	question: "What is the name of the infamous novel by Vladimir Nabokov?",
	choice1: "Isis",
    choice2: "Frankenstein",
    choice3: "Lolita",
    choice4: "Hamlet",
	answer: 3
  }			
			
];

/* Constants */
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

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
startGame();