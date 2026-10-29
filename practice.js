/*SCREENS */
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const ResultScreen = document.getElementById("result-screen");

const StartButton = document.getElementById("start-btn");
const QuestionText = document.getElementById("question-text");
const AnswersContainer = document.getElementById("answers-container");
const CurrentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const ScoreSpan = document.getElementById("score");
const FinalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const ResultMessage = document.getElementById("result-message");
const restartQuizButton = document.getElementById("restart-quiz-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "ما هي عاصمة فرنسا ؟",
        answers: [
            {text: "مارسيل", correct: false},
            {text: "ليون", correct: false},
            {text: "باريس", correct: true},
            {text: "تولوس", correct: false},
        ],
    },

    {
        question: "ما هو أكبر كوكب في نظامنا الشمسي؟",
        answers: [
            {text: "الأرض", correct: false},
            {text: "المشتري", correct: true},
            {text: "بلوتو", correct: false},
            {text: "المريخ", correct: false},
        ],
    },

    {
        question: "ما هو الرمز الكيميائي للذهب؟",
        answers: [
            {text: "Al", correct: false},
            {text: "Ag", correct: false},
            {text: "Zn", correct: false},
            {text: "Au", correct: true},
        ],
    },

    {
        question: "ما هي أصلب مادة طبيعية على وجه الأرض؟",
        answers: [
            {text: "زمرد", correct: false},
            {text: "الذهب", correct: false},
            {text: "الألماس", correct: true},
            {text: "الفضة", correct: false},
        ],
    },
];

// Q STATE VARS
let CurrentQuestionIndex = 0;
let score = 0;
let answesDisable = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length; 

// EVENT LISTENER

StartButton.addEventListener("click", startQuiz);
restartQuizButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars0
    CurrentQuestionIndex = 0;
    score = 0;
    ScoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    //reset state
    answesDisable = false;
    const currentQuestion = quizQuestions[CurrentQuestionIndex];
    CurrentQuestionSpan.textContent = CurrentQuestionIndex + 1;

    const progressPercent = (CurrentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    QuestionText.textContent = currentQuestion.question;

    //explain
    AnswersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("answer-btn");
        button.textContent = answers.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answers.correct;

        button.addEventListener("click", selectAnswer);

        AnswersContainer.appendChild(button);
        })
}
function selectAnswer(event) {
    if(answesDisable) return;

    answesDisable = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(AnswersContainer.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        setTimeout(() => {
            score++;
            ScoreSpan.textContent = score;
        },500)

    }
    setTimeout(() =>{
        CurrentQuestionIndex++;
        //check if there any other questions or if the quiz is over
        if(CurrentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    ResultScreen.classList.add("active");

    FinalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if (percentage == 100) {
        ResultMessage.textContent = "😍! أنت عبقري";
    }
    else if (percentage >= 50 && percentage <100) {
        ResultMessage.textContent = " 😎 جيد جداً .. لكن ليس المستوى المطلوب";
    }
    else if(percentage >= 25 && percentage < 50) {
        ResultMessage.textContent = " 😜 ماشي حالك";
    }   
    else {
        ResultMessage.textContent = " 😢 حظ أوفر... حاول مجدداً لاحقاً";
    }
}
function restartQuiz() {
    ResultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
/*
... rest parametere allows function to use variable number of parametere
... spread operator allows to spread the array to diffirent elements, in order to find the max num for example, it's like unpacking the array 
continue is used inside of loops for example to skip something
break is to break out of the loop entirely
=== strict equality operator compares values & datatype are equal
math methods using "Math.methodName"
!== not of strict equality operator

Static properties
Math.E
Euler's number and the base of natural logarithms; approximately 2.718.

Math.LN10
Natural logarithm of 10; approximately 2.303.

Math.LN2
Natural logarithm of 2; approximately 0.693.

Math.LOG10E
Base-10 logarithm of E; approximately 0.434.

Math.LOG2E
Base-2 logarithm of E; approximately 1.443.

Math.PI
Ratio of a circle's circumference to its diameter; approximately 3.14159.

Math.SQRT1_2
Square root of ½; approximately 0.707.

Math.SQRT2
Square root of 2; approximately 1.414.

Math[Symbol.toStringTag]
The initial value of the [Symbol.toStringTag] property is the string "Math". This property is used in Object.prototype.toString().

Static methods
Math.abs()
Returns the absolute value of the input.

Math.acos()
Returns the arccosine of the input.

Math.acosh()
Returns the hyperbolic arccosine of the input.

Math.asin()
Returns the arcsine of the input.

Math.asinh()
Returns the hyperbolic arcsine of a number.

Math.atan()
Returns the arctangent of the input.

Math.atan2()
Returns the arctangent of the quotient of its arguments.

Math.atanh()
Returns the hyperbolic arctangent of the input.

Math.cbrt()
Returns the cube root of the input.

Math.ceil()
Returns the smallest integer greater than or equal to the input.

Math.clz32()
Returns the number of leading zero bits of the 32-bit integer input.

Math.cos()
Returns the cosine of the input.

Math.cosh()
Returns the hyperbolic cosine of the input.

Math.exp()
Returns ex, where x is the argument, and e is Euler's number (2.718…, the base of the natural logarithm).

Math.expm1()
Returns subtracting 1 from exp(x).

Math.floor()
Returns the largest integer less than or equal to the input.

Math.f16round()
Returns the nearest half precision float representation of the input.

Math.fround()
Returns the nearest single precision float representation of the input.

Math.hypot()
Returns the square root of the sum of squares of its arguments.

Math.imul()
Returns the result of the 32-bit integer multiplication of the inputs.

Math.log()
Returns the natural logarithm (㏒e; also, ㏑) of the input.

Math.log10()
Returns the base-10 logarithm of the input.

Math.log1p()
Returns the natural logarithm (㏒e; also ㏑) of 1 + x for the number x.

Math.log2()
Returns the base-2 logarithm of the input.

Math.max()
Returns the largest of zero or more numbers.

Math.min()
Returns the smallest of zero or more numbers.

Math.pow()
Returns base x to the exponent power y (that is, xy).

Math.random()
Returns a pseudo-random number between 0 and 1.

Math.round()
Returns the value of the input rounded to the nearest integer.

Math.sign()
Returns the sign of the input, indicating whether it is positive, negative, or zero.

Math.sin()
Returns the sine of the input.

Math.sinh()
Returns the hyperbolic sine of the input.

Math.sqrt()
Returns the positive square root of the input.

Math.sumPrecise()
Returns the sum of a passed iterable of numbers, avoiding floating point precision loss in intermediate results.

Math.tan()
Returns the tangent of the input.

Math.tanh()
Returns the hyperbolic tangent of the input.

Math.trunc()
removes decimals : 3.21 --> 3

*/