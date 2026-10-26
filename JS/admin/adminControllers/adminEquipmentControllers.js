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