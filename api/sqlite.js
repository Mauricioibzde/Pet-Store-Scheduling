const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, "data.sqlite");
const db = new sqlite3.Database(DB_PATH);

function init() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tutor TEXT NOT NULL,
        pet TEXT NOT NULL,
        phone TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        hour TEXT NOT NULL
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL
      )`
    );
  });
}

function seed(cb) {
  db.get("SELECT COUNT(*) as cnt FROM appointments", [], (err, row) => {
    if (err) return cb(err);
    if (row.cnt > 0) return cb(null);

    const stmt = db.prepare(
      "INSERT INTO appointments (tutor, pet, phone, description, date, hour) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const seedData = [
      ["Helena Souza", "Cheddar", "(55) 98524-5478", "Bath", "2025-12-18", "09:00"],
      ["Lucas Santos", "Milo", "(55) 98524-5808", "Grooming", "2025-12-18", "14:00"],
      ["Mariana Costa", "Max", "(55) 99999-1234", "Toenail Trim", "2025-12-18", "11:00"],
    ];

    db.serialize(() => {
      for (const row of seedData) stmt.run(row);
      stmt.finalize((e) => {
        if (e) return cb(e);
        db.run(
          "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
          ["Pet Shop Manager", "manager@petworld.com", "admin"],
          cb
        );
      });
    });
  });
}

module.exports = {
  init,
  seed,
  run: db.run.bind(db),
  all: db.all.bind(db),
  get: db.get.bind(db),
};
