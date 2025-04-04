let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let selectedTopic = "";

function selectTopic(topic) {
    selectedTopic = topic;
    document.getElementById("difficulty-container").classList.remove("hidden");
}

function startGame(difficulty) {
    fetch("/get_questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, difficulty: difficulty })
    })
    .then(response => response.json())
    .then(data => {
        questions = data;
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById("score").innerText = score;
        showQuestion();
    })
    .catch(error => console.error("Ошибка:", error));
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Игра окончена! Ваш счёт: " + score);
        return;
    }

    let questionData = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionData.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option, questionData.answer);
        optionsDiv.appendChild(button);
    });

    document.getElementById("question-container").classList.remove("hidden", "fade");
    void document.getElementById("question-container").offsetWidth;
    document.getElementById("question-container").classList.add("fade");

    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById("progress-bar").style.width = "100%";

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        let widthPercent = (timeLeft / 10) * 100;
        document.getElementById("progress-bar").style.width = widthPercent + "%";

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("⏳ Время вышло!");
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected, correct) {
    clearInterval(timer);

    if (selected === correct) {
        alert("✅ Правильно!");
        score += 10;
    } else {
        alert("❌ Неправильно! Верный ответ: " + correct);
    }

    document.getElementById("score").innerText = score;
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}
