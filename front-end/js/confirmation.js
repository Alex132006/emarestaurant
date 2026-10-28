"use strict";

const reference = new URLSearchParams(window.location.search).get("reference");
const message = document.getElementById("confirmation-message");
const referenceElement = document.getElementById("confirmation-reference");
const trackingLink = document.getElementById("tracking-link");

try {
  const saved = JSON.parse(sessionStorage.getItem("ema_last_order") || "null");
  if (!reference || !/^EMA-\d{8}-[A-F0-9]{8}$/i.test(reference)) {
    message.textContent =
      "Aucune confirmation récente n'est disponible dans ce navigateur.";
    trackingLink.hidden = true;
  } else if (saved && saved.reference === reference) {
    document.getElementById("confirmation-title").textContent =
      "Votre commande est enregistrée";
    message.textContent =
      "Le restaurant doit confirmer votre commande. Aucun paiement en ligne n'a été effectué.";
    referenceElement.textContent = `Référence : ${saved.reference}`;
    trackingLink.href =
      `suivi-commande.html?reference=${encodeURIComponent(saved.reference)}`;
  } else {
    document.getElementById("confirmation-title").textContent =
      "Référence de commande";
    message.textContent =
      "Utilisez cette référence et le numéro de téléphone associé pour vérifier le statut de la commande.";
    referenceElement.textContent = `Référence : ${reference}`;
    trackingLink.href =
      `suivi-commande.html?reference=${encodeURIComponent(reference)}`;
  }
} catch (error) {
  console.error("Impossible de lire la confirmation :", error);
  message.textContent = "La confirmation n'a pas pu être affichée.";
  trackingLink.hidden = true;
}
