function drawAdminEditEquipment() {
    const state = model.viewState.adminEditEquipmentPage;
    const isReservable = state.reservable;

    const content = /*HTML*/ `
        <div class="adminCard equipmentList">
            <p>Liste over utstyr</p>
            ${createEquipmentListHtml()}
        </div>

        <div class="adminCard">
            <input 
                type="text"
                placeholder="Navn på utstyr"
                value="${state.equipmentName}"
                oninput="model.viewState.adminEditEquipmentPage.equipmentName = this.value"
            />

        </div>

        <div class="adminCard">
            <div class="subSection">
                <p>Kan Reserveres?</p>
                <div class="actionButtons">
                    <button onclick="setEditEquipmentReservable(true)" class="${isReservable ? 'active' : ''}">✓</button>
                    <button onclick="setEditEquipmentReservable(false)" class="${isReservable ? '' : 'active'}">X</button>
                </div>
            </div>

            <p>Kategori</p>
            <select
                onchange="model.viewState.adminEditEquipmentPage.category = this.value"
            >
                <option value="">Velg kategori</option>
                ${createCategoryOptionsHtml(state.category)}
            </select>
        </div>

        <button onclick="saveEquipmentChanges()">Lagre</button>

    `;

    return drawAdminShell(content);
}

function createEquipmentListHtml() {
    let html = "";

    for (const item of model.equipment) {
        html += /*HTML*/ `
            <div class="subSection equipmentRow">
                <button class="equipmentListItem" onclick="startEditEquipment(${item.id})">
                    ${item.name}
                </button>
                <button onclick="deleteEquipment(${item.id})">X</button>
            </div>
        `;
    }

    if (html === "") {
        html = "<p>Ingen utstyr er lagt inn.</p>";
    }

    return html;
}
