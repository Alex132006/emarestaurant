"use strict";

const crypto = require("crypto");
const express = require("express");
const pool = require("../database/db");

const router = express.Router();
const cookieName = "ema_admin";
const sessionDuration = 8 * 60 * 60 * 1000;
const loginWindow = 15 * 60 * 1000;
const maxLoginAttempts = 5;
const failedLogins = new Map();
const orderStatuses = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

function isConfigured() {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32,
  );
}

function sign(value) {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(value)
    .digest("base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + sessionDuration }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

function isValidSession(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));

  if (!cookie) {
    return false;
  }

  try {
    const token = decodeURIComponent(cookie.slice(cookieName.length + 1));
    const [payload, signature] = token.split(".");
    if (!payload || !signature || !safeEqual(sign(payload), signature)) {
      return false;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    return Number.isSafeInteger(session.expiresAt) && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function requireConfiguration(req, res, next) {
  if (!isConfigured()) {
    return res.status(503).json({
      success: false,
      message: "Configurez ADMIN_PASSWORD et ADMIN_SESSION_SECRET dans back-end/.env.",
    });
  }

  next();
}

function requireSession(req, res, next) {
  if (!isValidSession(req)) {
    return res.status(401).json({
      success: false,
      message: "Veuillez vous connecter à l'administration.",
    });
  }

  next();
}

function checkSameOrigin(req, res, next) {
  const origin = req.get("origin");

  if (origin && new URL(origin).host !== req.get("host")) {
    return res.status(403).json({
      success: false,
      message: "Origine de la requête non autorisée.",
    });
  }

  next();
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function createSlug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

router.post("/login", requireConfiguration, checkSameOrigin, (req, res) => {
  const ip = req.ip;
  const now = Date.now();
  for (const [address, attempt] of failedLogins) {
    if (attempt.expiresAt <= now) failedLogins.delete(address);
  }

  const previousAttempts = failedLogins.get(ip);
  if (previousAttempts && previousAttempts.count >= maxLoginAttempts) {
    return res.status(429).json({
      success: false,
      message: "Trop de tentatives. Réessayez dans quelques minutes.",
    });
  }

  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!safeEqual(password, process.env.ADMIN_PASSWORD)) {
    failedLogins.set(ip, {
      count: (previousAttempts?.count || 0) + 1,
      expiresAt: now + loginWindow,
    });
    return res.status(401).json({
      success: false,
      message: "Mot de passe incorrect.",
    });
  }

  failedLogins.delete(ip);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=${createSessionToken()}; HttpOnly; SameSite=Strict; Path=/api/v1/admin; Max-Age=${sessionDuration / 1000}${secure}`,
  );
  res.json({ success: true });
});

router.post("/logout", checkSameOrigin, (req, res) => {
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=; HttpOnly; SameSite=Strict; Path=/api/v1/admin; Max-Age=0`,
  );
  res.json({ success: true });
});

router.use(requireConfiguration, requireSession);

router.get("/session", (req, res) => {
  res.json({ success: true });
});

router.get("/products", async (req, res, next) => {
  try {
    const [[products], [categories]] = await Promise.all([
      pool.execute(
        `SELECT p.id, p.name, p.slug, p.description, p.price, p.image,
                p.is_available AS isAvailable, p.category_id AS categoryId,
                c.name AS category
         FROM products p
         LEFT JOIN categories c ON c.id = p.category_id
         ORDER BY p.name`,
      ),
      pool.execute("SELECT id, name FROM categories WHERE is_active = TRUE ORDER BY name"),
    ]);

    res.json({ success: true, products, categories });
  } catch (error) {
    next(error);
  }
});

router.post("/products", checkSameOrigin, async (req, res, next) => {
  const body = req.body || {};
  const name = cleanText(body.name, 150);
  const description = cleanText(body.description, 2000);
  const image = cleanText(body.image, 500);
  const price = Number(body.price);
  const categoryId = Number(body.categoryId);

  if (
    !name ||
    !Number.isSafeInteger(price) ||
    price < 0 ||
    !Number.isSafeInteger(categoryId) ||
    categoryId < 1 ||
    typeof body.isAvailable !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Nom, prix et catégorie valides sont obligatoires.",
    });
  }

  try {
    const [categories] = await pool.execute(
      "SELECT id FROM categories WHERE id = ? AND is_active = TRUE",
      [categoryId],
    );
    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "La catégorie sélectionnée n'existe pas.",
      });
    }

    const slug = `${createSlug(name)}-${crypto.randomBytes(3).toString("hex")}`;
    const [result] = await pool.execute(
      `INSERT INTO products (category_id, name, slug, description, price, image, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        categoryId,
        name,
        slug,
        description || null,
        price,
        image || null,
        body.isAvailable,
      ],
    );

    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    next(error);
  }
});

router.patch("/products/:id", checkSameOrigin, async (req, res, next) => {
  const body = req.body || {};
  const id = Number(req.params.id);
  const name = cleanText(body.name, 150);
  const description = cleanText(body.description, 2000);
  const image = cleanText(body.image, 500);
  const price = Number(body.price);
  const categoryId = Number(body.categoryId);
  const isAvailable = body.isAvailable;

  if (
    !Number.isSafeInteger(id) ||
    id < 1 ||
    !name ||
    !Number.isSafeInteger(price) ||
    price < 0 ||
    !Number.isSafeInteger(categoryId) ||
    categoryId < 1 ||
    typeof isAvailable !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Les informations du produit sont invalides.",
    });
  }

  try {
    const [categories] = await pool.execute(
      "SELECT id FROM categories WHERE id = ? AND is_active = TRUE",
      [categoryId],
    );
    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "La catégorie sélectionnée n'existe pas.",
      });
    }

    const [result] = await pool.execute(
      `UPDATE products
       SET category_id = ?, name = ?, description = ?, price = ?, image = ?, is_available = ?
       WHERE id = ?`,
      [categoryId, name, description || null, price, image || null, isAvailable, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Produit introuvable." });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const [orders] = await pool.execute(
      `SELECT id, reference, first_name AS firstName, last_name AS lastName,
              phone, city, district, subtotal, delivery_fee AS deliveryFee,
              total, payment_method AS paymentMethod, payment_status AS paymentStatus,
              status, created_at AS createdAt
       FROM orders
       ORDER BY created_at DESC
       LIMIT 200`,
    );

    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
});

router.get("/orders/:reference", async (req, res, next) => {
  try {
    const [[order]] = await pool.execute(
      `SELECT id, reference, first_name AS firstName, last_name AS lastName,
              phone, email, city, district, address,
              delivery_instructions AS deliveryInstructions, notes,
              subtotal, delivery_fee AS deliveryFee, total,
              payment_method AS paymentMethod, payment_status AS paymentStatus,
              status, created_at AS createdAt
       FROM orders
       WHERE reference = ?`,
      [req.params.reference],
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Commande introuvable." });
    }

    const [items] = await pool.execute(
      `SELECT product_name AS name, unit_price AS unitPrice, quantity, line_total AS lineTotal
       FROM order_items
       WHERE order_id = ?
       ORDER BY id`,
      [order.id],
    );

    res.json({ success: true, order: { ...order, items } });
  } catch (error) {
    next(error);
  }
});

router.patch("/orders/:reference/status", checkSameOrigin, async (req, res, next) => {
  const status = req.body?.status;

  if (!orderStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Statut de commande invalide.",
    });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE orders SET status = ? WHERE reference = ?",
      [status, req.params.reference],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Commande introuvable." });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/reports", async (req, res, next) => {
  try {
    const [[summary]] = await pool.execute(
      `SELECT COUNT(*) AS orderCount,
              COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total ELSE 0 END), 0) AS revenue,
              SUM(status = 'pending') AS pendingCount,
              SUM(status = 'delivered') AS deliveredCount
       FROM orders`,
    );

    res.json({ success: true, summary });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
