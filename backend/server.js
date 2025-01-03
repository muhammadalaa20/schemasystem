const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789", // Replace with your MySQL password
  database: "DailyReports",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// API: Fetch all reports (grouped by date and shift, ordered by date desc)
app.get("/api/reports", (req, res) => {
  const query = `
    SELECT r.id, r.report_date, r.shift, t.category, t.action_taken, t.result
    FROM reports r
    LEFT JOIN tasks t ON r.id = t.report_id
    ORDER BY r.report_date DESC, FIELD(r.shift, 'Morning', 'Evening', 'Night')
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to fetch data for a specific shift on a specific day
app.get("/api/reports/:date/:shift", (req, res) => {
  const { date, shift } = req.params;
  const query = `
    SELECT r.id, r.report_date, r.shift, t.category, t.action_taken, t.result
    FROM reports r
    LEFT JOIN tasks t ON r.id = t.report_id
    WHERE r.report_date = ? AND r.shift = ?
  `;
  db.query(query, [date, shift], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.status(200).json(results);
  });
});

// API: Fetch all tasks for a specific report for it's date and shift
app.get("/api/reports/:id/tasks", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM tasks WHERE report_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API: Update the Tasks for a specific shift for a specific report
app.put("/api/reports/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;
  const query = `UPDATE tasks SET category = ?, action_taken = ?, result = ? WHERE report_id = ?`;
  db.query(
    query,
    [tasks.category, tasks.actionTaken, tasks.result, id],
    (err) => {
      if (err) throw err;
      res.status(200).send("Tasks updated successfully");
    }
  );
});

// API: Delete the Tasks for a specific shift for a specific report
app.delete("/api/reports/:id/tasks", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tasks WHERE report_id = ?`;
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.status(200).send("Tasks deleted successfully");
  });
});

app.post("/api/reports", (req, res) => {
  const { reportDate, shift, tasks } = req.body;

  // Insert the report
  const insertReport = `INSERT INTO reports (report_date, shift) VALUES (?, ?)`;
  db.query(insertReport, [reportDate, shift], (err, result) => {
    if (err) {
      // Check for duplicate entry error (MySQL error code 1062)
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "A report for this date and shift already exists.",
        });
      }
      return res.status(500).json({ message: "Server error", error: err });
    }

    const reportId = result.insertId;

    // Insert tasks
    const insertTask = `INSERT INTO tasks (report_id, category, action_taken, result) VALUES ?`;
    const taskValues = tasks.map((task) => [
      reportId,
      task.category,
      task.actionTaken,
      task.result,
    ]);
    db.query(insertTask, [taskValues], (err) => {
      if (err) throw err;
      res.status(201).send("Report added successfully");
    });
  });
});

// API: to update a report
app.put("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const { reportDate, shift, tasks } = req.body;

  // Update the report
  const updateReport = `UPDATE reports SET report_date = ?, shift = ? WHERE id = ?`;
  db.query(updateReport, [reportDate, shift, id], (err) => {
    if (err) throw err;
    res.status(200).send("Report updated successfully");
  });

  // Update tasks
  const deleteTasks = `DELETE FROM tasks WHERE report_id = ?`;
  db.query(deleteTasks, [id], (err) => {
    if (err) throw err;
    const insertTask = `INSERT INTO tasks (report_id, category, action_taken, result) VALUES ?`;
    const taskValues = tasks.map((task) => [
      id,
      task.category,
      task.actionTaken,
      task.result,
    ]);
    db.query(insertTask, [taskValues], (err) => {
      if (err) throw err;
      res.status(200).send("Report updated successfully");
    });
  });
});

// API: to delete a report
app.delete("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const deleteReport = `DELETE FROM reports WHERE id = ?`;
  db.query(deleteReport, [id], (err) => {
    if (err) throw err;
    res.status(200).send("Report deleted successfully");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
