const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Send a contact message ────────────────────────
router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({
        message: "Message received! We will get back to you soon.",
        id: result.insertId,
      });
    }
  );
});

// ── Get all messages (admin) ──────────────────────
router.get("/contact", (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
});

module.exports = router;
