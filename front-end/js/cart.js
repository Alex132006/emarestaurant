const CART_SETTINGS = {
  storageKey: "ema_cart",
  deliveryFee: 1000,
  checkoutPage: "commande.html",
};

/* =========================
   RÉCUPÉRER LES ÉLÉMENTS HTML
========================= */

const cartElements = {
  items: document.getElementById("cart-items"),
  empty: document.getElementById("empty-cart"),
  subtotal: document.getElementById("cart-subtotal"),
  delivery: document.getElementById("delivery-fee"),
  total: document.getElementById("cart-total"),
  quantity: document.getElementById("summary-quantity"),
  clearButton: document.getElementById("clear-cart"),
  checkoutButton: document.getElementById("checkout-button"),
};

/* =========================
   OUTILS
========================= */

function cartFormatPrice(amount) {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(Math.round(Number(amount) || 0)) + " FCFA"
  );
}

function cartEscapeHTML(value) {
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

function cartNotify(message, type = "success") {
  if (typeof window.showNotification === "function") {
    window.showNotification(message, type);
  } else {
    alert(message);
  }
}

/* =========================
   LECTURE DU PANIER
========================= */

function cartRead() {
  try {
    const storedCart = localStorage.getItem(CART_SETTINGS.storageKey);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .filter((item) => {
        return (
          item &&
          item.id !== undefined &&
          item.id !== null &&
          Number.isFinite(Number(item.price)) &&
          Number(item.price) >= 0
        );
      })
      .map((item) => ({
        ...item,
        quantity: Math.min(
          99,
          Math.max(1, Math.floor(Number(item.quantity) || 1)),
        ),
        price: Number(item.price),
      }));
  } catch (error) {
    console.error("Impossible de lire le panier :", error);
    return [];
  }
}

/* =========================
   ENREGISTREMENT DU PANIER
========================= */

function cartWrite(cart) {
  try {
    localStorage.setItem(CART_SETTINGS.storageKey, JSON.stringify(cart));

    if (typeof window.updateCartCount === "function") {
      window.updateCartCount();
    }

    return true;
  } catch (error) {
    console.error("Impossible d'enregistrer le panier :", error);

    cartNotify(
      "Le panier n'a pas pu être enregistré. Vérifiez le stockage de votre navigateur.",
      "error",
    );

    return false;
  }
}

/* =========================
   CALCUL DES MONTANTS
========================= */

function cartCalculateSubtotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function cartCalculateQuantity(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

function cartCalculateDelivery(cart) {
  if (cart.length === 0) {
    return 0;
  }

  /*
   * Frais provisoires.
   * Ils seront adaptés selon l'adresse et les règles
   * de livraison lorsque le serveur sera connecté.
   */

  return CART_SETTINGS.deliveryFee;
}

/* =========================
   CONSTRUIRE UNE IMAGE SÛRE
========================= */

function cartGetSafeImageURL(imageURL) {
  if (!imageURL || typeof imageURL !== "string") {
    return "";
  }

  const value = imageURL.trim();

  if (/^(javascript|data|vbscript):/i.test(value)) {
    return "";
  }

  try {
    const parsedURL = new URL(value, window.location.href);

    if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
      return "";
    }

    return value;
  } catch {
    return "";
  }
}

/* =========================
   AFFICHER UN ARTICLE
========================= */

function cartCreateItemHTML(item) {
  const id = cartEscapeHTML(item.id);
  const name = cartEscapeHTML(item.name || "Plat E.M.A");
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;
  const lineTotal = price * quantity;

  const safeImage = cartGetSafeImageURL(item.image);

  const imageHTML = safeImage
    ? `
            <img
                src="${cartEscapeHTML(safeImage)}"
                alt="${name}"
                loading="lazy"
            >
        `
    : `
            <div class="cart-item-placeholder" aria-hidden="true">
                🍽️
            </div>
        `;

  return `
        <article class="cart-item" data-product-id="${id}">

            <div class="cart-item-image">
                ${imageHTML}
            </div>

            <div class="cart-item-info">

                <span class="cart-item-category">
                    E.M.A Restaurant
                </span>

                <h3 class="cart-item-name">
                    ${name}
                </h3>

                <p class="cart-item-unit-price">
                    Prix unitaire :
                    <strong>${cartFormatPrice(price)}</strong>
                </p>

            </div>

            <div class="cart-item-controls">

                <strong class="cart-item-total">
                    ${cartFormatPrice(lineTotal)}
                </strong>

                <div class="cart-item-actions">

                    <div
                        class="quantity-control"
                        aria-label="Quantité de ${name}"
                    >

                        <button
                            type="button"
                            class="quantity-btn"
                            data-action="decrease"
                            data-id="${id}"
                            aria-label="Diminuer la quantité de ${name}"
                            ${quantity <= 1 ? "disabled" : ""}
                        >
                            −
                        </button>

                        <span class="quantity-value">
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            class="quantity-btn"
                            data-action="increase"
                            data-id="${id}"
                            aria-label="Augmenter la quantité de ${name}"
                            ${quantity >= 99 ? "disabled" : ""}
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-item-btn"
                        data-action="remove"
                        data-id="${id}"
                    >
                        Supprimer
                    </button>

                </div>

            </div>

        </article>
    `;
}

/* =========================
   AFFICHER LE PANIER
========================= */

function renderCart() {
  if (!cartElements.items) {
    return;
  }

  const cart = cartRead();

  const isEmpty = cart.length === 0;

  cartElements.items.hidden = isEmpty;
  cartElements.empty.hidden = !isEmpty;

  if (isEmpty) {
    cartElements.items.innerHTML = "";
  } else {
    cartElements.items.innerHTML = cart
      .map((item) => cartCreateItemHTML(item))
      .join("");
  }

  updateCartSummary(cart);

  if (cartElements.clearButton) {
    cartElements.clearButton.disabled = isEmpty;
  }

  if (cartElements.checkoutButton) {
    cartElements.checkoutButton.disabled = isEmpty;
  }

  if (typeof window.updateCartCount === "function") {
    window.updateCartCount();
  }
}

/* =========================
   METTRE À JOUR LE RÉSUMÉ
========================= */

function updateCartSummary(cart = cartRead()) {
  const subtotal = cartCalculateSubtotal(cart);
  const delivery = cartCalculateDelivery(cart);
  const total = subtotal + delivery;
  const quantity = cartCalculateQuantity(cart);

  if (cartElements.subtotal) {
    cartElements.subtotal.textContent = cartFormatPrice(subtotal);
  }

  if (cartElements.delivery) {
    cartElements.delivery.textContent = cartFormatPrice(delivery);
  }

  if (cartElements.total) {
    cartElements.total.textContent = cartFormatPrice(total);
  }

  if (cartElements.quantity) {
    cartElements.quantity.textContent = String(quantity);
  }
}

/* =========================
   MODIFIER UNE QUANTITÉ
========================= */

function cartChangeQuantity(productId, change) {
  const cart = cartRead();

  const item = cart.find((product) => {
    return String(product.id) === String(productId);
  });

  if (!item) {
    cartNotify("Cet article n'existe plus dans le panier.", "error");
    renderCart();
    return;
  }

  const newQuantity = item.quantity + change;

  if (newQuantity < 1) {
    cartRemoveItem(productId);
    return;
  }

  if (newQuantity > 99) {
    cartNotify("La quantité maximale est de 99 articles.", "warning");
    return;
  }

  item.quantity = newQuantity;

  if (cartWrite(cart)) {
    renderCart();
  }
}

/* =========================
   SUPPRIMER UN ARTICLE
========================= */

function cartRemoveItem(productId) {
  const cart = cartRead();

  const updatedCart = cart.filter((item) => {
    return String(item.id) !== String(productId);
  });

  if (updatedCart.length === cart.length) {
    return;
  }

  if (cartWrite(updatedCart)) {
    renderCart();
    cartNotify("Article supprimé du panier.");
  }
}

/* =========================
   VIDER LE PANIER
========================= */

function cartClearAll() {
  const cart = cartRead();

  if (cart.length === 0) {
    return;
  }

  const confirmed = window.confirm(
    "Voulez-vous vraiment supprimer tous les articles de votre panier ?",
  );

  if (!confirmed) {
    return;
  }

  if (cartWrite([])) {
    renderCart();
    cartNotify("Votre panier a été vidé.");
  }
}

/* =========================
   CLICS SUR LES ARTICLES
========================= */

if (cartElements.items) {
  cartElements.items.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const productId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "increase") {
      cartChangeQuantity(productId, 1);
    }

    if (action === "decrease") {
      cartChangeQuantity(productId, -1);
    }

    if (action === "remove") {
      cartRemoveItem(productId);
    }
  });
}

