require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const _dirname = __dirname;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

// Calculate tax endpoint
app.post("/calculate-tax", (req, res) => {
  const { annualIncome, investments, otherDeductions, otherIncome } = req.body;

  // Calculate taxable income
  const taxableIncome =
    parseFloat(annualIncome) +
    parseFloat(otherIncome) -
    parseFloat(investments) -
    parseFloat(otherDeductions);

  // Calculate tax as per Indian tax slabs (2023)
  let taxPayable = 0;
  if (taxableIncome <= 250000) {
    taxPayable = 0;
  } else if (taxableIncome <= 500000) {
    taxPayable = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    taxPayable = 12500 + (taxableIncome - 500000) * 0.2;
  } else {
    taxPayable = 112500 + (taxableIncome - 1000000) * 0.3;
  }

  // Save to database
  const query = `INSERT INTO tax_records (annualIncome, investments, otherDeductions, otherIncome, taxableIncome, taxPayable) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      annualIncome,
      investments,
      otherDeductions,
      otherIncome,
      taxableIncome,
      taxPayable,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("Record inserted");
      res.json({ taxableIncome, taxPayable });
    }
  );
});

// Serve frontend files
app.use(express.static(path.join(__dirname, "..", "tax-calculator", "dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "tax-calculator", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
