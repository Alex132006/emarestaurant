/* =========================================================
   E.M.A RESTAURANT — FICHIER PRINCIPAL
   Fichier : js/main.js
   Fonctions :
   - Gestion du panier
   - Compteur d'articles
   - Notifications
   - Navigation mobile
   - Année automatique dans le pied de page
========================================================= */

"use strict";

const EMA_CART_KEY = "ema_cart";
const EMA_FAVORITES_KEY = "ema_favorites";

/* ---------------------------------------------------------
   1. LIRE LE PANIER
--------------------------------------------------------- */

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(EMA_CART_KEY));
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Impossible de lire le panier :", error);
    return [];
  }
}

/* ---------------------------------------------------------
   2. ENREGISTRER LE PANIER
--------------------------------------------------------- */

function saveCart(cart) {
  try {
    localStorage.setItem(EMA_CART_KEY, JSON.stringify(cart));

    updateCartCount();

    window.dispatchEvent(
      new CustomEvent("ema:cart-updated", {
        detail: { cart },
      }),
    );

    return true;
  } catch (error) {
    console.error("Impossible d'enregistrer le panier :", error);

    showNotification(
      "Impossible d'enregistrer le panier. Vérifie l'espace disponible.",
      "error",
    );

    return false;
  }
}

/* ---------------------------------------------------------
   3. CALCULER LE NOMBRE D'ARTICLES
--------------------------------------------------------- */

function updateCartCount() {
  const cart = getCart();

  const totalQuantity = cart.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    return total + quantity;
  }, 0);

  const counters = document.querySelectorAll(
    ".cart-count, [data-cart-count], #cart-count",
  );

  counters.forEach((counter) => {
    counter.textContent = totalQuantity;
    counter.setAttribute("aria-label", `${totalQuantity} article(s)`);
    counter.hidden = totalQuantity === 0;
  });

  return totalQuantity;
}

/* ---------------------------------------------------------
   4. AJOUTER UN PRODUIT AU PANIER
--------------------------------------------------------- */

function addProductToCart(product) {
  if (!product || product.id === undefined || product.id === null) {
    showNotification("Produit invalide.", "error");
    return false;
  }

  const id = String(product.id);
  const price = Number(product.price);

  if (!Number.isFinite(price) || price < 0) {
    showNotification("Le prix de ce produit est invalide.", "error");
    return false;
  }

  const cart = getCart();
  const existingProduct = cart.find((item) => String(item.id) === id);

  if (existingProduct) {
    if (Number(existingProduct.quantity) >= 99) {
      showNotification("La quantité maximale est de 99 articles.", "warning");
      return false;
    }

    existingProduct.quantity = (Number(existingProduct.quantity) || 0) + 1;
  } else {
    cart.push({
      id: product.id,
      name: String(product.name || "Produit E.M.A"),
      price,
      image: product.image || "",
      category: product.category || "",
      quantity: 1,
    });
  }

  const saved = saveCart(cart);

  if (saved) {
    showNotification(
      `${product.name || "Produit"} ajouté au panier.`,
      "success",
    );
  }

  return saved;
}

/* ---------------------------------------------------------
   5. MODIFIER LA QUANTITÉ D'UN PRODUIT
--------------------------------------------------------- */

function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const id = String(productId);
  const newQuantity = Number(quantity);

  const productIndex = cart.findIndex((item) => String(item.id) === id);

  if (productIndex === -1) {
    return false;
  }

  if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
    cart.splice(productIndex, 1);
  } else {
    cart[productIndex].quantity = newQuantity;
  }

  return saveCart(cart);
}

/* ---------------------------------------------------------
   6. SUPPRIMER UN PRODUIT DU PANIER
--------------------------------------------------------- */

function removeProductFromCart(productId) {
  const cart = getCart().filter(
    (item) => String(item.id) !== String(productId),
  );

  return saveCart(cart);
}

/* ---------------------------------------------------------
   7. VIDER LE PANIER
--------------------------------------------------------- */

function clearCart() {
  return saveCart([]);
}

/* ---------------------------------------------------------
   8. NOTIFICATIONS
--------------------------------------------------------- */

function showNotification(message, type = "success") {
  let container = document.getElementById("ema-toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "ema-toast-container";

    Object.assign(container.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: "99999",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "min(360px, calc(100vw - 40px))",
    });

    document.body.appendChild(container);
  }

  const toast = document.createElement("div");

  const background =
    type === "error" ? "#9b2226" : type === "warning" ? "#9a6700" : "#176b45";

  Object.assign(toast.style, {
    background,
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: "10px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
    fontSize: "14px",
    lineHeight: "1.5",
    opacity: "0",
    transform: "translateY(-8px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  });

  toast.setAttribute("role", "status");
  toast.textContent = String(message);

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-8px)";

    window.setTimeout(() => toast.remove(), 250);
  }, 3500);
}

/* ---------------------------------------------------------
   9. MENU DE NAVIGATION MOBILE
--------------------------------------------------------- */

