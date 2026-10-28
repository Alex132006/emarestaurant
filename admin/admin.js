"use strict";

const api = "/api/v1/admin";
const page = document.body.dataset.adminPage;
const messageElement = document.getElementById("admin-message");
const statuses = [
  ["pending", "En attente"],
  ["confirmed", "Confirmée"],
  ["preparing", "En préparation"],
  ["ready", "Prête"],
  ["out_for_delivery", "En livraison"],
  ["delivered", "Livrée"],
  ["cancelled", "Annulée"],
];

function showMessage(message, type = "") {
  if (!messageElement) return;
  messageElement.textContent = message;
  messageElement.className = `admin-message ${type}`;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

async function request(path, options = {}) {
  const response = await fetch(`${api}${path}`, {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `Erreur ${response.status}`);
  return data;
}

function formatPrice(value) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(value) || 0)} FCFA`;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString("fr-FR") : "—";
}

async function initializeLogin() {
  try {
    await request("/session");
    window.location.href = "dashbord.html";
    return;
  } catch (error) {
    if (error.message.includes("Configurez")) showMessage(error.message, "error");
  }

  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.disabled = true;
    showMessage("Connexion…");
    try {
      await request("/login", {
        method: "POST",
        body: JSON.stringify({
          password: new FormData(event.currentTarget).get("password"),
        }),
      });
      window.location.href = "dashbord.html";
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      button.disabled = false;
    }
  });
}

async function loadAdminProducts() {
  const data = await request("/products");
  return data;
}

function productPayload(form) {
  const values = new FormData(form);
  return {
    name: String(values.get("name") || "").trim(),
    categoryId: Number(values.get("categoryId")),
    price: Number(values.get("price")),
    description: String(values.get("description") || "").trim(),
    image: String(values.get("image") || "").trim(),
    isAvailable: values.get("isAvailable") === "on",
  };
}

function renderProducts(products, container, editable) {
  if (!container) return;
  container.replaceChildren();
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHTML(product.name)}</td>
      <td>${escapeHTML(product.category || "—")}</td>
      <td>${formatPrice(product.price)}</td>
      <td>${product.isAvailable ? "Disponible" : "Indisponible"}</td>
      ${editable ? '<td><button type="button" data-edit>Modifier</button></td>' : ""}
    `;
    if (editable) {
      row.querySelector("[data-edit]").addEventListener("click", () => {
        const form = document.getElementById("product-form");
        form.elements.name.value = product.name;
        form.elements.categoryId.value = product.categoryId || "";
        form.elements.price.value = product.price;
        form.elements.description.value = product.description || "";
        form.elements.image.value = product.image || "";
        form.elements.isAvailable.checked = Boolean(product.isAvailable);
        form.dataset.productId = product.id;
        document.getElementById("product-submit").textContent = "Enregistrer les modifications";
        form.scrollIntoView({ behavior: "smooth" });
      });
    }
    container.append(row);
  });
}

async function initializeProducts() {
  const form = document.getElementById("product-form");
  const table = document.getElementById("products-table");
  const data = await loadAdminProducts();
  const categorySelect = form.elements.categoryId;
  data.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.append(option);
  });
  renderProducts(data.products, table, true);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = form.dataset.productId;
    try {
      const payload = productPayload(form);
      await request(id ? `/products/${id}` : "/products", {
        method: id ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      form.reset();
      delete form.dataset.productId;
      document.getElementById("product-submit").textContent = "Ajouter le plat";
      showMessage("Produit enregistré.", "success");
      const refreshed = await loadAdminProducts();
      renderProducts(refreshed.products, table, true);
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
  form.addEventListener("reset", () => {
    delete form.dataset.productId;
    document.getElementById("product-submit").textContent = "Ajouter le plat";
  });
}

async function loadOrders(target, limit = 200) {
  const { orders } = await request("/orders");
  const selected = orders.slice(0, limit);
  target.replaceChildren();
  selected.forEach((order) => {
    const row = document.createElement("tr");
    const statusOptions = statuses.map(([value, label]) =>
      `<option value="${value}" ${order.status === value ? "selected" : ""}>${label}</option>`,
    ).join("");
    row.innerHTML = `
      <td>${escapeHTML(order.reference)}</td>
      <td>${escapeHTML(order.firstName)} ${escapeHTML(order.lastName)}<br>${escapeHTML(order.phone)}</td>
      <td>${formatPrice(order.total)}</td>
      <td>${escapeHTML(order.paymentMethod)}</td>
      <td>${formatDate(order.createdAt)}</td>
      <td><select aria-label="Statut ${escapeHTML(order.reference)}">${statusOptions}</select></td>
      <td><button type="button" data-detail>Articles</button></td>
    `;
    const select = row.querySelector("select");
    select.addEventListener("change", async () => {
      try {
        await request(`/orders/${encodeURIComponent(order.reference)}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status: select.value }),
        });
        showMessage(`Statut de ${order.reference} mis à jour.`, "success");
      } catch (error) {
        showMessage(error.message, "error");
      }
    });
    row.querySelector("[data-detail]").addEventListener("click", async () => {
      try {
        const detail = await request(`/orders/${encodeURIComponent(order.reference)}`);
        const lines = detail.order.items.map((item) =>
          `${item.name} × ${item.quantity}`,
        ).join(", ");
        window.alert(`${order.reference}\n${lines}\nAdresse : ${detail.order.district}, ${detail.order.address}`);
      } catch (error) {
        showMessage(error.message, "error");
      }
    });
    target.append(row);
  });
}

async function initializeDashboard() {
  const { summary } = await request("/reports");
  document.getElementById("stats-orders").textContent = summary.orderCount || 0;
  document.getElementById("stats-revenue").textContent = formatPrice(summary.revenue);
  document.getElementById("stats-pending").textContent = summary.pendingCount || 0;
  document.getElementById("stats-delivered").textContent = summary.deliveredCount || 0;
  await loadOrders(document.getElementById("orders-table"), 10);
}

async function initializeReports() {
  const { summary } = await request("/reports");
  document.getElementById("report-orders").textContent = summary.orderCount || 0;
  document.getElementById("report-revenue").textContent = formatPrice(summary.revenue);
  document.getElementById("report-pending").textContent = summary.pendingCount || 0;
  document.getElementById("report-delivered").textContent = summary.deliveredCount || 0;
}

async function initializePage() {
  if (page === "login") return initializeLogin();
  try {
    await request("/session");
    document.getElementById("logout-button")?.addEventListener("click", async () => {
      try {
        await request("/logout", { method: "POST" });
        window.location.href = "connexion.html";
      } catch (error) {
        showMessage(error.message, "error");
      }
    });
    if (page === "dashboard") await initializeDashboard();
    if (page === "orders") await loadOrders(document.getElementById("orders-table"));
    if (page === "products") await initializeProducts();
    if (page === "reports") await initializeReports();
    if (page === "stocks") {
      const { products } = await loadAdminProducts();
      renderProducts(products, document.getElementById("products-table"), false);
    }
  } catch (error) {
    if (error.message.includes("Configurez")) {
      showMessage(error.message, "error");
      return;
    }
    window.location.href = "connexion.html";
  }
}

initializePage();
