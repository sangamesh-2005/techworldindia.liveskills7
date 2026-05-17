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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
});
