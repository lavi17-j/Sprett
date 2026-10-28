function drawAdminAddEvents() {
  const pageState = model.viewState.adminCreateEventPage;

  let roomOptions = `<option value="">Ingen sal valgt (Valgfritt)</option>`;
  for (const room of model.rooms) {
    const isSelected = pageState.reservedRoom === room.id ? "selected" : "";
    roomOptions += `<option value="${room.id}" ${isSelected}>${room.name}</option>`;
  }

  const html = /*HTML*/ `
    <div class="adminCard">
      <h2>Opprett nytt arrangement</h2>

      <label>
        <strong>Tittel / Overskrift</strong>
        <input 
          type="text" 
          placeholder="Skriv tittel på arrangementet..."
          value="${pageState.title || ""}"
          oninput="model.viewState.adminCreateEventPage.title = this.value"
          style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; box-sizing: border-box;"
        />
      </label>

      <label>
        <strong>Beskrivelse</strong>
        <textarea 
          placeholder="Skriv beskrivelse..."
          oninput="model.viewState.adminCreateEventPage.description = this.value"
          style="width: 100%; height: 100px; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; font-family: sans-serif; box-sizing: border-box;"
        >${pageState.description || ""}</textarea>
      </label>

      <label>
        <strong>Maks antall påmeldte</strong>
        <input 
          type="number" 
          value="${pageState.maxParticipants || 10}"
          oninput="model.viewState.adminCreateEventPage.maxParticipants = Number(this.value)"
          style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; box-sizing: border-box;"
        />
      </label>

      <div style="display: flex; gap: 12px;">
        <label style="flex: 1;">
          <strong>Starttid</strong>
          <select 
            onchange="model.viewState.adminCreateEventPage.startTime = this.value"
            style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; background: #fff; box-sizing: border-box;"
          >
            ${createHourOptions(pageState.startTime)}
          </select>
        </label>
        <label style="flex: 1;">
          <strong>Sluttid</strong>
          <select 
            onchange="model.viewState.adminCreateEventPage.endTime = this.value"
            style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; background: #fff; box-sizing: border-box;"
          >
            ${createHourOptions(pageState.endTime)}
          </select>
        </label>
      </div>

      <div style="display: flex; gap: 12px;">
        <label style="flex: 1;">
          <strong>Startdato</strong>
          <input 
            type="date" 
            value="${pageState.startDate || ""}"
            onchange="model.viewState.adminCreateEventPage.startDate = this.value"
            style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; box-sizing: border-box;"
          />
        </label>
        <label style="flex: 1;">
          <strong>Sluttdato</strong>
          <input 
            type="date" 
            value="${pageState.endDate || ""}"
            onchange="model.viewState.adminCreateEventPage.endDate = this.value"
            style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; box-sizing: border-box;"
          />
        </label>
      </div>

      <label>
        <strong>Reserver sal (Valgfritt)</strong>
        <select 
          onchange="model.viewState.adminCreateEventPage.reservedRoom = this.value === '' ? null : Number(this.value)"
          style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; background: #fff; box-sizing: border-box;"
        >
          ${roomOptions}
        </select>
      </label>

      <label>
        <strong>Event ID (for kobling i oppslagstavla)</strong>
        <input 
          type="text" 
          placeholder="Marathon#4..."
          value="${pageState.eventID !== null && pageState.eventID !== undefined ? pageState.eventID : ""}"
          oninput="model.viewState.adminCreateEventPage.eventID = this.value === '' ? null : this.value"
          style="width: 100%; padding: 8px; margin-top: 4px; border: 2px solid #333; border-radius: 4px; box-sizing: border-box;"
        />
      </label>

      <button onclick="saveNewEvent();" style="margin-top: 12px; width: 100%;">
        Lagre arrangement
      </button>
    </div>
  `;

  return drawAdminShell(html);
}
