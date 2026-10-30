function drawAdminOrderFulfillment() {
  const pendingOrders = model.orders.filter(
    (order) => order.status === "Avventer henting",
  );

  let ordersHtml = "";

  for (const order of pendingOrders) {
    const customer = model.users.find((u) => u.userId === order.userId);
    const customerName = customer ? customer.username : "Ukjent kunde";
    const customerPhone =
      customer && customer.phone ? customer.phone : "Ikke oppgitt";

    let itemsHtml = "";
    for (const item of order.items) {
      const product = model.webStoreProducts.find(
        (p) => p.productId === item.productId,
      );
      const productName = product ? product.productName : "Ukjent produkt";
      itemsHtml += `<div>• ${productName} (x${item.quantity})</div>`;
    }

    ordersHtml += /*HTML*/ `
      <div class="adminCard" style="background: #fff; margin-bottom: 15px; border: 2px solid #333; border-radius: 8px; padding: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 10px;">
          <h3 style="margin: 0; font-size: 16px;">Bestilling #${order.orderId}</h3>
          <span style="font-size: 12px; background: #e8e8e8; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${order.date}</span>
        </div>

        <div style="font-size: 13px; margin-bottom: 8px;">
          <strong>Kunde:</strong> ${customerName} (Tlf: ${customerPhone})
        </div>

        <div style="font-size: 13px; margin-bottom: 8px;">
          <strong>Produkter:</strong>
          <div style="margin-left: 10px; margin-top: 4px;">
            ${itemsHtml}
          </div>
        </div>

        <div style="font-size: 13px; margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span><strong>Totalpris:</strong> ${order.totalPrice} kr</span>
          <span style="color: #0044aa; font-weight: bold;">Betaling ved henting</span>
        </div>

        <button 
          onclick="markOrderAsFulfilled(${order.orderId})"
          style="width: 100%; background: #006600 !important; color: white !important; font-weight: bold; padding: 10px; border: none; border-radius: 4px; cursor: pointer;"
        >
          Fullfør og utlever
        </button>
      </div>
    `;
  }

  if (ordersHtml === "") {
    ordersHtml = `<p style="font-style: italic; color: #666; text-align: center; margin-top: 20px;">Ingen bestillinger som avventer henting.</p>`;
  }

  const content = /*HTML*/ `
    <div class="adminCard">
      <h2>Bestillingsutlevering (Henting)</h2>
      <p style="font-size: 13px; color: #666; margin-bottom: 15px;">
        Oversikt over kundebestillinger som venter på henting og betaling på lokasjon.
      </p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${ordersHtml}
      </div>
    </div>
  `;

  return drawAdminShell(content);
}