function initializeMobileNavigation() {
  const toggle =
    document.getElementById("menu-toggle") ||
    document.getElementById("mobileMenuButton");
  const navigation =
    document.getElementById("navigation") ||
    document.getElementById("mainNavigation");

  if (!toggle || !navigation) {
    return;
  }

  const openClass =
    navigation.id === "mainNavigation" ? "is-open" : "active";
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle(openClass);

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove(openClass);
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) {
      navigation.classList.remove(openClass);
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
    }
  });
}

/* ---------------------------------------------------------
   10. ANNÉE AUTOMATIQUE
--------------------------------------------------------- */

function initializeCurrentYear() {
  const yearElements = document.querySelectorAll("#current-year, #currentYear");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

/* ---------------------------------------------------------
   11. INITIALISATION
--------------------------------------------------------- */

function initializeEmaSite() {
  updateCartCount();
  initializeMobileNavigation();
  initializeCurrentYear();
  initializeFavorites();
  loadFeaturedProducts();
}

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(EMA_FAVORITES_KEY) || "[]");
    return Array.isArray(saved) ? saved.map(String) : [];
  } catch (error) {
    console.error("Impossible de lire les favoris :", error);
    return [];
  }
}

function initializeFavorites() {
  document.querySelectorAll(".favorite-button[data-product-id]").forEach((button) => {
    const productId = String(button.dataset.productId);
    const active = readFavorites().includes(productId);
    button.classList.toggle("is-favorite", active);
    button.setAttribute("aria-pressed", String(active));
    if (button.dataset.favoriteInitialized) return;
    button.dataset.favoriteInitialized = "true";

    button.addEventListener("click", () => {
      const selected = toggleFavoriteProduct(productId);
      if (selected === null) return;
      button.classList.toggle("is-favorite", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute(
        "aria-label",
        selected ? "Retirer des favoris" : "Ajouter aux favoris",
      );
    });
  });
}

function toggleFavoriteProduct(productId) {
  const favorites = readFavorites();
  const id = String(productId);
  const index = favorites.indexOf(id);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }

  try {
    localStorage.setItem(EMA_FAVORITES_KEY, JSON.stringify(favorites));
    return index < 0;
  } catch (error) {
    console.error("Impossible d'enregistrer les favoris :", error);
    showNotification("Impossible d'enregistrer ce favori.", "error");
    return null;
  }
}

function createFeaturedProduct(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("div");
  image.className = "product-image";
  if (product.image) {
    try {
      const imageUrl = new URL(product.image, window.location.href);
      if (imageUrl.protocol === "http:" || imageUrl.protocol === "https:") {
        const photo = document.createElement("img");
        photo.src = imageUrl.href;
        photo.alt = product.name;
        photo.loading = "lazy";
        Object.assign(photo.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
        image.appendChild(photo);
      }
    } catch (error) {
      console.error(`Image invalide pour le produit ${product.id} :`, error);
    }
  }

  const favorite = document.createElement("button");
  favorite.className = "favorite-button";
  favorite.type = "button";
  favorite.dataset.productId = String(product.id);
  favorite.setAttribute("aria-label", "Ajouter aux favoris");
  favorite.innerHTML = '<i class="fa-regular fa-heart"></i>';
  image.appendChild(favorite);

  const content = document.createElement("div");
  content.className = "product-content";
  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category || "E.M.A Restaurant";

  const title = document.createElement("h3");
  title.textContent = product.name;
  const description = document.createElement("p");
  description.textContent = product.description || "Préparé avec soin chez E.M.A.";

  const footer = document.createElement("div");
  footer.className = "product-footer";
  const price = document.createElement("strong");
  price.className = "product-price";
  price.textContent = new Intl.NumberFormat("fr-FR").format(product.price) + " FCFA";

  const add = document.createElement("button");
  add.className = "add-to-cart-button";
  add.type = "button";
  add.innerHTML = '<i class="fa-solid fa-plus"></i><span>Ajouter</span>';
  add.addEventListener("click", () => addProductToCart(product));

  footer.append(price, add);
  content.append(category, title, description, footer);
  card.append(image, content);
  return card;
}

async function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  try {
    const response = await fetch("/api/v1/products", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    const data = await response.json();
    if (!data.success || !Array.isArray(data.products)) {
      throw new Error("Réponse produits invalide.");
    }

    container.replaceChildren();
    data.products.slice(0, 4).forEach((product) => {
      container.appendChild(createFeaturedProduct(product));
    });
    initializeFavorites();

    if (data.products.length === 0) {
      container.textContent = "Le menu sera bientôt disponible.";
    }
  } catch (error) {
    console.error("Impossible de charger les spécialités :", error);
    container.textContent = "Le menu est momentanément indisponible.";
  }
}

/* ---------------------------------------------------------
   12. RENDRE LES FONCTIONS ACCESSIBLES AUX AUTRES FICHIERS
--------------------------------------------------------- */

window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
window.addProductToCart = addProductToCart;
window.toggleFavoriteProduct = toggleFavoriteProduct;
window.isFavoriteProduct = (productId) =>
  readFavorites().includes(String(productId));
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeProductFromCart = removeProductFromCart;
window.clearCart = clearCart;
window.showNotification = showNotification;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEmaSite);
} else {
  initializeEmaSite();
}
