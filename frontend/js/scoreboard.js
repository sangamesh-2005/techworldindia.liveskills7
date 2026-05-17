async function loadScores() {

    const response = await fetch("http://localhost:5000/api/scoreboard");
    const data = await response.json();

    const container = document.getElementById("scoreContainer");

    data.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h2>${item.name}</h2>
                <p>Score: ${item.score}</p>
            </div>
        `;
    });
}

loadScores();
