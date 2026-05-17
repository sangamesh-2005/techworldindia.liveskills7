async function loadPractice() {

    try {
        const response = await fetch("http://localhost:5000/api/practice");
        const data = await response.json();

        const container = document.getElementById("practiceContainer");

        data.forEach(item => {
            container.innerHTML += `
                <div class="card">
                    <h2>${item.title}</h2>
                    <p>Difficulty: ${item.difficulty}</p>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

loadPractice();
