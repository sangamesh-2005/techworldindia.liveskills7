const express = require("express");
const router = express.Router();
const db = require("../db");

// ── Dashboard summary ─────────────────────────────
router.get("/dashboard", (req, res) => {
  const { user_id } = req.query;

  const summary = {};

  // Total practice problems
  db.query("SELECT COUNT(*) AS total FROM practice_problems", (err, r1) => {
    if (err) return res.status(500).json({ message: "Database error" });
    summary.totalProblems = r1[0].total;

    // Upcoming hackathons
    db.query(
      "SELECT COUNT(*) AS total FROM hackathons WHERE date >= CURDATE()",
      (err, r2) => {
        if (err) return res.status(500).json({ message: "Database error" });
        summary.upcomingHackathons = r2[0].total;

        // User-specific stats
        if (user_id) {
          db.query(
            `SELECT score, total, percentage, submitted_at
             FROM scores WHERE user_id = ?
             ORDER BY submitted_at DESC LIMIT 1`,
            [user_id],
            (err, r3) => {
              if (err) return res.status(500).json({ message: "Database error" });

              summary.latestScore = r3.length > 0 ? r3[0] : null;

              // Leaderboard rank
              db.query(
                `SELECT COUNT(*) + 1 AS rank FROM (
                   SELECT user_id, MAX(score) AS best
                   FROM scores WHERE user_id IS NOT NULL
                   GROUP BY user_id
                 ) t
                 WHERE t.best > (
                   SELECT COALESCE(MAX(score), 0) FROM scores WHERE user_id = ?
                 )`,
                [user_id],
                (err, r4) => {
                  if (err) return res.status(500).json({ message: "Database error" });
                  summary.leaderboardRank = r4[0].rank;
                  res.json(summary);
                }
              );
            }
          );
        } else {
          res.json(summary);
        }
      }
    );
  });
});

module.exports = router;
