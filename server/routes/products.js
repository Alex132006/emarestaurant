"use strict";

const express = require("express");
const pool = require("../database/db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const [products] = await pool.execute(
      `SELECT p.id, p.name, p.slug, p.description, p.price, p.image,
              c.name AS category, c.slug AS categorySlug
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.is_available = TRUE
         AND (c.id IS NULL OR c.is_active = TRUE)
       ORDER BY c.name, p.name`,
    );

    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
