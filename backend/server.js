const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const ExcelJS = require("exceljs"); // Add this line

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pools = {};

async function createPools() {
  pools.db1 = new sql.ConnectionPool(dbConfig.db1Config);
  pools.db2 = new sql.ConnectionPool(dbConfig.db2Config);
  pools.db3 = new sql.ConnectionPool(dbConfig.db3Config);

  try {
    await pools.db1.connect();
    console.log("Connected to db1");
  } catch (err) {
    console.error("Failed to connect to db1:", err.message);
  }

  try {
    await pools.db2.connect();
    console.log("Connected to db2");
  } catch (err) {
    console.error("Failed to connect to db2:", err.message);
  }
  try {
    await pools.db3.connect();
    console.log("Connected to db3");
  } catch (err) {
    console.error("Failed to connect to db3:", err.message);
  }
}

createPools();

app.post("/execute-sql", async (req, res) => {
  const { db, sql: query } = req.body;

  if (!pools[db]) {
    return res.status(400).send("Invalid database");
  }

  try {
    const result = await pools[db].request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/generate-excel", async (req, res) => {
  const { db, sql: query } = req.body;

  if (!pools[db]) {
    return res.status(400).send("Invalid database");
  }

  try {
    const result = await pools[db].request().query(query);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Results");

    // Add column headers
    worksheet.columns = Object.keys(result.recordset[0]).map((key) => ({
      header: key,
      key,
    }));

    // Add rows
    result.recordset.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate Excel file
    res.setHeader("Content-Disposition", "attachment; filename=results.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
