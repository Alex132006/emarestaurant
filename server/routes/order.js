/* =====================================================
   E.M.A RESTAURANT
   Fichier : server/routes/orders.js
===================================================== */

"use strict";

const express = require("express");
const crypto = require("crypto");
const pool = require("../database/db");

const router = express.Router();

/* =====================================================
   OUTILS
===================================================== */

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function createOrderReference() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `EMA-${date}-${random}`;
}

function isValidEmail(email) {
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");

  return (
    /^[+\d\s().-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15
  );
}

/* =====================================================
   POST /api/v1/orders
   Enregistrer une commande
===================================================== */

router.post("/", async (req, res) => {
  let connection;

  try {
    const body = req.body || {};
    const customer = body.customer || {};
    const items = body.items;

    /*
     * 1. Vérifier les articles.
     */

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Le panier est vide.",
      });
    }

    if (items.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Le nombre d'articles est trop élevé.",
      });
    }

    /*
     * 2. Nettoyer et vérifier les coordonnées.
     */

    const firstName = cleanString(customer.firstName, 80);
    const lastName = cleanString(customer.lastName, 80);
    const phone = cleanString(customer.phone, 25);
    const email = cleanString(customer.email, 150);

    const city = cleanString(customer.city, 100);
    const district = cleanString(customer.district, 120);
    const address = cleanString(customer.address, 250);

    const deliveryInstructions = cleanString(
      customer.deliveryInstructions,
      500,
    );

    const notes = cleanString(body.notes, 500);

    const paymentMethod = body.paymentMethod;

    if (!firstName || !lastName || !phone || !city || !district || !address) {
      return res.status(400).json({
        success: false,
        message: "Veuillez compléter les coordonnées et l'adresse.",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Le numéro de téléphone est invalide.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "L'adresse e-mail est invalide.",
      });
    }

    const allowedPaymentMethods = [
      "cash_on_delivery",
      "mtn_momo",
      "other_mobile_money",
    ];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Le mode de paiement sélectionné est invalide.",
      });
    }

    /*
     * 3. Valider les identifiants et les quantités.
     *
     * Les prix envoyés par le navigateur ne sont jamais utilisés.
     */

    const normalizedItems = [];
    const quantitiesByProduct = new Map();

    for (const item of items) {
      if (!item || typeof item !== "object") {
        return res.status(400).json({
          success: false,
          message: "Un article du panier est invalide.",
        });
      }

      const productId = Number(item.productId);
      const quantity = Number(item.quantity);

      if (
        !Number.isSafeInteger(productId) ||
        productId < 1 ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      ) {
        return res.status(400).json({
          success: false,
          message: "Un article ou une quantité est invalide.",
        });
      }

      quantitiesByProduct.set(
        productId,
        (quantitiesByProduct.get(productId) || 0) + quantity,
      );
    }

    for (const [productId, quantity] of quantitiesByProduct) {
      if (quantity > 99) {
        return res.status(400).json({
          success: false,
          message: "La quantité maximale par plat est de 99.",
        });
      }

      normalizedItems.push({
        productId,
        quantity,
      });
    }

    /*
     * 4. Ouvrir une transaction MySQL.
     */

    connection = await pool.getConnection();

    await connection.beginTransaction();

    /*
     * 5. Lire les prix et vérifier la disponibilité
     * des produits dans MySQL.
     */

    const productIds = normalizedItems.map((item) => item.productId);

    const placeholders = productIds.map(() => "?").join(",");

    const [products] = await connection.execute(
      `
                SELECT id, name, price, is_available
                FROM products
                WHERE id IN (${placeholders})
                FOR UPDATE
            `,
      productIds,
    );

    const productMap = new Map(
      products.map((product) => [Number(product.id), product]),
    );

    if (productMap.size !== productIds.length) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Un ou plusieurs plats n'existent pas.",
      });
    }

    let subtotal = 0;

    const orderItems = [];

    for (const item of normalizedItems) {
      const product = productMap.get(item.productId);

      if (!product || !product.is_available) {
        await connection.rollback();

        return res.status(409).json({
          success: false,
          message: "Un des plats sélectionnés n'est plus disponible.",
        });
      }

      const unitPrice = Number(product.price);

      if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) {
        throw new Error(`Prix invalide pour le produit ${item.productId}.`);
      }

      const lineTotal = unitPrice * item.quantity;

      if (!Number.isSafeInteger(lineTotal)) {
        throw new Error("Montant de commande trop élevé.");
      }

      subtotal += lineTotal;

      if (!Number.isSafeInteger(subtotal)) {
        throw new Error("Sous-total trop élevé.");
      }

      orderItems.push({
        productId: product.id,
        productName: product.name,
        unitPrice,
        quantity: item.quantity,
        lineTotal,
      });
    }

    /*
     * 6. Calculer la livraison et le total côté serveur.
     */

    const deliveryFee = Number(process.env.DELIVERY_FEE_FCFA || 1000);

    if (!Number.isSafeInteger(deliveryFee) || deliveryFee < 0) {
      throw new Error("Les frais de livraison sont mal configurés.");
    }

    const total = subtotal + deliveryFee;

    if (!Number.isSafeInteger(total)) {
      throw new Error("Montant total invalide.");
    }

    /*
     * 7. Générer une référence unique.
     */

    let reference = createOrderReference();

    /*
     * Le caractère aléatoire rend les collisions très improbables.
     * L'unicité est également garantie par la contrainte SQL UNIQUE.
     */

    /*
     * 8. Insérer la commande.
     */

    const [orderResult] = await connection.execute(
      `
                INSERT INTO orders (
                    reference,
                    first_name,
                    last_name,
                    phone,
                    email,
                    city,
                    district,
                    address,
                    delivery_instructions,
                    notes,
                    subtotal,
                    delivery_fee,
                    total,
                    payment_method,
                    payment_status,
                    status
                )
                VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, 'unpaid', 'pending'
                )
            `,
      [
        reference,
        firstName,
        lastName,
        phone,
        email || null,
        city,
        district,
        address,
        deliveryInstructions || null,
        notes || null,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
      ],
    );

    /*
     * 9. Insérer les lignes de commande.
     */

    for (const item of orderItems) {
      await connection.execute(
        `
                    INSERT INTO order_items (
                        order_id,
                        product_id,
                        product_name,
                        unit_price,
                        quantity,
                        line_total
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                `,
        [
          orderResult.insertId,
          item.productId,
          item.productName,
          item.unitPrice,
          item.quantity,
          item.lineTotal,
        ],
      );
    }

    /*
     * 10. Confirmer la transaction.
     */

    await connection.commit();

    /*
     * 11. Retourner la référence au navigateur.
     */

    return res.status(201).json({
      success: true,
      message: "Commande enregistrée avec succès.",

      reference,

      order: {
        reference,
        status: "pending",
        paymentStatus: "unpaid",
        currency: "XAF",
        subtotal,
        deliveryFee,
        total,
      },
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Erreur lors de l'annulation SQL :", rollbackError);
      }
    }

    console.error("Erreur d'enregistrement de commande :", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(503).json({
        success: false,
        message: "Impossible de générer la référence. Veuillez réessayer.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Une erreur est survenue. Votre commande n'a pas pu être confirmée.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.post("/:reference", async (req, res, next) => {
  const reference = cleanString(req.params.reference, 40).toUpperCase();
  const phone = cleanString(req.body?.phone, 25);
  const phoneDigits = phone.replace(/\D/g, "");

  if (!/^EMA-\d{8}-[A-F0-9]{8}$/.test(reference) || phoneDigits.length < 7) {
    return res.status(400).json({
      success: false,
      message: "Référence ou numéro de téléphone invalide.",
    });
  }

  try {
    const [[order]] = await pool.execute(
      `SELECT reference, phone, status, payment_status AS paymentStatus,
              payment_method AS paymentMethod, subtotal,
              delivery_fee AS deliveryFee, total, created_at AS createdAt
       FROM orders
       WHERE reference = ?`,
      [reference],
    );

    if (
      !order ||
      order.phone.replace(/\D/g, "") !== phoneDigits
    ) {
      return res.status(404).json({
        success: false,
        message: "Aucune commande ne correspond à ces informations.",
      });
    }

    const [items] = await pool.execute(
      `SELECT product_name AS name, unit_price AS unitPrice,
              quantity, line_total AS lineTotal
       FROM order_items
       WHERE order_id = (
         SELECT id FROM orders WHERE reference = ?
       )
       ORDER BY id`,
      [reference],
    );

    res.json({
      success: true,
      order: {
        reference: order.reference,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        createdAt: order.createdAt,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
