const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./sqlite");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());

// Ensure tables exist
db.init();

// List appointments
app.get("/appointments", (req, res) => {
  db.all("SELECT id, tutor, pet, phone, description, date, hour FROM appointments ORDER BY date, hour", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "db_error", details: err.message });
    res.json(rows);
  });
});

// Create appointment
app.post("/appointments", (req, res) => {
  const { tutor, pet, phone, description, date, hour } = req.body || {};
  if (!tutor || !pet || !phone || !description || !date || !hour) {
    return res.status(400).json({ error: "validation_error" });
  }

  const sql = "INSERT INTO appointments (tutor, pet, phone, description, date, hour) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(sql, [tutor, pet, phone, description, date, hour], function (err) {
    if (err) return res.status(500).json({ error: "db_error", details: err.message });
    res.status(201).json({ id: this.lastID, tutor, pet, phone, description, date, hour });
  });
});

// Delete appointment
app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM appointments WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "db_error", details: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "not_found" });
    res.status(204).end();
  });
});

// List users (optional)
app.get("/users", (req, res) => {
  db.all("SELECT id, name, email, role FROM users ORDER BY id", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "db_error", details: err.message });
    res.json(rows);
  });
});

// Seed initial data (optional) if empty
app.post("/seed", async (req, res) => {
  db.seed((err) => {
    if (err) return res.status(500).json({ error: "db_error", details: err.message });
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
