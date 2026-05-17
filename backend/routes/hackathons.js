const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Get all hackathons ────────────────────────────
router.get("/hackathons", (req, res) => {
  db.query(
    "SELECT * FROM hackathons ORDER BY date ASC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
});

// ── Get single hackathon ──────────────────────────
router.get("/hackathons/:id", (req, res) => {
  db.query(
    "SELECT * FROM hackathons WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "Hackathon not found" });
      res.json(results[0]);
    }
  );
});

// ── Add a hackathon ───────────────────────────────
router.post("/hackathons", (req, res) => {
  const { title, description, date, location, prize, registration_link } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "title and date are required" });
  }

  db.query(
    `INSERT INTO hackathons (title, description, date, location, prize, registration_link)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description || "", date, location || "Online", prize || "", registration_link || ""],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "Hackathon added", id: result.insertId });
    }
  );
});

module.exports = router;
