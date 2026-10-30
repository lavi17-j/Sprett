function drawAdminAddEquipment() {
  const state = model.viewState.adminCreateEquipmentPage;
  const isReservable = state.reservable;

  const content = /*HTML*/ `
    <div class="adminCard">
      <h2>Legg til Nytt Utstyr</h2>

      <div class="subSection">
        <h3>Navn på utstyr</h3>
        <input
          type="text"
          placeholder="Skriv inn navn på utstyr..."
          value="${state.equipmentName}"
          oninput="model.viewState.adminCreateEquipmentPage.equipmentName = this.value"
        />
      </div>

      <div class="subSection">
        <h3>Kan reserveres?</h3>
        <div class="actionButtons">
          <button onclick="setNewEquipmentReservable(true)" class="${isReservable ? "active" : ""}" style="${isReservable ? "background: #0f172a; color: #fff;" : ""}">Ja</button>
          <button onclick="setNewEquipmentReservable(false)" class="${isReservable ? "" : "active"}" style="${!isReservable ? "background: #0f172a; color: #fff;" : ""}">Nei</button>
        </div>
      </div>

      <div class="subSection">
        <h3>Kategori</h3>
        <select
          onchange="model.viewState.adminCreateEquipmentPage.category = this.value"
          style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #ffffff; font-family: inherit; font-size: 0.9rem;"
        >
          <option value="">Velg Kategori</option>
          ${createCategoryOptionsHtml(state.category)}
        </select>

        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <input
            type="text"
            placeholder="Legg til ny kategori..."
            value="${state.addCategory}"
            oninput="model.viewState.adminCreateEquipmentPage.addCategory = this.value"
            style="flex: 1;"
          />
          <button onclick="addEquipmentCategory()" style="width: auto; padding: 10px 16px;">Legg til</button>
        </div>
      </div>

      <button onclick="saveNewEquipment()" style="margin-top: 8px;">Lagre utstyr</button>
    </div>
  `;

  return drawAdminShell(content);
}

function createCategoryOptionsHtml(selectedCategory) {
  let html = "";

  for (const category of model.equipmentCategories) {
    let selected = "";
    if (String(category.id) === String(selectedCategory)) {
      selected = "selected";
    }
    html += /*HTML*/ `
      <option value="${category.id}" ${selected}>${category.name}</option>
    `;
  }

  return html;
}
