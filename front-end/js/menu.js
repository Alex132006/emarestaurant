/* =========================================================
   E.M.A RESTAURANT — MENU CONNECTÉ À MYSQL
   Fichier : js/menu.js
========================================================= */

"use strict";

const EMA_PRODUCTS_API = "/api/v1/products";

let emaProducts = [];
let emaActiveCategory = "all";
let emaSearchTerm = "";
let emaMaximumPrice = Infinity;
let emaSortOrder = "default";
let emaPriceFilterChanged = false;

/* ---------------------------------------------------------
   1. TROUVER LE CONTENEUR DU MENU
--------------------------------------------------------- */

function getMenuContainer() {
  return (
    document.getElementById("menu-grid") ||
    document.getElementById("menu-container") ||
    document.getElementById("products-container") ||
    document.getElementById("menuProducts") ||
    document.querySelector(".menu-grid")
  );
}

/* ---------------------------------------------------------
   2. FORMATER LES PRIX EN FCFA
--------------------------------------------------------- */

function formatPrice(price) {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(Number(price) || 0) + " FCFA"
  );
}

/* ---------------------------------------------------------
   3. CHARGER LES PRODUITS DEPUIS LE SERVEUR
--------------------------------------------------------- */

async function loadMenuProducts() {
  const container = getMenuContainer();

  if (!container) {
    console.error("Conteneur du menu introuvable. Vérifie menu.html.");
    return;
  }

  container.textContent = "Chargement du menu E.M.A…";

  try {
    const response = await fetch(EMA_PRODUCTS_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur du serveur : ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.products)) {
      throw new Error("Réponse du serveur invalide.");
    }

    emaProducts = data.products;
    configureMaximumPriceFilter();
    renderMenuProducts();
  } catch (error) {
    console.error("Erreur de chargement du menu :", error);

    container.replaceChildren();

    const message = document.createElement("p");
    message.className = "menu-error";
    message.textContent =
      "Le menu ne peut pas être chargé pour le moment. " +
      "Vérifie ta connexion ou réessaie dans quelques instants.";

    container.appendChild(message);
  }
}

function configureMaximumPriceFilter() {
  const priceRange = document.getElementById("maxPrice");
  if (!priceRange) return;

  const maximum = Math.max(
    10000,
    ...emaProducts.map((product) => Number(product.price) || 0),
  );
  priceRange.max = String(maximum);

  if (!emaPriceFilterChanged) {
    emaMaximumPrice = maximum;
    priceRange.value = String(maximum);
  }

  const priceLabel = document.getElementById("maxPriceLabel");
  if (priceLabel) priceLabel.textContent = formatPrice(Number(priceRange.value));
}

/* ---------------------------------------------------------
   4. CRÉER UNE CARTE DE PRODUIT
--------------------------------------------------------- */

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "menu-item";
  card.dataset.productId = String(product.id);

  const image = document.createElement("img");
  image.className = "menu-item-image";
  image.alt = product.name || "Plat E.M.A";
  image.loading = "lazy";

  if (product.image) {
    image.src = product.image;
  } else {
    image.src = "https://placehold.co/600x400?text=E.M.A+Restaurant";
  }

  image.addEventListener(
    "error",
    () => {
      image.src = "https://placehold.co/600x400?text=E.M.A+Restaurant";
    },
    { once: true },
  );

  const content = document.createElement("div");
  content.className = "menu-item-content";

  const category = document.createElement("p");
  category.className = "menu-item-category";
  category.textContent = product.category || "Spécialité E.M.A";

  const title = document.createElement("h3");
  title.className = "menu-item-title";
  title.textContent = product.name || "Plat E.M.A";

  const description = document.createElement("p");
  description.className = "menu-item-description";
  description.textContent =
    product.description || "Une spécialité préparée avec soin.";

  const footer = document.createElement("div");
  footer.className = "menu-item-footer";

  const price = document.createElement("strong");
  price.className = "menu-item-price";
  price.textContent = formatPrice(product.price);

  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "menu-favorite";
  favoriteButton.textContent = "♡";
  const isFavorite =
    typeof window.isFavoriteProduct === "function" &&
    window.isFavoriteProduct(product.id);
  favoriteButton.classList.toggle("is-favorite", isFavorite);
  favoriteButton.setAttribute("aria-label", isFavorite ? "Retirer des favoris" : "Ajouter aux favoris");
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.textContent = isFavorite ? "♥" : "♡";
  favoriteButton.addEventListener("click", () => {
    if (typeof window.toggleFavoriteProduct !== "function") {
      showMenuError("Les favoris ne sont pas initialisés. Recharge la page.");
      return;
    }

    const selected = window.toggleFavoriteProduct(product.id);
    if (selected === null) return;
    favoriteButton.classList.toggle("is-favorite", selected);
    favoriteButton.setAttribute("aria-pressed", String(selected));
    favoriteButton.setAttribute(
      "aria-label",
      selected ? "Retirer des favoris" : "Ajouter aux favoris",
    );
    favoriteButton.textContent = selected ? "♥" : "♡";
  });

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "add-to-cart-btn";
  addButton.textContent = "Ajouter au panier";
  addButton.setAttribute("aria-label", `Ajouter ${product.name} au panier`);

  addButton.addEventListener("click", () => {
    if (typeof window.addProductToCart !== "function") {
      showMenuError("Le panier n'est pas initialisé. Recharge la page.");
      return;
    }

    const added = window.addProductToCart(product);

    if (added) {
      addButton.textContent = "Ajouté ✓";

      window.setTimeout(() => {
        addButton.textContent = "Ajouter au panier";
      }, 1200);
    }
  });

  footer.append(price, favoriteButton, addButton);
  content.append(category, title, description, footer);
  card.append(image, content);

  return card;
}

