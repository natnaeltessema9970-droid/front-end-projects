//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.querySelector("#result-message") || document.querySelector(".result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const quizQuestions = [
    {
    questionText:"what is the capital of germany",
    answers: [
        { text:"minsk",correct: false},
        { text:"london",correct: false},
        { text:"geneva",correct: false},
        { text:"frankfurt",correct: true},
    ],
},
{
    questionText:"what is the largest continent on earth",
    answers: [
        { text:"europe",correct: false},
        { text:"north america",correct: false},
        { text:"asia",correct: true},
        { text:"australia",correct: false},
    ],
},
{
    questionText:"what is the smallest country in the world",
    answers: [
        { text:"luthinia",correct: false},
        { text:"vatican",correct: true},
        { text:"iran",correct: false},
        { text:"palestain",correct: false},
    ],
},
{
    questionText:"who is the inventor of Ac generator",
    answers: [
        { text:"Thomas eddison",correct: false},
        { text:"Nicolas tesla",correct: true},
        { text:"Albert enstein",correct: false},
        { text:"Steven hokins",correct: false},
    ],
},
{
    questionText:"where is the great wall found",
    answers: [
        { text:"china",correct: true},
        { text:"germany",correct: false},
        { text:"poland",correct: false},
        { text:"france",correct: false},
    ],
},
]
//Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion(){
    //reset state
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.questionText;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer (event){
    if(answerDisabled) return
    answerDisabled = true
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"
    Array.from(answersContainer.children).forEach(button => {
        const buttonIsCorrect = button.dataset.correct === "true";
        if (buttonIsCorrect) {
            button.classList.add("correct");
        }
        if (button === selectedButton && !buttonIsCorrect) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 900);
}
function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100){
        resultMessage.textContent = "perfect! you are a genius."
    }else if(percentage === 80){
        resultMessage.textContent = "great job! you know your stuff "
    }else if(percentage === 60){
        resultMessage.textContent = "Good effort! keep learning "
    }else if(percentage === 40){
        resultMessage.textContent = "Not bad! try again later"
    }else {
        resultMessage.textContent = "Keep studying! you will get better "
    }
}
function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}

