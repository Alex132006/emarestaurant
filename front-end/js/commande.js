/* =====================================================
   E.M.A RESTAURANT
   Fichier : js/commande.js
   Gestion de la validation de commande
===================================================== */

"use strict";

/* =========================
   CONFIGURATION
========================= */

const EMA_CHECKOUT = {
  cartKey: "ema_cart",
  ordersEndpoint: "/api/v1/orders",
  deliveryFee: 1000,
};
let checkoutConfigLoaded = false;

/* =========================
   ÉLÉMENTS HTML
========================= */

const checkoutDOM = {
  form: document.getElementById("checkout-form"),
  content: document.getElementById("checkout-content"),
  empty: document.getElementById("checkout-empty"),

  items: document.getElementById("checkout-order-items"),
  subtotal: document.getElementById("checkout-subtotal"),
  delivery: document.getElementById("checkout-delivery"),
  total: document.getElementById("checkout-total"),

  message: document.getElementById("checkout-message"),
  submit: document.getElementById("submit-order"),
};

/* =========================
   OUTILS
========================= */

function checkoutFormatPrice(value) {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(Math.round(Number(value) || 0)) + " FCFA"
  );
}

function checkoutEscapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function checkoutShowMessage(message, type = "error") {
  if (!checkoutDOM.message) {
    return;
  }

  checkoutDOM.message.textContent = message;
  checkoutDOM.message.className = "checkout-message " + type;
}

function checkoutSetLoading(isLoading) {
  if (!checkoutDOM.submit) {
    return;
  }

  checkoutDOM.submit.disabled = isLoading || !checkoutConfigLoaded;

  checkoutDOM.submit.textContent = isLoading
    ? "Envoi en cours..."
    : "Confirmer mes informations →";
}

/* =========================
   RÉCUPÉRER LE PANIER
========================= */