/* ---------------------------------------------------------
   5. AFFICHER LES PRODUITS
--------------------------------------------------------- */

function renderMenuProducts() {
  const container = getMenuContainer();

  if (!container) {
    return;
  }

  const filteredProducts = emaProducts.filter((product) => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.categorySlug,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(emaSearchTerm.toLowerCase());

    const categorySlug = String(product.categorySlug || "").toLowerCase();

    const categoryName = String(product.category || "").toLowerCase();

    const categoryAliases = {
      africain: ["plats-africains", "africain", "cuisine africaine"],
      patisserie: ["patisserie", "pâtisserie", "desserts"],
    };
    const matchesCategory =
      emaActiveCategory === "all" ||
      categorySlug === emaActiveCategory ||
      categoryName === emaActiveCategory ||
      (categoryAliases[emaActiveCategory] || []).some(
        (alias) => categorySlug === alias || categoryName === alias,
      );

    return (
      matchesSearch &&
      matchesCategory &&
      Number(product.price) <= emaMaximumPrice
    );
  });

  if (emaSortOrder === "price-asc") {
    filteredProducts.sort((first, second) => first.price - second.price);
  } else if (emaSortOrder === "price-desc") {
    filteredProducts.sort((first, second) => second.price - first.price);
  } else if (emaSortOrder === "name") {
    filteredProducts.sort((first, second) =>
      first.name.localeCompare(second.name, "fr"),
    );
  }

  container.replaceChildren();

  const productCount = document.getElementById("productCount");
  if (productCount) {
    productCount.textContent = `${filteredProducts.length} plat(s) disponible(s)`;
  }

  if (filteredProducts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "menu-empty";
    emptyMessage.textContent = "Aucun plat ne correspond à ta recherche.";

    container.appendChild(emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredProducts.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  container.appendChild(fragment);
}

/* ---------------------------------------------------------
   6. RECHERCHE DE PLATS
--------------------------------------------------------- */

function initializeMenuSearch() {
  const searchInput =
    document.getElementById("menuSearch") ||
    document.getElementById("menu-search") ||
    document.getElementById("search-menu") ||
    document.querySelector("[data-menu-search]");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", (event) => {
    emaSearchTerm = event.target.value.trim();
    const clearButton = document.getElementById("clearSearch");
    if (clearButton) clearButton.hidden = !emaSearchTerm;
    renderMenuProducts();
  });
}

/* ---------------------------------------------------------
   7. FILTRER PAR CATÉGORIE
--------------------------------------------------------- */

function initializeCategoryFilters() {
  const filterButtons = document.querySelectorAll(
    "[data-category-filter], [data-category]",
  );
  const categoryParameter = new URLSearchParams(window.location.search)
    .get("categorie")
    ?.toLowerCase();

  if (categoryParameter) {
    emaActiveCategory = categoryParameter;
    filterButtons.forEach((button) => {
      const selected =
        (button.dataset.categoryFilter || button.dataset.category) ===
        categoryParameter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      emaActiveCategory =
        button.dataset.categoryFilter || button.dataset.category || "all";

      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      renderMenuProducts();
    });
  });
}

function initializeMenuControls() {
  const sortSelect = document.getElementById("sortProducts");
  const priceRange = document.getElementById("maxPrice");
  const priceLabel = document.getElementById("maxPriceLabel");
  const clearSearch = document.getElementById("clearSearch");
  const searchInput = document.getElementById("menuSearch");
  configureMaximumPriceFilter();

  sortSelect?.addEventListener("change", () => {
    emaSortOrder = sortSelect.value;
    renderMenuProducts();
  });

  priceRange?.addEventListener("input", () => {
    emaPriceFilterChanged = true;
    emaMaximumPrice = Number(priceRange.value);
    if (priceLabel) {
      priceLabel.textContent = formatPrice(emaMaximumPrice);
    }
    renderMenuProducts();
  });

  clearSearch?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      emaSearchTerm = "";
      clearSearch.hidden = true;
      renderMenuProducts();
      searchInput.focus();
    }
  });

  document.getElementById("resetFilters")?.addEventListener("click", () => {
    emaActiveCategory = "all";
    emaSearchTerm = "";
    emaPriceFilterChanged = false;
    emaMaximumPrice = Number(priceRange?.max || Infinity);
    emaSortOrder = "default";

    if (searchInput) searchInput.value = "";
    if (clearSearch) clearSearch.hidden = true;
    if (priceRange) priceRange.value = String(emaMaximumPrice);
    if (sortSelect) sortSelect.value = "default";
    if (priceLabel) priceLabel.textContent = formatPrice(emaMaximumPrice);

    document.querySelectorAll("[data-category-filter], [data-category]").forEach((button) => {
      const active =
        (button.dataset.categoryFilter || button.dataset.category) === "all";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderMenuProducts();
  });
}

/* ---------------------------------------------------------
   8. AFFICHER LES ERREURS
--------------------------------------------------------- */

function showMenuError(message) {
  if (typeof window.showNotification === "function") {
    window.showNotification(message, "error");
  } else {
    console.error(message);
  }
}

/* ---------------------------------------------------------
   9. INITIALISER LE MENU
--------------------------------------------------------- */

function initializeMenu() {
  initializeMenuSearch();
  initializeCategoryFilters();
  initializeMenuControls();
  loadMenuProducts();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMenu);
} else {
  initializeMenu();
}
