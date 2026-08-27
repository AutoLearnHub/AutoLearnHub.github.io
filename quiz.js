/* =========================================================
   AutoLearnHub - Automobile Engineering Quiz
   ========================================================= */


/* =========================
   QUESTION DATABASE
   ========================= */

const questions = [

    {
        question: "Which component converts reciprocating motion into rotary motion in an IC engine?",

        options: [
            "Camshaft",
            "Crankshaft",
            "Flywheel",
            "Piston"
        ],

        answer: 1,

        explanation:
            "The crankshaft converts the reciprocating motion of the piston into rotary motion."
    },


    {
        question: "Which engine generally uses a spark plug for ignition?",

        options: [
            "Compression ignition engine",
            "Diesel engine",
            "Spark ignition engine",
            "Steam engine"
        ],

        answer: 2,

        explanation:
            "A spark ignition engine uses a spark plug to ignite the air-fuel mixture."
    },


    {
        question: "What is the main function of a radiator in an automobile?",

        options: [
            "Increase engine speed",
            "Cool the engine coolant",
            "Supply fuel to engine",
            "Increase engine compression"
        ],

        answer: 1,

        explanation:
            "The radiator removes heat from the engine coolant and transfers it to the surrounding air."
    },


    {
        question: "Which system is used to transmit power from the engine to the wheels?",

        options: [
            "Steering system",
            "Braking system",
            "Transmission system",
            "Suspension system"
        ],

        answer: 2,

        explanation:
            "The transmission system transfers engine power to the drive wheels through the drivetrain."
    },


    {
        question: "Which component stores electrical energy in an automobile?",

        options: [
            "Alternator",
            "Battery",
            "Starter motor",
            "Distributor"
        ],

        answer: 1,

        explanation:
            "The battery stores electrical energy and supplies electrical power when required."
    },


    {
        question: "Which component is primarily used to reduce vehicle speed?",

        options: [
            "Clutch",
            "Differential",
            "Brake",
            "Radiator"
        ],

        answer: 2,

        explanation:
            "The braking system is used to reduce vehicle speed and bring the vehicle to a stop."
    },


    {
        question: "What is the main function of a clutch?",

        options: [
            "Cool the engine",
            "Connect and disconnect engine power from the transmission",
            "Increase fuel pressure",
            "Control steering angle"
        ],

        answer: 1,

        explanation:
            "The clutch allows the engine to be connected to or disconnected from the transmission."
    },


    {
        question: "Which device converts mechanical energy into electrical energy in an automobile?",

        options: [
            "Battery",
            "Starter motor",
            "Alternator",
            "Spark plug"
        ],

        answer: 2,

        explanation:
            "The alternator converts mechanical energy from the engine into electrical energy."
    },


    {
        question: "What is the main purpose of a vehicle suspension system?",

        options: [
            "Improve ride comfort and maintain wheel contact",
            "Increase fuel injection pressure",
            "Cool the engine",
            "Increase battery voltage"
        ],

        answer: 0,

        explanation:
            "The suspension system improves ride comfort, absorbs road shocks and helps maintain tyre contact with the road."
    },


    {
        question: "What does EV stand for in automotive technology?",

        options: [
            "Engine Vehicle",
            "Electric Vehicle",
            "Energy Valve",
            "Electronic Van"
        ],

        answer: 1,

        explanation:
            "EV stands for Electric Vehicle, which uses an electric powertrain for propulsion."
    }

];



/* =========================
   QUIZ VARIABLES
   ========================= */

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let answered = false;

let timeLeft = 15 * 60;

let timer = null;



/* =========================
   START QUIZ
   ========================= */

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    answered = false;

    timeLeft = 15 * 60;

    clearInterval(timer);

    showQuestion();

    startTimer();
}



/* =========================
   TIMER
   ========================= */

function startTimer() {

    updateTimer();

    timer = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            finishQuiz();

        }

    }, 1000);
}



function updateTimer() {

    const timerElement =
        document.querySelector(".quiz-timer");

    if (!timerElement) {

        return;

    }


    const minutes =
        Math.floor(timeLeft / 60);


    const seconds =
        timeLeft % 60;


    timerElement.textContent =
        "⏱️ " +
        minutes +
        ":" +
        seconds.toString().padStart(2, "0");

}



/* =========================
   SHOW QUESTION
   ========================= */

