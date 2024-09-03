const questions = [
  {
    question:
      "Which Russian aircraft is known for its unique design and was the world's first commercial supersonic transport?",
      answers: [
        { text: "Tu-154", correct: false},
        { text: "Tu-144", correct: true},
        { text: "IL-96", correct: false},
        { text: "An-148", correct: false},
      ]
  },
  {
    question: "Which airline is known as Russia's flagship carrier and was founded in 1923?",
    answers: [
        { text: "S7 Airlines", correct: false },
        { text: "Aeroflot", correct: true },
        { text: "Rossiya Airlines", correct: false },
        { text: "Ural Airlines", correct: false }
    ]
},
{
    question: "Which Russian aircraft is known for its ability to perform short takeoffs and landings (STOL) and is often used in remote areas?",
    answers: [
        { text: "An-2", correct: true },
        { text: "IL-76", correct: false },
        { text: "Su-25", correct: false },
        { text: "Mi-8", correct: false }
    ]
},
{
    question: "What is the name of the low-cost airline that operates under Aeroflot and focuses on domestic flights?",
    answers: [
        { text: "Red Wings Airlines", correct: false },
        { text: "Pobeda Airlines", correct: true },
        { text: "Smartavia", correct: false },
        { text: "UTair Aviation", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
     currentQuestionIndex = 0;
     score = 0;
     nextButton.innerHTML = "Next";
     showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();


