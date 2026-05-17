# techworldindia.liveskills2026

A full-stack student skills platform for aptitude tests, practice problems, hackathons, and leaderboards.

---

## 📁 Project Structure

```
techworldindia/
├── backend/
│   ├── server.js          ← Express entry point
│   ├── db.js              ← MySQL connection
│   ├── database.sql       ← Schema + seed data
│   ├── package.json
│   ├── .env.example
│   └── routes/
│       ├── auth.js        ← /api/register, /api/login
│       ├── questions.js   ← /api/questions
│       ├── scores.js      ← /api/scoreboard, /api/test/save-score
│       ├── practice.js    ← /api/practice
│       ├── hackathons.js  ← /api/hackathons
│       ├── contact.js     ← /api/contact
│       └── dashboard.js   ← /api/dashboard
└── frontend/
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── dashboard.html
    ├── test.html
    ├── aptitude.html
    ├── scoreboard.html
    ├── practice.html
    ├── hackathon.html
    ├── about.html
    ├── contact.html
    └── js/
        └── app.js
```

---

## ⚙️ Setup Instructions

### 1. Install MySQL and create the database

Make sure MySQL is running on your machine, then:

```bash
mysql -u root -p < backend/database.sql
```

This creates the `techworldindia` database with all tables and seed data.

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Open `.env` and set your MySQL password:

```
DB_PASS=your_mysql_password_here
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Start the backend server

```bash
npm start
# or for auto-reload during development:
npm run dev
```

Server starts at **http://localhost:5000**

### 5. Open the frontend

Open `frontend/index.html` in your browser directly, or serve it with a simple server:

```bash
# Using VS Code Live Server extension (recommended)
# OR
cd frontend
npx serve .
```

---

## 🔌 API Endpoints

| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| POST   | /api/register           | Create new account      |
| POST   | /api/login              | Login                   |
| GET    | /api/questions          | 30 random questions      |
| GET    | /api/scoreboard         | Top 50 scores           |
| POST   | /api/test/save-score    | Save test result        |
| GET    | /api/practice           | All practice problems   |
| GET    | /api/hackathons         | All hackathons          |
| POST   | /api/contact            | Send contact message    |
| GET    | /api/dashboard          | Dashboard summary stats |
| GET    | /api/about              | Platform info           |

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap 5, Vanilla JS
- **Backend**: Node.js, Express.js
- **Database**: MySQL

---

## 👨‍💻 Developer

Built by **Sangamesh Halli**  
GitHub: [sangamesh-2005](https://github.com/sangamesh-2005/sangamesh-2005)  
LinkedIn: [sangamesh-halli](https://www.linkedin.com/in/sangamesh-halli-281521301)
