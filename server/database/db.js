/* =====================================================
   E.M.A RESTAURANT
   Fichier : server/db.js
===================================================== */

"use strict";

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",

  port: Number(process.env.DB_PORT || 3306),

  user: process.env.DB_USER || "root",

  password: process.env.DB_PASSWORD || "",

  database: process.env.DB_NAME || "ema_restaurant",

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

  charset: "utf8mb4",
});

module.exports = pool;
