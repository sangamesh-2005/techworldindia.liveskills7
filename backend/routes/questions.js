const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Get all questions (randomised, limit 30) ──────
router.get("/questions", (req, res) => {
  db.query(
    "SELECT id, question, options, answer FROM questions ORDER BY RAND() LIMIT 30",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      // Parse options JSON string back to array
      const formatted = results.map((q) => ({
        ...q,
        options: JSON.parse(q.options),
      }));

      res.json(formatted);
    }
  );
});

// ── Add a question (admin use) ────────────────────
router.post("/questions", (req, res) => {
  const { question, options, answer, category } = req.body;

  if (!question || !options || !answer) {
    return res.status(400).json({ message: "question, options, answer required" });
  }

  db.query(
    "INSERT INTO questions (question, options, answer, category) VALUES (?, ?, ?, ?)",
    [question, JSON.stringify(options), answer, category || "general"],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "Question added", id: result.insertId });
    }
  );
});

module.exports = router;
