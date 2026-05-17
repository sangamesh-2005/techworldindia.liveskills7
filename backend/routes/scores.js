const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Get scoreboard (top 50) ───────────────────────
router.get("/scoreboard", (req, res) => {
  db.query(
    `SELECT s.id, u.name, s.score, s.total, s.percentage,
            s.submitted_at
     FROM scores s
     JOIN users u ON s.user_id = u.id
     ORDER BY s.score DESC, s.submitted_at ASC
     LIMIT 50`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
});

// ── Save a test score ─────────────────────────────
router.post("/test/save-score", (req, res) => {
  const { user_id, name, score, total } = req.body;

  if (score === undefined || !total) {
    return res.status(400).json({ message: "score and total are required" });
  }

  const percentage = Math.round((score / total) * 100);

  // If user_id provided, link to user; else store with name only
  if (user_id) {
    db.query(
      "INSERT INTO scores (user_id, score, total, percentage) VALUES (?, ?, ?, ?)",
      [user_id, score, total, percentage],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(201).json({ message: "Score saved", id: result.insertId });
      }
    );
  } else {
    // Guest score — store name directly
    db.query(
      `INSERT INTO scores (score, total, percentage, guest_name) VALUES (?, ?, ?, ?)`,
      [score, total, percentage, name || "Guest"],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(201).json({ message: "Score saved", id: result.insertId });
      }
    );
  }
});

module.exports = router;
