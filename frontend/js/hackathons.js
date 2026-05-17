async function loadHackathons() {

    const response = await fetch("http://localhost:5000/api/hackathons");
    const data = await response.json();

    const container = document.getElementById("hackathonContainer");

    data.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h2>${item.title}</h2>
                <p>Date: ${item.date}</p>
            </div>
        `;
    });
}

loadHackathons();
