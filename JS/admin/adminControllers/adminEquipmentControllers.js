function addRoom() {
    const state = model.viewState.adminRoomCreationPage;
    const name = state.newRoomName.trim();
    if (name === "") return;

    let newId = 0;
    for (const room of model.rooms) {
        if (room.id >= newId) {
            newId = room.id + 1;
        }
    }

    model.rooms.push({name: name, id: newId});
    state.newRoomName = "";
    updateView();
}

function startEditRoom(roomId) {
    const state = model.viewState.adminRoomCreationPage;

    for (const room of model.rooms) {
        if (room.id === roomId) {
            state.editingRoomId = roomId;
            state.editedRoomName = room.name;
        }
    }
    updateView();
}

function deleteRoom(roomId) {
    for (const event of model.events) {
        if (event.reservedRoom.includes(roomId)) {
            alert("Salen brukes av et arrangement og kan ikke slettes.");
            return;
        }
    }

    model.rooms = model.rooms.filter((room) => room.id !== roomId);
    updateView();
}

function saveRoomName() {
    const state = model.viewState.adminRoomCreationPage;
    const name = state.editedRoomName.trim();
    if (name === "") return;

    for (const room of model.rooms) {
        if (room.id === state.editingRoomId) {
            room.name = name;
        }
    }

    state.editingRoomId = null;
    state.editedRoomName = "";
    updateView();
}

function setNewEquipmentReservable(value) {
    model.viewState.adminCreateEquipmentPage.reservable = value;
    updateView();
}

function setEditEquipmentReservable(value) {
    model.viewState.adminCreateEquipmentPage.reservable = value;
    updateView();
}

function addEquipmentCategory() {
    const state = model.viewState.adminCreateEquipmentPage;
    const name = state.addCategory.trim();
    if (name === "") return;

    let newId = 0;
    for (const category of model.equipmentCategories) {
        if (category.id >= newId) {
            newId = category.id + 1;
        }
    }

    model.equipmentCategories.push({id: newId, name: name});
    state.addCategory = "";
    updateView();
}

function saveNewEquipment() {
    const state = model.viewState.adminCreateEquipmentPage;
    const name = state.equipmentName.trim();
    if (name === "") return;

    let newId = 0;
    for (const item of model.equipment) {
        if (item.id >= newId) {
            newId = item.id + 1;
        }
    }

    let categoryId = null;
    if (state.category !== "") {
        categoryId = Number(state.category);
    }

    model.equipment.push({
        name: name,
        id: newId,
        reservable: state.reservable,
        category: categoryId === null ? [] : [categoryId],
        spec: state.spec,
        spinNumber: state.spinNumber,
    });

    state.equipmentName = "";
    state.equipmentId = null;
    state.reservable = false;
    state.category = null;
    state.spec = "";
    state.spinNumber = "";
    updateView();
}