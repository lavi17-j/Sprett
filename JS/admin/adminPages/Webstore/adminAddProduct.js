function drawAdminAddProducts() {
  const pageState = model.viewState.adminAddProductsPage;

  const content = /*HTML*/ `
    <div class="adminCard">
      <h2>Legg til nytt produkt</h2>

      <div class="adminContentArea">
        <div class="stackedColumn" style="flex: 1;">
          
          <div class="subSection">
            <h3>Produktnavn</h3>
            <input 
              type="text" 
              placeholder="Skriv produktnavn..."
              value="${pageState.productName || ""}"
              oninput="model.viewState.adminAddProductsPage.productName = this.value"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

          <div class="subSection">
            <h3>Produsent</h3>
            <input 
              type="text" 
              placeholder="Skriv produsent..."
              value="${pageState.productProducer || ""}"
              oninput="model.viewState.adminAddProductsPage.productProducer = this.value"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

          <div class="subSection">
            <h3>Pris (kr)</h3>
            <input 
              type="number" 
              min="0"
              placeholder="0.00"
              value="${pageState.productPrice !== null ? pageState.productPrice : ""}"
              oninput="model.viewState.adminAddProductsPage.productPrice = this.value === '' ? null : Math.max(0, Number(this.value))"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

          <div class="subSection">
            <h3>Antall på lager</h3>
            <input 
              type="number" 
              min="0"
              placeholder="0"
              value="${pageState.productQuantity !== null ? pageState.productQuantity : ""}"
              oninput="model.viewState.adminAddProductsPage.productQuantity = this.value === '' ? null : Math.max(0, Number(this.value))"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

        </div>

        <div class="stackedColumn" style="flex: 1.2;">
          
          <div class="subSection" style="flex: 1;">
            <h3>Produktbeskrivelse</h3>
            <textarea 
              placeholder="Skriv produktbeskrivelse..."
              oninput="model.viewState.adminAddProductsPage.productDescription = this.value"
              style="width: 100%; min-height: 140px; padding: 10px; resize: vertical; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; font-family: sans-serif;"
            >${pageState.productDescription || ""}</textarea>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button onclick="saveNewProduct()" style="width: 100%; background: #333 !important; color: white !important; font-weight: bold;">
              Lagre produkt
            </button>
          </div>

        </div>
      </div>
    </div>
  `;

  return drawAdminShell(content);
}