function showQuestion() {

    const quizArea =
        document.querySelector(".hero");


    const question =
        questions[currentQuestion];


    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    quizArea.innerHTML = `

        <div class="quiz-box">

            <div class="quiz-top">

                <div class="question-number">

                    Question
                    ${currentQuestion + 1}
                    of
                    ${questions.length}

                </div>


                <div class="quiz-timer">

                    ⏱️ 15:00

                </div>

            </div>


            <div class="progress-container">

                <div
                    class="progress-bar"
                    style="width:${progress}%">

                </div>

            </div>


            <h2>

                ${question.question}

            </h2>


            <div class="options">

                ${question.options.map(
                    function (option, index) {

                        return `

                            <button
                                class="option"
                                onclick="selectAnswer(${index})">

                                <span class="option-letter">

                                    ${String.fromCharCode(
                                        65 + index
                                    )}.

                                </span>

                                ${option}

                            </button>

                        `;

                    }
                ).join("")}

            </div>


            <div
                class="feedback"
                id="feedback">

            </div>


            <button
                class="next-button"
                id="nextButton"
                onclick="nextQuestion()"
                disabled>

                ${
                    currentQuestion ===
                    questions.length - 1

                    ? "Finish Test"

                    : "Next Question →"
                }

            </button>

        </div>

    `;


    /* Make sure timer shows correct value */

    updateTimer();

}



/* =========================
   SELECT ANSWER
   ========================= */

function selectAnswer(index) {

    /* Don't allow another answer */

    if (answered) {

        return;

    }


    answered = true;

    selectedAnswer = index;


    const options =
        document.querySelectorAll(".option");


    const feedback =
        document.querySelector("#feedback");


    const nextButton =
        document.querySelector("#nextButton");


    const correctIndex =
        questions[currentQuestion].answer;



    /* =========================
       COLOR ALL ANSWERS
       ========================= */

    options.forEach(function (button, i) {

        button.disabled = true;


        /* Reset */

        button.classList.remove(
            "selected",
            "correct",
            "wrong"
        );


        /*
           CORRECT ANSWER
           Always GREEN
        */

        if (i === correctIndex) {

            button.classList.add("correct");


            /* Direct color */

            button.style.setProperty(
                "background-color",
                "#16a34a",
                "important"
            );


            button.style.setProperty(
                "background",
                "#16a34a",
                "important"
            );


            button.style.setProperty(
                "color",
                "#ffffff",
                "important"
            );


            button.style.setProperty(
                "border",
                "2px solid #86efac",
                "important"
            );

        }



        /*
           USER SELECTED WRONG ANSWER
           RED
        */

        if (
            i === index &&
            index !== correctIndex
        ) {

            button.classList.add("wrong");


            button.style.setProperty(
                "background-color",
                "#dc2626",
                "important"
            );


            button.style.setProperty(
                "background",
                "#dc2626",
                "important"
            );


            button.style.setProperty(
                "color",
                "#ffffff",
                "important"
            );


            button.style.setProperty(
                "border",
                "2px solid #fca5a5",
                "important"
            );

        }

    });



    /* =========================
       CORRECT ANSWER
       ========================= */

    if (index === correctIndex) {

        score++;


        feedback.innerHTML = `

            <div class="feedback-correct">

                <strong>
                    ✓ Correct Answer!
                </strong>

                <p>
                    ${questions[currentQuestion].explanation}
                </p>

            </div>

        `;

    }



    /* =========================
       WRONG ANSWER
       ========================= */

    else {

        feedback.innerHTML = `

            <div class="feedback-wrong">

                <strong>
                    ✗ Wrong Answer
                </strong>

                <p>
                    ${questions[currentQuestion].explanation}
                </p>

            </div>

        `;

    }



    /* Enable next button */

    nextButton.disabled = false;

}



/* =========================
   NEXT QUESTION
   ========================= */

function nextQuestion() {

    if (!answered) {

        return;

    }


    currentQuestion++;

    selectedAnswer = null;

    answered = false;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    }

    else {

        finishQuiz();

    }

}



/* =========================
   FINISH QUIZ
   ========================= */

function finishQuiz() {

    clearInterval(timer);

    showResult();

}



/* =========================
   RESULT PAGE
   ========================= */

function showResult() {

    const quizArea =
        document.querySelector(".hero");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    let message;


    if (percentage >= 80) {

        message =
            "Excellent performance!";

    }

    else if (percentage >= 60) {

        message =
            "Good job! Keep practicing.";

    }

    else {

        message =
            "Keep practicing and improve your score.";

    }



    quizArea.innerHTML = `

        <div class="quiz-result">

            <div class="result-icon">

                🏆

            </div>


            <h1>

                Test Completed!

            </h1>


            <p class="result-message">

                ${message}

            </p>


            <div class="score">

                ${score} / ${questions.length}

            </div>


            <p class="percentage">

                ${percentage}% Score

            </p>


            <button
                onclick="startQuiz()">

                🔄 Try Again

            </button>


            <button
                class="home-button"
                onclick="location.reload()">

                🏠 Back to Home

            </button>

        </div>

    `;

}
