function drawAdminEditProducts() {
  const pageState = model.viewState.adminEditProductsPage;
  const isSelected = pageState.editingProductId !== null;

  let options = `<option value="">Velg produkt som skal endres...</option>`;
  for (const product of model.webStoreProducts) {
    const selectedAttr =
      pageState.editingProductId === product.productId ? "selected" : "";
    options += `<option value="${product.productId}" ${selectedAttr}>${product.productName} (ID: ${product.productId})</option>`;
  }

  const content = /*HTML*/ `
    <div class="adminCard">
      <h2>Rediger Produkt</h2>

      <div class="subSection">
        <h3>Velg Produkt</h3>
        <select 
          onchange="selectProductToEdit(this.value)"
          style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; background: #fff;"
        >
          ${options}
        </select>
      </div>

      ${
        isSelected
          ? /*HTML*/ `
        <div class="adminContentArea" style="margin-top: 10px;">
          <div class="stackedColumn" style="flex: 1;">
            
            <div class="subSection">
              <h3>Produktnavn</h3>
              <input 
                type="text" 
                value="${pageState.productName || ""}"
                oninput="model.viewState.adminEditProductsPage.productName = this.value"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
              />
            </div>

            <div class="subSection">
              <h3>Produsent</h3>
              <input 
                type="text" 
                value="${pageState.productProducer || ""}"
                oninput="model.viewState.adminEditProductsPage.productProducer = this.value"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
              />
            </div>

            <div class="subSection">
              <h3>Pris (kr)</h3>
              <input 
                type="number" 
                min="0"
                value="${pageState.productPrice !== null ? pageState.productPrice : ""}"
                oninput="model.viewState.adminEditProductsPage.productPrice = this.value === '' ? null : Math.max(0, Number(this.value))"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
              />
            </div>

            <div class="subSection">
              <h3>Antall på lager</h3>
              <input 
                type="number" 
                min="0"
                value="${pageState.productQuantity !== null ? pageState.productQuantity : ""}"
                oninput="model.viewState.adminEditProductsPage.productQuantity = this.value === '' ? null : Math.max(0, Number(this.value))"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
              />
            </div>

          </div>

          <div class="stackedColumn" style="flex: 1.2;">
            
            <div class="subSection" style="flex: 1;">
              <h3>Produktbeskrivelse</h3>
              <textarea 
                oninput="model.viewState.adminEditProductsPage.productDescription = this.value"
                style="width: 100%; min-height: 140px; padding: 10px; resize: vertical; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; font-family: sans-serif;"
              >${pageState.productDescription || ""}</textarea>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button onclick="updateExistingProduct()" style="flex: 2; background: #333 !important; color: white !important; font-weight: bold;">
                Lagre endringer
              </button>
              <button onclick="deleteExistingProduct()" style="flex: 1; background: #cc0000 !important; color: white !important; font-weight: bold;">
                Slett produkt
              </button>
            </div>

          </div>
        </div>
      `
          : `<p style="font-size: 13px; color: #666; font-style: italic; text-align: center; margin-top: 20px;">Vennligst velg et produkt ovenfor for å redigere det.</p>`
      }
    </div>
  `;

  return drawAdminShell(content);
}

