const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Get all practice problems ─────────────────────
router.get("/practice", (req, res) => {
  const { difficulty, category } = req.query;

  let sql = "SELECT * FROM practice_problems WHERE 1=1";
  const params = [];

  if (difficulty) {
    sql += " AND difficulty = ?";
    params.push(difficulty);
  }
  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY id ASC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// ── Get single practice problem ───────────────────
router.get("/practice/:id", (req, res) => {
  db.query(
    "SELECT * FROM practice_problems WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "Problem not found" });
      res.json(results[0]);
    }
  );
});

// ── Add a practice problem ────────────────────────
router.post("/practice", (req, res) => {
  const { title, description, difficulty, category, solution } = req.body;

  if (!title || !difficulty) {
    return res.status(400).json({ message: "title and difficulty required" });
  }

  db.query(
    "INSERT INTO practice_problems (title, description, difficulty, category, solution) VALUES (?, ?, ?, ?, ?)",
    [title, description || "", difficulty, category || "general", solution || ""],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "Problem added", id: result.insertId });
    }
  );
});

module.exports = router;
