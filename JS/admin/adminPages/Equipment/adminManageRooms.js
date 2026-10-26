function drawAdminManageRooms() {
    const state = model.viewState.adminRoomCreationPage;

    const content = /*HTML*/ `
    <div class="adminCard">
        <h2>Legg til sal</h2>
        <input
            type="text"
            placeholder="Navn på sal"
            value="${state.newRoomName}"
            oninput="model.viewState.adminRoomCreationPage.newRoomName = this.value"
            />
             <button onclick="addRoom()">Ok</button>
    </div>

    <div class="adminCard">
        <h2>Juster saler</h2>
        ${createRoomListHtml()}
    </div>
    `;

    return drawAdminShell(content);
}

function createRoomListHtml() {
    const state = model.viewState.adminRoomCreationPage;
    let html = "";

    for (const room of model.rooms) {
        if (state.editingRoomId === room.id) {
            html += /*HTML*/ `
                <div class="subSection roomRow">
                    <input
                        type="text"
                        value="${state.editedRoomName}"
                        oninput="model.viewState.adminRoomCreationPage.editedRoomName = this.value"
                    />
                    <button onclick="saveRoomName()">Lagre</button>
                </div>    
            `;
        } else {
            html += /*HTML*/ `
                <div class="subSection roomRow">
                    <span>${room.name}</span>
                    <div class="actionButtons">
                        <button onclick="deleteRoom(${room.id})">X</button>
                        <button onclick="startEditRoom(${room.id})">✎</button>
                    </div>
                </div>
            `;
        }
    }

    if (html === "") {
        html = "<p>Ingen saler er lagt inn.</p>";
    }

    return html;
}
