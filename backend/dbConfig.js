// backend/dbConfig.js
module.exports = {
  db1Config: {
    user: "steel2",
    password: "steel2",
    server: "WORKDESKTOP\\SQLEXPRESS",
    database: "CEReporting",
    options: {
      encrypt: false, // Adjust as needed
      enableArithAbort: true,
    },
  },
  db2Config: {
    user: "steel2",
    password: "steel2",
    server: "WORKDESKTOP\\SQLEXPRESS",
    database: "Steel057",
    options: {
      encrypt: false, // Adjust as needed
      enableArithAbort: true,
    },
  },
};
