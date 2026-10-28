/* =========================================
   E.M.A RESTAURANT — JAVASCRIPT GÉNÉRAL
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------
    // 1. MENU MOBILE
    // -------------------------------------

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mainNavigation = document.getElementById("mainNavigation");

    if (mobileMenuButton && mainNavigation) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen = mainNavigation.classList.toggle("is-open");

            mobileMenuButton.setAttribute("aria-expanded", String(isOpen));

            mobileMenuButton.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });


        // Fermer le menu après avoir choisi une page

        mainNavigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove("is-open");

                mobileMenuButton.setAttribute("aria-expanded", "false");

                mobileMenuButton.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }



    // -------------------------------------
    // 2. ANNÉE AUTOMATIQUE
    // -------------------------------------

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }



    // -------------------------------------
    // 3. COMPTEUR DU PANIER
    // -------------------------------------

    updateCartCount();



    // -------------------------------------
    // 4. FAVORIS DE DÉMONSTRATION
    // -------------------------------------

    initializeFavorites();



    // -------------------------------------
    // 5. BOUTONS D'AJOUT AU PANIER
    // -------------------------------------

    document.querySelectorAll(".add-to-cart-button").forEach(button => {

        button.addEventListener("click", () => {

            const productId = Number(button.dataset.productId);

            const productName = button.dataset.productName;

            if (!productId || !productName) {
                return;
            }

            /*
             * Cette version utilise des produits de démonstration.
             * Les vrais prix seront récupérés depuis l'API et MySQL.
             * Ne pas utiliser ces données de démonstration pour encaisser
             * de véritables commandes.
             */

            const demoProducts = {
                1: {
                    id: 1,
                    name: "Poulet moambe",
                    price: 0
                },
                2: {
                    id: 2,
                    name: "Poulet braisé",
                    price: 0
                },
                3: {
                    id: 3,
                    name: "Pondu traditionnel",
                    price: 0
                },
                4: {
                    id: 4,
                    name: "Panini au poulet",
                    price: 0
                }
            };

            const product = demoProducts[productId];

            if (!product) {
                return;
            }

            if (product.price <= 0) {

                alert(
                    "Ce plat est actuellement présenté en démonstration. " +
                    "Son prix doit être configuré avant de pouvoir le commander."
                );

                return;
            }

            addProductToCart(product);

        });

    });

});



// =========================================
// GESTION DU PANIER
// =========================================

function getCart() {

    try {

        const cart = JSON.parse(
            localStorage.getItem("ema_cart") || "[]"
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error("Impossible de lire le panier :", error);

        return [];

    }

}



function saveCart(cart) {

    localStorage.setItem("ema_cart", JSON.stringify(cart));

    updateCartCount();

}



function addProductToCart(product) {

    const cart = getCart();

    const existingProduct = cart.find(
        item => Number(item.id) === Number(product.id)
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });

    }


    saveCart(cart);

    alert(product.name + " a été ajouté au panier.");

}



function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {

        return total + Number(item.quantity || 0);

    }, 0);


    cartCount.textContent = totalQuantity;

}



// =========================================
// GESTION DES FAVORIS
// =========================================

function getFavorites() {

    try {

        const favorites = JSON.parse(
            localStorage.getItem("ema_favorites") || "[]"
        );

        return Array.isArray(favorites) ? favorites : [];

    } catch (error) {

        console.error("Impossible de lire les favoris :", error);

        return [];

    }

}



function saveFavorites(favorites) {

    localStorage.setItem(
        "ema_favorites",
        JSON.stringify(favorites)
    );

}



function initializeFavorites() {

    const favoriteButtons = document.querySelectorAll(".favorite-button");

    const favorites = getFavorites();


    favoriteButtons.forEach(button => {

        const productId = Number(button.dataset.productId);

        const icon = button.querySelector("i");

        const isFavorite = favorites.includes(productId);


        if (isFavorite) {

            button.classList.add("is-favorite");

            if (icon) {
                icon.className = "fa-solid fa-heart";
            }

        }


        button.addEventListener("click", () => {

            let currentFavorites = getFavorites();

            const alreadyFavorite = currentFavorites.includes(productId);


            if (alreadyFavorite) {

                currentFavorites = currentFavorites.filter(
                    id => id !== productId
                );

                button.classList.remove("is-favorite");

                if (icon) {
                    icon.className = "fa-regular fa-heart";
                }

            } else {

                currentFavorites.push(productId);

                button.classList.add("is-favorite");

                if (icon) {
                    icon.className = "fa-solid fa-heart";
                }

            }


            saveFavorites(currentFavorites);

        });

    });

}