function checkoutGetCart() {
  try {
    const savedCart = localStorage.getItem(EMA_CHECKOUT.cartKey);

    if (!savedCart) {
      return [];
    }

    const cart = JSON.parse(savedCart);

    if (!Array.isArray(cart)) {
      return [];
    }

    return cart
      .filter((item) => {
        return (
          item &&
          item.id !== undefined &&
          item.id !== null &&
          Number.isFinite(Number(item.price)) &&
          Number(item.price) >= 0 &&
          Number.isInteger(Number(item.quantity)) &&
          Number(item.quantity) >= 1 &&
          Number(item.quantity) <= 99
        );
      })
      .map((item) => ({
        id: item.id,
        name: String(item.name || "Plat E.M.A"),
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));
  } catch (error) {
    console.error("Erreur de lecture du panier :", error);
    return [];
  }
}

/* =========================
   CALCUL DES TOTAUX
========================= */

function checkoutGetSubtotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function checkoutGetDelivery(cart) {
  return cart.length > 0 ? EMA_CHECKOUT.deliveryFee : 0;
}

/* =========================
   AFFICHER LES ARTICLES
========================= */

function checkoutRenderItems(cart) {
  if (!checkoutDOM.items) {
    return;
  }

  if (cart.length === 0) {
    checkoutDOM.items.innerHTML = "";
    return;
  }

  checkoutDOM.items.innerHTML = cart
    .map((item) => {
      const name = checkoutEscapeHTML(item.name);
      const quantity = item.quantity;
      const lineTotal = item.price * quantity;

      return `
            <div class="checkout-order-item">

                <div>
                    <p class="checkout-order-item-name">
                        ${name}
                    </p>

                    <span class="checkout-order-item-quantity">
                        Quantité : ${quantity}
                    </span>
                </div>

                <strong class="checkout-order-item-price">
                    ${checkoutFormatPrice(lineTotal)}
                </strong>

            </div>
        `;
    })
    .join("");
}

/* =========================
   ACTUALISER LE RÉCAPITULATIF
========================= */

function checkoutUpdateSummary() {
  const cart = checkoutGetCart();

  const isEmpty = cart.length === 0;

  if (checkoutDOM.content) {
    checkoutDOM.content.hidden = isEmpty;
  }

  if (checkoutDOM.empty) {
    checkoutDOM.empty.hidden = !isEmpty;
  }

  if (isEmpty) {
    checkoutRenderItems([]);
    return;
  }

  const subtotal = checkoutGetSubtotal(cart);
  const delivery = checkoutGetDelivery(cart);
  const total = subtotal + delivery;

  checkoutRenderItems(cart);

  if (checkoutDOM.subtotal) {
    checkoutDOM.subtotal.textContent = checkoutFormatPrice(subtotal);
  }

  if (checkoutDOM.delivery) {
    checkoutDOM.delivery.textContent = checkoutFormatPrice(delivery);
  }

  if (checkoutDOM.total) {
    checkoutDOM.total.textContent = checkoutFormatPrice(total);
  }

  if (typeof window.updateCartCount === "function") {
    window.updateCartCount();
  }
}

/* =========================
   RÉCUPÉRER LES DONNÉES CLIENT
========================= */

function checkoutGetCustomerData() {
  const formData = new FormData(checkoutDOM.form);

  return {
    firstName: String(formData.get("firstName") || "").trim(),
    lastName: String(formData.get("lastName") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),

    city: String(formData.get("city") || "").trim(),
    district: String(formData.get("district") || "").trim(),
    address: String(formData.get("address") || "").trim(),

    deliveryInstructions: String(
      formData.get("deliveryInstructions") || "",
    ).trim(),

    paymentMethod: String(formData.get("paymentMethod") || "cash_on_delivery"),

    orderNotes: String(formData.get("orderNotes") || "").trim(),

    acceptTerms: formData.get("acceptTerms") === "on",
  };
}

/* =========================
   VALIDATION COMPLÉMENTAIRE
========================= */

function checkoutValidate(customer) {
  if (!customer.firstName || !customer.lastName) {
    return "Veuillez renseigner votre nom et votre prénom.";
  }

  if (customer.firstName.length > 80 || customer.lastName.length > 80) {
    return "Le nom et le prénom ne doivent pas dépasser 80 caractères.";
  }

  if (!customer.phone || customer.phone.length > 25) {
    return "Veuillez renseigner un numéro de téléphone valide.";
  }

  /*
   * Contrôle de forme élémentaire.
   * La validation définitive du numéro devra être adaptée
   * aux formats de téléphone acceptés par le restaurant.
   */

  const phoneCharactersValid = /^[+\d\s().-]+$/.test(customer.phone);
  const phoneDigits = customer.phone.replace(/\D/g, "");

  if (
    !phoneCharactersValid ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    return "Le format du numéro de téléphone semble incorrect.";
  }

  if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return "Veuillez vérifier votre adresse e-mail.";
  }

  if (!customer.city || !customer.district || !customer.address) {
    return "Veuillez compléter votre adresse de livraison.";
  }

  if (
    customer.address.length > 250 ||
    customer.district.length > 120 ||
    customer.city.length > 100
  ) {
    return "Un des champs de l'adresse est trop long.";
  }

  if (
    customer.deliveryInstructions.length > 500 ||
    customer.orderNotes.length > 500
  ) {
    return "Les instructions ne doivent pas dépasser 500 caractères.";
  }

  const allowedPaymentMethods = [
    "cash_on_delivery",
    "mtn_momo",
    "other_mobile_money",
  ];

  if (!allowedPaymentMethods.includes(customer.paymentMethod)) {
    return "Veuillez sélectionner un mode de paiement valide.";
  }

  if (!customer.acceptTerms) {
    return "Veuillez accepter les conditions générales.";
  }

  return null;
}

/* =========================
   ENVOYER LA COMMANDE AU SERVEUR
========================= */

