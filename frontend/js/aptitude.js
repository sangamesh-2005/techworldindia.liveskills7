let timeLeft = 1800; // 30 minutes in seconds
let submitted = false;

const timer = document.getElementById("timer");

/* CHECK PREVIOUS ATTEMPT */
if (localStorage.getItem("testSubmitted") === "true") {
    document.getElementById("quizForm").innerHTML = `
        <h2 style="color:red;text-align:center;">
            You already attended this test.
        </h2>
    `;
}

/* 30 MINUTES COUNTDOWN */
const countdown = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `Time Left: ${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(countdown);

        fetch("http://localhost:5000/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: localStorage.getItem("userName") || "Guest",
                score: score,
                total: 10
            })
        })
        .then(res => res.json())
        .then(data => { console.log(data); });

        submitQuiz();
    }

}, 1000);

/* SUBMIT QUIZ */
function submitQuiz() {

    if (submitted) return;
    submitted = true;

    clearInterval(countdown);

    let score = 0;

    const answers = {
        q1:  "15",
        q2:  "JavaScript",
        q3:  "Hyper Text Markup Language",
        q4:  "5",
        q5:  "Styling",
        q6:  "64",
        q7:  "Facebook",
        q8:  "<img>",
        q9:  "Database",
        q10: "75"
    };

    for (let key in answers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
            score++;
        }
    }

    document.getElementById("result").innerHTML = `Your Score: ${score} / 10`;

    /* LOCK OPTIONS */
    document.querySelectorAll("input").forEach(option => {
        option.disabled = true;
    });

    /* DISABLE BUTTON */
    const button = document.getElementById("submitBtn");
    button.disabled = true;
    button.innerHTML = "Test Submitted";

    /* SAVE ATTEMPT */
    localStorage.setItem("testSubmitted", "true");
}
