function goHome() {
  alert("Home Page Opened");
}

function startTest() {
  alert("Test Started");
}

async function loadScores() {

  try {

    const response = await fetch("http://localhost:5000/api/scoreboard");

    const data = await response.json();

    console.log(data);

    alert("Score Board Loaded");

  } catch (error) {

    console.log(error);

    alert("Backend not connected");

  }
}

async function loadPractice() {

  try {

    const response = await fetch("http://localhost:5000/api/practice");

    const data = await response.json();

    console.log(data);

    alert("Practice Problems Loaded");

  } catch (error) {

    console.log(error);

    alert("Backend not connected");

  }
}

async function loadHackathons() {

  try {

    const response = await fetch("http://localhost:5000/api/hackathons");

    const data = await response.json();

    console.log(data);

    alert("Hackathons Loaded");

  } catch (error) {

    console.log(error);

    alert("Backend not connected");

  }
}

async function loadDashboard() {

  try {

    const response = await fetch("http://localhost:5000/api/dashboard");

    const data = await response.json();

    console.log(data);

    alert("Dashboard Loaded");

  } catch (error) {

    console.log(error);

    alert("Backend not connected");

  }
}

async function loadAbout() {

  try {

    const response = await fetch("http://localhost:5000/api/about");

    const data = await response.json();

    console.log(data);

    alert("About Loaded");

  } catch (error) {

    console.log(error);

    alert("Backend not connected");

  }
}

function loadContact() {

  alert("Contact Page Opened");

}