"use strict";

const trackingForm = document.getElementById("tracking-form");
const trackingMessage = document.getElementById("tracking-message");
const trackingResult = document.getElementById("tracking-result");
const statusNames = {
  pending: "En attente de confirmation",
  confirmed: "Confirmée",
  preparing: "En préparation",
  ready: "Prête",
  out_for_delivery: "En cours de livraison",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const referenceFromUrl = new URLSearchParams(window.location.search).get("reference");
if (referenceFromUrl) {
  trackingForm.elements.reference.value = referenceFromUrl;
}

trackingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  trackingResult.hidden = true;
  trackingMessage.textContent = "Recherche en cours…";
  const reference = trackingForm.elements.reference.value.trim();
  const phone = trackingForm.elements.phone.value.trim();

  try {
    const response = await fetch(
      `/api/v1/orders/${encodeURIComponent(reference)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Impossible de trouver cette commande.");
    }

    document.getElementById("tracking-status").textContent =
      statusNames[data.order.status] || "Statut indisponible";
    document.getElementById("tracking-total").textContent =
      `Total : ${new Intl.NumberFormat("fr-FR").format(data.order.total)} FCFA`;
    const items = document.getElementById("tracking-items");
    items.replaceChildren();
    data.order.items.forEach((item) => {
      const line = document.createElement("li");
      line.textContent = `${item.name} × ${item.quantity}`;
      items.append(line);
    });
    trackingResult.hidden = false;
    trackingMessage.textContent = `Commande ${data.order.reference}`;
  } catch (error) {
    console.error("Erreur de suivi de commande :", error);
    trackingMessage.textContent = error.message || "Erreur de connexion.";
  }
});
