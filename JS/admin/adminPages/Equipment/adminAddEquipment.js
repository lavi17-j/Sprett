function drawAdminAddEquipment() {
  const state = model.viewState.adminCreateEquipmentPage;
  const isReservable = state.reservable;

  const content = /*HTML*/ `
        <div class="adminCard">
            <input
                type="text"
                placeholder="Navn på utstyr"
                value="${state.equipmentName}"
                oninput="model.viewState.adminCreateEquipmentPage.equipmentName = this.value"
            />
        </div>

        <div class="adminCard">
            <div class="subSection">
                <p>Kan reserveres?</p>
                <div class="actionButtons">
                    <button onclick="setNewEquipmentReservable(true)" class="${isReservable ? "active" : ""}">✓</button>
                    <button onclick="setNewEquipmentReservable(false)" class="${isReservable ? "" : "active"}">X</button>
                </div>
            </div>
        </div>

        <div clas="adminCard">
            <p>Kategori</p>
            <select
                onchange="model.viewState.adminCreateEquipmentPage.category = this.value"
            >
                <option value="">Velg Kategori</option>
                ${createCategoryOptionsHtml(state.category)}
            </select>

            <input
            type="text"
            placeholder="Legg til kategori"
            value="${state.addCategory}"
            oninput="model.viewState.adminCreateEquipmentPage.addCategory = this.value"
            />
            <button onclick="addEquipmentCategory()">Legg til</button>
        </div>

        <button onclick="saveEquipment()">Lagre</button>
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
