"use strict";

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const pool = require("../server/database/db");
const orderRoutes = require("../server/routes/order");
const productRoutes = require("../server/routes/products");
const adminRoutes = require("../server/routes/admin");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const frontendPath = path.join(__dirname, "..", "front-end");
const adminPath = path.join(__dirname, "..", "admin");

app.disable("x-powered-by");
app.use(
  express.json({
    limit: "20kb",
  }),
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
  }),
);

app.get("/api/v1/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      service: "E.M.A Restaurant API",
      database: "connected",
    });
  } catch (error) {
    console.error("Vérification MySQL échouée :", error.message);

    res.status(503).json({
      success: false,
      service: "E.M.A Restaurant API",
      database: "unavailable",
    });
  }
});

app.get("/api/v1/config", (req, res) => {
  const deliveryFee = Number(process.env.DELIVERY_FEE_FCFA || 1000);

  if (!Number.isSafeInteger(deliveryFee) || deliveryFee < 0) {
    return res.status(503).json({
      success: false,
      message: "Les frais de livraison sont mal configurés.",
    });
  }

  res.json({ success: true, deliveryFee, currency: "XAF" });
});

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(
  "/admin",
  express.static(adminPath, {
    dotfiles: "deny",
    index: "connexion.html",
  }),
);
app.use(
  express.static(frontendPath, {
    dotfiles: "deny",
    index: "index.html",
  }),
);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Cette route API n'existe pas.",
  });
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Le corps JSON de la requête est invalide.",
    });
  }

  console.error("Erreur serveur :", error.message);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    success: false,
    message: "Une erreur interne est survenue.",
  });
});

async function startServer() {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("------------------------------------");
      console.log("E.M.A RESTAURANT");
      console.log(`Site : http://localhost:${PORT}`);
      console.log(`API : http://localhost:${PORT}/api/v1`);
      console.log("------------------------------------");
    });
  } catch (error) {
    console.error(
      "Impossible de démarrer : vérifie la configuration MySQL.",
      error.message,
    );

    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
