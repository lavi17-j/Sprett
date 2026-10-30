function drawUserWebstore() {
  const pageState = model.viewState.userWebStorePage;
  const selectedId = pageState.selectedProductId;

  let contentHtml = "";

  if (selectedId !== null) {
    const product = model.webStoreProducts.find(
      (p) => p.productId === selectedId,
    );
    if (!product) {
      pageState.selectedProductId = null;
      updateView();
      return "";
    }

    const subtotal = (
      product.productPrice * pageState.selectedQuantity
    ).toFixed(2);

    contentHtml = /*HTML*/ `
      <div class="info-box">
        <button class="wide-button" onclick="clearProductFocus()" style="margin: 0 0 12px 0; width: fit-content;">← Tilbake</button>
        
        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${product.productName}</h3>
        <div style="font-size: 12px; color: #666; margin-bottom: 6px;">Produsent: ${product.productProducer}</div>
        <div style="font-size: 16px; font-weight: bold; color: #000000; margin-bottom: 12px;">Pris: ${product.productPrice} kr</div>
        
        <div style="font-size: 13px; line-height: 1.4; background: #f9f9f9; padding: 10px; border: 2px solid #000; border-radius: 10px; margin-bottom: 12px;">
          ${product.productDescription}
        </div>

        <div style="font-size: 12px; color: ${product.productQuantity > 0 ? "#006600" : "#cc0000"}; font-weight: bold; margin-bottom: 12px;">
          Lagerbeholdning: ${product.productQuantity > 0 ? product.productQuantity + " stk på lager" : "Utsolgt"}
        </div>

        ${
          product.productQuantity > 0
            ? /*HTML*/ `
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border: 2px solid #000; border-radius: 10px; padding: 8px;">
            <span>Antall:</span>
            <button onclick="changeProductQuantity(-1)" style="padding: 4px 10px; border: 2px solid #000; border-radius: 6px; background: #fff; cursor: pointer;">-</button>
            <span style="font-weight: bold; font-size: 14px;">${pageState.selectedQuantity}</span>
            <button onclick="changeProductQuantity(1)" style="padding: 4px 10px; border: 2px solid #000; border-radius: 6px; background: #fff; cursor: pointer;">+</button>
            <span style="margin-left: auto; font-weight: bold;">Sum: ${subtotal} kr</span>
          </div>

          <button class="wide-button" onclick="addToCart(${product.productId})" style="background: #000; color: #fff; font-weight: bold; margin: 0;">
            Legg i handlekurv
          </button>
        `
            : ""
        }
      </div>
    `;
  } else {
    let productsHtml = "";
    for (const product of model.webStoreProducts) {
      productsHtml += /*HTML*/ `
        <div 
          onclick="focusProduct(${product.productId})"
          style="border: 2px solid #000; border-radius: 10px; padding: 10px; background: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px;"
        >
          <div style="font-weight: bold; font-size: 13px;">${product.productName}</div>
          <div style="font-size: 11px; color: #666;">${product.productProducer}</div>
          <div style="font-size: 12px; font-weight: bold;">${product.productPrice} kr</div>
          <div style="font-size: 10px; color: ${product.productQuantity > 0 ? "#666" : "#cc0000"};">
            ${product.productQuantity > 0 ? `Lager: ${product.productQuantity}` : "Utsolgt"}
          </div>
        </div>
      `;
    }

    if (productsHtml === "") {
      productsHtml = "<p>Ingen produkter tilgjengelig.</p>";
    }

    let cartItemsHtml = "";
    let cartTotal = 0;

    for (const item of model.viewState.shoppingCart) {
      const prod = model.webStoreProducts.find(
        (p) => p.productId === item.productId,
      );
      if (prod) {
        const itemTotal = prod.productPrice * item.quantity;
        cartTotal += itemTotal;
        cartItemsHtml += /*HTML*/ `
          <div style="display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; border-bottom: 1px dashed #000;">
            <span>${prod.productName} (x${item.quantity})</span>
            <span>${itemTotal.toFixed(2)} kr</span>
          </div>
        `;
      }
    }

    contentHtml = /*HTML*/ `
      <div class="info-box" style="background: #fafafa;">
        <h3>Handlekurv</h3>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${cartItemsHtml || '<p style="font-size: 12px; color: #666; font-style: italic; text-align: center; margin: 4px 0;">Handlekurven er tom.</p>'}
        </div>
        ${
          model.viewState.shoppingCart.length > 0
            ? /*HTML*/ `
          <div style="border-top: 2px solid #000; padding-top: 6px; margin-top: 8px; display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
            <span>Totalt:</span>
            <span>${cartTotal.toFixed(2)} kr</span>
          </div>
          <div style="font-size: 10px; color: #666; font-style: italic; margin-top: 4px; text-align: center;">Betaling skjer ved henting på lokasjon.</div>
          <button class="wide-button" onclick="placeOrder()" style="background: #000; color: #fff; font-weight: bold; margin-top: 8px;">
            Fullfør bestilling (Henting)
          </button>
        `
            : ""
        }
      </div>

      <div class="info-box">
        <h3>Nettbutikk - Produkter</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${productsHtml}
        </div>
      </div>
    `;
  }

  return drawUserShell(contentHtml);
}
