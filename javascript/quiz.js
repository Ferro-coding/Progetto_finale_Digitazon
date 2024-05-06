const quizData = [
    {
        "question": "Qual è il vero nome di Voldemort?",
        "answers": ["Tom Riddle", "Severus Snape", "Sirius Black"],
        "correctAnswer": "Tom Riddle"
    },
    {
        "question": "Chi è il padrino di Harry Potter?",
        "answers": ["Remus Lupin", "Sirius Black", "Albus Silente"],
        "correctAnswer": "Sirius Black"
    },
    {
        "question": "Qual è il nome della scuola frequentata da Harry Potter?",
        "answers": ["Scuola di Stregoneria di Hogwarts", "Scuola di Magia e Stregoneria di Beauxbatons", "Accademia di Stregoneria di Durmstrang"],
        "correctAnswer": "Scuola di Stregoneria di Hogwarts"
    },
    {
        "question": "Quale oggetto magico Harry ha usato per tornare indietro nel tempo?",
        "answers": ["Il Mantello dell'Invisibilità", "La Giratempo", "Il Cappello Parlante"],
        "correctAnswer": "La Giratempo" 
    },
    {
        "question": "Chi è il direttore di Hogwarts nella maggior parte dei libri?",
        "answers": ["Albus Silente", "Severus Piton", "Remus Lupin"],
        "correctAnswer": "Albus Silente"
    },
    {
        "question": "Qual è il nome del fratello maggiore di Ron Weasley?",
        "answers": ["Fred", "George", "Charlie"],
        "correctAnswer": "Charlie"
    },
    {
        "question": "Quale materia insegna Severus Piton ad Hogwarts?",
        "answers": ["Pozioni", "Difesa contro le Arti Oscure", "Trasfigurazione"],
        "correctAnswer": "Pozioni"
    },
    {
        "question": "Quale animale è il Patronus di Harry Potter?",
        "answers": ["Un cervo", "Una lontra", "Un falco"],
        "correctAnswer": "Un cervo"
    },
    {
        "question": "Chi è il custode delle chiavi e dei terreni a Hogwarts?",
        "answers": ["Rubeus Hagrid", "Argus Piton", "Minerva McGranitt"],
        "correctAnswer": "Rubeus Hagrid"
    },
    {
        "question": "Qual è il cognome della famiglia nemica di Harry Potter?",
        "answers": ["I Malandrini", "I Black", "I Malfoy"],
        "correctAnswer": "I Malfoy"
    }    
        
];

const quizContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score');

let score = 0;
let currentQuestionIndex = 0;


function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    const questionHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.answers.map((answer, index) => `
                <li>
                    <input type="radio" id="answer${index}" name="answer" value="${answer}">
                    <label for="answer${index}">${answer}</label>
                </li>
            `).join('')}
        </ul>
        <button onclick="checkAnswer()">Next</button>
    `;

    quizContainer.innerHTML = questionHTML;
}


function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const selectedAnswerText = selectedAnswer.value;

    if (selectedAnswerText === correctAnswer) {
        score += 2; 
    } 

    currentQuestionIndex++;
    ans = quizData.length * 2;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        alert(`Quiz completed! Your score is: ${score}/${ans}`);
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }
}


showQuestion();
