let questions = [];
let currentQuestionIndex = 0;

function startGame(topic) {
    console.log("Выбрана тема:", topic);

    fetch("/get_questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Ошибка: " + data.error);
            return;
        }
        questions = data;
        currentQuestionIndex = 0;
        showQuestion();
    })
    .catch(error => console.error("Ошибка запроса:", error));
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Игра окончена!");
        return;
    }

    let questionData = questions[currentQuestionIndex];

    document.getElementById("question-container").style.display = "block";
    document.getElementById("question-text").innerText = questionData.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option, questionData.answer);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("Правильно!");
    } else {
        alert("Неправильно! Правильный ответ: " + correct);
    }
    currentQuestionIndex++;
    showQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}