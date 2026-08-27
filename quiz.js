const questions = [
    {
        question: "Which component converts reciprocating motion into rotary motion in an IC engine?",
        options: [
            "Camshaft",
            "Crankshaft",
            "Flywheel",
            "Piston"
        ],
        answer: 1
    },

    {
        question: "Which engine generally uses a spark plug for ignition?",
        options: [
            "Compression ignition engine",
            "Diesel engine",
            "Spark ignition engine",
            "Steam engine"
        ],
        answer: 2
    },

    {
        question: "What is the main function of a radiator in an automobile?",
        options: [
            "Increase engine speed",
            "Cool the engine coolant",
            "Supply fuel to engine",
            "Increase engine compression"
        ],
        answer: 1
    },

    {
        question: "Which system is used to transmit power from the engine to the wheels?",
        options: [
            "Steering system",
            "Braking system",
            "Transmission system",
            "Suspension system"
        ],
        answer: 2
    },

    {
        question: "Which component stores electrical energy in an automobile?",
        options: [
            "Alternator",
            "Battery",
            "Starter motor",
            "Distributor"
        ],
        answer: 1
    },

    {
        question: "Which component is primarily used to reduce vehicle speed?",
        options: [
            "Clutch",
            "Differential",
            "Brake",
            "Radiator"
        ],
        answer: 2
    },

    {
        question: "What is the main function of a clutch?",
        options: [
            "Cool the engine",
            "Connect and disconnect engine power from the transmission",
            "Increase fuel pressure",
            "Control steering angle"
        ],
        answer: 1
    },

    {
        question: "Which device converts mechanical energy into electrical energy in an automobile?",
        options: [
            "Battery",
            "Starter motor",
            "Alternator",
            "Spark plug"
        ],
        answer: 2
    },

    {
        question: "What is the main purpose of a vehicle suspension system?",
        options: [
            "Improve ride comfort and maintain wheel contact",
            "Increase fuel injection pressure",
            "Cool the engine",
            "Increase battery voltage"
        ],
        answer: 0
    },

    {
        question: "What does EV stand for in automotive technology?",
        options: [
            "Engine Vehicle",
            "Electric Vehicle",
            "Energy Valve",
            "Electronic Van"
        ],
        answer: 1
    }
];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


/* START QUIZ */

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    showQuestion();
}


/* SHOW QUESTION */

function showQuestion() {

    const quizArea = document.querySelector(".hero");

    const question = questions[currentQuestion];

    quizArea.innerHTML = `
        <div class="quiz-box">

            <p class="question-number">
                Question ${currentQuestion + 1} of ${questions.length}
            </p>

            <h2>${question.question}</h2>

            <div class="options">

                ${question.options.map((option, index) => `
                    
                    <button
                        class="option"
                        onclick="selectAnswer(${index})">

                        ${String.fromCharCode(65 + index)}.
                        ${option}

                    </button>

                `).join("")}

            </div>

            <button
                class="next-button"
                onclick="nextQuestion()">

                ${currentQuestion === questions.length - 1
                    ? "Finish Test"
                    : "Next Question →"}

            </button>

        </div>
    `;
}


/* SELECT ANSWER */

function selectAnswer(index) {

    selectedAnswer = index;

    const options = document.querySelectorAll(".option");

    options.forEach((button, i) => {

        button.classList.remove("selected");

        if (i === index) {
            button.classList.add("selected");
        }

    });
}


/* NEXT QUESTION */

function nextQuestion() {

    if (selectedAnswer === null) {

        alert("Please select an answer.");

        return;
    }


    if (selectedAnswer === questions[currentQuestion].answer) {

        score++;

    }


    currentQuestion++;

    selectedAnswer = null;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}


/* RESULT */

function showResult() {

    const percentage =
        Math.round((score / questions.length) * 100);


    const quizArea = document.querySelector(".hero");


    quizArea.innerHTML = `

        <div class="quiz-result">

            <h1>Test Completed!</h1>

            <h2>Your Score</h2>

            <div class="score">

                ${score} / ${questions.length}

            </div>

            <p>

                You scored ${percentage}%.

            </p>


            <button onclick="startQuiz()">

                Try Again

            </button>

        </div>

    `;
}
