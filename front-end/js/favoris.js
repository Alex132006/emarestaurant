"use strict";

const favoritesContainer = document.getElementById("favorites-list");
const favoritesMessage = document.getElementById("favorites-message");

function readFavoriteIds() {
  try {
    const values = JSON.parse(localStorage.getItem("ema_favorites") || "[]");
    return Array.isArray(values) ? values.map(String) : [];
  } catch (error) {
    console.error("Impossible de lire les favoris :", error);
    return [];
  }
}

async function loadFavorites() {
  try {
    const response = await fetch("/api/v1/products", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    const data = await response.json();
    if (!data.success || !Array.isArray(data.products)) {
      throw new Error("Réponse produits invalide.");
    }

    const favoriteIds = readFavoriteIds();
    const products = data.products.filter((product) =>
      favoriteIds.includes(String(product.id)),
    );
    favoritesContainer.replaceChildren();

    if (products.length === 0) {
      favoritesMessage.textContent = "Vous n'avez pas encore de plat favori.";
      return;
    }

    favoritesMessage.textContent = "";
    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      const content = document.createElement("div");
      content.className = "product-content";
      const heading = document.createElement("h2");
      heading.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.description || product.category || "";
      const price = document.createElement("strong");
      price.textContent =
        new Intl.NumberFormat("fr-FR").format(product.price) + " FCFA";
      const actions = document.createElement("div");
      actions.className = "product-footer";
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "button button-primary";
      addButton.textContent = "Ajouter au panier";
      addButton.addEventListener("click", () => {
        if (typeof window.addProductToCart === "function") {
          window.addProductToCart(product);
        }
      });
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "button";
      removeButton.textContent = "Retirer des favoris";
      removeButton.addEventListener("click", () => {
        const remaining = readFavoriteIds().filter(
          (id) => id !== String(product.id),
        );
        localStorage.setItem("ema_favorites", JSON.stringify(remaining));
        loadFavorites();
      });
      actions.append(addButton, removeButton);
      content.append(heading, description, price, actions);
      card.append(content);
      favoritesContainer.append(card);
    });
  } catch (error) {
    console.error("Impossible de charger les favoris :", error);
    favoritesMessage.textContent =
      "Les favoris ne peuvent pas être chargés pour le moment.";
  }
}

loadFavorites();