async function checkoutSubmitOrder(event) {
  event.preventDefault();

  if (!checkoutDOM.form) {
    return;
  }

  if (!checkoutConfigLoaded) {
    checkoutShowMessage(
      "La configuration de livraison est encore en cours de chargement.",
    );
    return;
  }

  checkoutShowMessage("");

  const cart = checkoutGetCart();

  if (cart.length === 0) {
    checkoutShowMessage(
      "Votre panier est vide. Ajoutez des plats avant de poursuivre.",
    );

    checkoutUpdateSummary();
    return;
  }

  if (!checkoutDOM.form.reportValidity()) {
    return;
  }

  const customer = checkoutGetCustomerData();
  const validationError = checkoutValidate(customer);

  if (validationError) {
    checkoutShowMessage(validationError);
    return;
  }

  /*
   * IMPORTANT :
   * On n'envoie ni les prix calculés par le navigateur,
   * ni le total du panier comme source de vérité.
   *
   * Le serveur doit retrouver les prix depuis MySQL,
   * recalculer le montant et vérifier la disponibilité.
   */

  const payload = {
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email || null,

      city: customer.city,
      district: customer.district,
      address: customer.address,

      deliveryInstructions: customer.deliveryInstructions || null,
    },

    items: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),

    paymentMethod: customer.paymentMethod,
    notes: customer.orderNotes || null,
  };

  checkoutSetLoading(true);

  try {
    const response = await fetch(EMA_CHECKOUT.ordersEndpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(payload),
    });

    let result = {};

    try {
      result = await response.json();
    } catch {
      result = {};
    }

    if (!response.ok) {
      const serverMessage =
        result.message ||
        result.error ||
        "Le serveur n'a pas accepté la commande.";

      throw new Error(serverMessage);
    }

    const orderReference =
      result.reference ||
      result.orderReference ||
      result.order?.reference ||
      result.order?.orderNumber;

    if (!orderReference) {
      /*
       * La réponse ne contient pas de référence exploitable.
       * On ne vide pas le panier dans ce cas.
       */
      throw new Error(
        "Le serveur a répondu sans fournir de référence de commande.",
      );
    }

    try {
      sessionStorage.setItem(
        "ema_last_order",
        JSON.stringify({
          reference: String(orderReference),
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch (storageError) {
      console.error("Impossible d'enregistrer la référence localement :", storageError);
    }

    try {
      localStorage.removeItem(EMA_CHECKOUT.cartKey);
    } catch (storageError) {
      console.error("Impossible de vider le panier après la commande :", storageError);
    }
    window.location.href =
      "confirmation.html?reference=" +
      encodeURIComponent(orderReference);
  } catch (error) {
    console.error("Erreur de validation de commande :", error);

    checkoutShowMessage(
      error.message ||
        "Impossible d'envoyer la commande. Vérifiez votre connexion et réessayez.",
    );
  } finally {
    checkoutSetLoading(false);
  }
}

/* =========================
   ÉCOUTE DU FORMULAIRE
========================= */

if (checkoutDOM.form) {
  checkoutDOM.form.addEventListener("submit", checkoutSubmitOrder);
}

/* =========================
   SYNCHRONISATION DU PANIER
========================= */

window.addEventListener("storage", (event) => {
  if (event.key === EMA_CHECKOUT.cartKey) {
    checkoutUpdateSummary();
  }
});

/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  checkoutUpdateSummary();
  if (checkoutDOM.submit) checkoutDOM.submit.disabled = true;

  fetch("/api/v1/config", { headers: { Accept: "application/json" } })
    .then(async (response) => {
      const data = await response.json();
      if (
        !response.ok ||
        !data.success ||
        !Number.isSafeInteger(data.deliveryFee)
      ) {
        throw new Error(data.message || "Configuration de livraison indisponible.");
      }

      EMA_CHECKOUT.deliveryFee = data.deliveryFee;
      checkoutConfigLoaded = true;
      checkoutUpdateSummary();
      checkoutSetLoading(false);
    })
    .catch((error) => {
      console.error(
        "Impossible de charger la configuration de commande :",
        error,
      );
      checkoutShowMessage(
        "La commande est temporairement indisponible. Réessayez plus tard.",
      );
    });
});
