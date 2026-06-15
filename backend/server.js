const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes      = require("./routes/auth");
const questionRoutes  = require("./routes/questions");
const scoreRoutes     = require("./routes/scores");
const practiceRoutes  = require("./routes/practice");
const hackathonRoutes = require("./routes/hackathons");
const contactRoutes   = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────
app.use("/api", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", scoreRoutes);
app.use("/api", practiceRoutes);
app.use("/api", hackathonRoutes);
app.use("/api", contactRoutes);
app.use("/api", dashboardRoutes);

// ── About ─────────────────────────────────────────
app.get("/api/about", (req, res) => {
  res.json({
    platform: "techworldindia.liveskills2026",
    description:
      "A platform for engineering and diploma students to practice aptitude tests, join hackathons, and find jobs.",
    developer: "sangamesh-halli",
    year: 2026,
  });
});

// ── Health check ──────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});
//-------SB----------//
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      score INTEGER,
      total INTEGER,
      percentage REAL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.post("/api/score", (req, res) => {

  const { name, score, total } = req.body;

  const percentage = ((score / total) * 100).toFixed(2);

  db.run(
    `INSERT INTO scores(name,score,total,percentage)
     VALUES(?,?,?,?)`,
    [name, score, total, percentage],
    function(err){

      if(err){

        return res.status(500).json(err);

      }

      res.json({success:true});
    }
  );
});

app.get("/api/scoreboard", (req, res) => {

  db.all(
    `SELECT * FROM scores
     ORDER BY percentage DESC,
     score DESC`,
    [],
    (err, rows) => {

      if(err){

        return res.status(500).json(err);

      }

      res.json(rows);

    }
  );
});
//--------DB---------//
app.get("/api/dashboard", (req, res) => {

    const userId = req.query.user_id;

    res.json({
        totalProblems: 120,

        upcomingHackathons: 8,

        latestScore: {
            score: 18,
            total: 20
        },

        leaderboardRank: 5
    });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
});