/* =========================
   BOUTON VIDER LE PANIER
========================= */

if (cartElements.clearButton) {
  cartElements.clearButton.addEventListener("click", cartClearAll);
}

/* =========================
   VALIDATION DE LA COMMANDE
========================= */

if (cartElements.checkoutButton) {
  cartElements.checkoutButton.addEventListener("click", () => {
    const cart = cartRead();

    if (cart.length === 0) {
      cartNotify("Ajoutez au moins un plat avant de poursuivre.", "warning");

      renderCart();
      return;
    }

    /*
     * La commande est finalisée sur la page de validation.
     */

    window.location.href = CART_SETTINGS.checkoutPage;
  });
}

/* =========================
   SYNCHRONISATION
========================= */

window.addEventListener("storage", (event) => {
  if (event.key === CART_SETTINGS.storageKey) {
    renderCart();
  }
});

/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  fetch("/api/v1/config", { headers: { Accept: "application/json" } })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok || !data.success || !Number.isSafeInteger(data.deliveryFee)) {
        throw new Error(data.message || "Configuration de livraison indisponible.");
      }

      CART_SETTINGS.deliveryFee = data.deliveryFee;
      renderCart();
    })
    .catch((error) => {
      console.error("Impossible de charger les frais de livraison :", error);
      cartNotify(
        "Les frais affichés sont provisoires. Ils seront recalculés à la validation.",
        "warning",
      );
    });
});

/* =========================
   FONCTIONS ACCESSIBLES
========================= */

window.renderCart = renderCart;
window.cartCalculateSubtotal = cartCalculateSubtotal;
window.cartCalculateQuantity = cartCalculateQuantity;
