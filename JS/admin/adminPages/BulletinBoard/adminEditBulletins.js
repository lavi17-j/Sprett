function drawAdminEditBulletins() {
  const postState = model.viewState.adminCreatePostPage;
  const isArrangement = postState.type === "Arrangement";

  const editBulletinsContent = /*HTML*/ `
    <div class="adminCard">
      <h2>Lag Innlegg</h2>

      <div class="adminContentArea">
        
        <div class="stackedColumn" style="flex: 1;">
          <div class="subSection">
            <h3>Tittel</h3>
            <input
              type="text"
              value="${postState.title || ""}"
              oninput="model.viewState.adminCreatePostPage.title = this.value"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

          <div class="subSection">
            <h3>Type</h3>
            <select
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; background: #fff;"
              onchange="model.viewState.adminCreatePostPage.type = this.value; updateView();"
            >
              <option value="Innlegg" ${postState.type === "Innlegg" ? "selected" : ""}>Innlegg</option>
              <option value="Arrangement" ${postState.type === "Arrangement" ? "selected" : ""}>Arrangement</option>
            </select>
          </div>

          ${
            isArrangement
              ? /*HTML*/ `
            <div class="subSection">
              <h3>Datoer og Tider</h3>
              <div style="display: flex; gap: 10px;">
                <div style="flex: 1;">
                  <label style="font-size: 0.8rem; display: block; margin-bottom: 3px;">Start Dato</label>
                  <input
                    type="date"
                    value="${postState.startDate || ""}"
                    oninput="model.viewState.adminCreatePostPage.startDate = this.value"
                    style="width: 100%; padding: 6px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
                  />
                </div>
                <div style="flex: 1;">
                  <label style="font-size: 0.8rem; display: block; margin-bottom: 3px;">Start kl (24t)</label>
                  <div style="display: flex; gap: 4px;">
                    <select 
                      style="flex: 1; padding: 6px; border: 2px solid #333; border-radius: 4px; background: #fff;"
                      onchange="updateTimeState('startTime', 'hour', this.value)"
                    >
                      ${generateHourOptions(postState.startTime)}
                    </select>
                    <select 
                      style="flex: 1; padding: 6px; border: 2px solid #333; border-radius: 4px; background: #fff;"
                      onchange="updateTimeState('startTime', 'minute', this.value)"
                    >
                      ${generateMinuteOptions(postState.startTime)}
                    </select>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-top: 8px;">
                <div style="flex: 1;">
                  <label style="font-size: 0.8rem; display: block; margin-bottom: 3px;">Slutt Dato</label>
                  <input
                    type="date"
                    value="${postState.endDate || ""}"
                    oninput="model.viewState.adminCreatePostPage.endDate = this.value"
                    style="width: 100%; padding: 6px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
                  />
                </div>
                <div style="flex: 1;">
                  <label style="font-size: 0.8rem; display: block; margin-bottom: 3px;">Slutt kl (24t)</label>
                  <div style="display: flex; gap: 4px;">
                    <select 
                      style="flex: 1; padding: 6px; border: 2px solid #333; border-radius: 4px; background: #fff;"
                      onchange="updateTimeState('endTime', 'hour', this.value)"
                    >
                      ${generateHourOptions(postState.endTime)}
                    </select>
                    <select 
                      style="flex: 1; padding: 6px; border: 2px solid #333; border-radius: 4px; background: #fff;"
                      onchange="updateTimeState('endTime', 'minute', this.value)"
                    >
                      ${generateMinuteOptions(postState.endTime)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="subSection">
              <h3>Lenke til arrangement (Event ID)</h3>
              <select
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; background: #fff;"
                onchange="selectEventForPost(this.value)"
              >
                ${generateEventDropdown()}
              </select>
            </div>
          `
              : ""
          }

          <div style="display: flex; gap: 10px;">
            <button onclick="createPost(false)">Lagre</button>
            <button onclick="createPost(true)" style="background: #333 !important; color: white !important;">Publiser</button>
          </div>
        </div>

        <div class="adminContentArea" style="flex: 1.2; gap: 15px;">
          
          <div class="adminCard" style="flex: 1; background: #fafafa;">
            <h2>Forhåndsvisning</h2>
            <div style="font-weight: bold; text-align: center; border-bottom: 2px solid #333; padding-bottom: 6px; word-break: break-word;">
              ${postState.title || "Tittel"}
            </div>
            <div style="flex: 1; min-height: 150px; background: #fff; border: 2px solid #333; padding: 10px; border-radius: 4px; font-size: 0.9rem; color: #333; word-break: break-word; overflow-y: auto;">
              ${postState.inputText ? postState.inputText.replace(/\n/g, "<br>") : "Teksten forhåndsvises her"}
            </div>
            ${
              isArrangement
                ? /*HTML*/ `
              <div style="display: flex; gap: 5px; font-size: 0.8rem;">
                <div style="border: 2px solid #333; padding: 4px; flex: 1; text-align: center; background: #fff; border-radius: 4px;">${postState.startDate || "Start Dato"}</div>
                <div style="border: 2px solid #333; padding: 4px; flex: 1; text-align: center; background: #fff; border-radius: 4px;">${postState.startTime || "Start kl"}</div>
              </div>
              <div style="display: flex; gap: 5px; font-size: 0.8rem;">
                <div style="border: 2px solid #333; padding: 4px; flex: 1; text-align: center; background: #fff; border-radius: 4px;">${postState.endDate || "Slutt Dato"}</div>
                <div style="border: 2px solid #333; padding: 4px; flex: 1; text-align: center; background: #fff; border-radius: 4px;">${postState.endTime || "Slutt kl"}</div>
              </div>
            `
                : ""
            }
          </div>

          <div class="adminCard" style="flex: 1; background: #fafafa;">
            <h2>Innleggstekst</h2>
            <textarea
              style="width: 100%; flex: 1; min-height: 220px; padding: 10px; resize: vertical; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; font-family: sans-serif;"
              placeholder="Skriv her for å fylle inn tekst i innlegget"
              oninput="model.viewState.adminCreatePostPage.inputText = this.value"
            >${postState.inputText || ""}</textarea>
          </div>
        </div>
      </div>
    </div>
  `;

  return drawAdminShell(editBulletinsContent);
}

function generateEventDropdown() {
  const currentLink = model.viewState.adminCreatePostPage.link;
  const isDefaultSelected =
    currentLink === "" || currentLink === null || currentLink === undefined;

  let html = `<option value="" ${isDefaultSelected ? "selected" : ""}>Velg arrangement...</option>`;

  for (let i = 0; i < model.events.length; i++) {
    const event = model.events[i];
    const isSelected =
      String(currentLink) === String(event.id) ? "selected" : "";
    html += `<option value="${event.id}" ${isSelected}>ID: ${event.id} - ${event.title}</option>`;
  }
  return html;
}

function generateHourOptions(selectedTime) {
  let selectedHour = selectedTime ? selectedTime.split(":")[0] : "";
  let html = `<option value="">Time</option>`;
  for (let i = 0; i < 24; i++) {
    const hourStr = i < 10 ? `0${i}` : `${i}`;
    const isSelected = selectedHour === hourStr ? "selected" : "";
    html += `<option value="${hourStr}" ${isSelected}>${hourStr}</option>`;
  }
  return html;
}

function generateMinuteOptions(selectedTime) {
  let selectedMinute = selectedTime ? selectedTime.split(":")[1] : "";
  let html = `<option value="">Min</option>`;
  for (let i = 0; i < 60; i += 5) {
    const minStr = i < 10 ? `0${i}` : `${i}`;
    const isSelected = selectedMinute === minStr ? "selected" : "";
    html += `<option value="${minStr}" ${isSelected}>${minStr}</option>`;
  }
  return html;
}

function updateTimeState(timeField, type, value) {
  const postState = model.viewState.adminCreatePostPage;
  let currentTime = postState[timeField] || "00:00";
  let [hours, minutes] = currentTime.split(":");

  if (type === "hour") hours = value;
  if (type === "minute") minutes = value;

  postState[timeField] = `${hours}:${minutes}`;
}

function createPost(publishingState) {
  const postState = model.viewState.adminCreatePostPage;

  if (!postState.title && !postState.inputText) {
    alert("Vennligst fyll ut tittel eller tekst før du publiserer.");
    return;
  }

  let newId = 0;
  if (model.bulletins && model.bulletins.length > 0) {
    const maxId = Math.max(...model.bulletins.map((b) => b.bulletinId));
    newId = maxId + 1;
  }

  const newBulletin = {
    title: postState.title || "",
    type: postState.type || "Innlegg",
    description: postState.inputText || "",
    startDate: postState.startDate || "",
    endDate: postState.endDate || "",
    startTime: postState.startTime || "",
    endTime: postState.endTime || "",
    bulletinId: newId,
    link: postState.link || "",
    isPublished: publishingState,
    isArchived: false,
    comments: [],
  };

  model.bulletins.push(newBulletin);

  model.viewState.adminCreatePostPage = {
    title: "",
    type: "Innlegg",
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    link: "",
    inputText: "",
  };

  updateView();
}


function selectEventForPost(eventId) {
  const postState = model.viewState.adminCreatePostPage;
  postState.link = eventId;

  if (eventId === "") {
    return;
  }

  const selectedEvent = model.events.find(
    (e) => String(e.id) === String(eventId),
  );

  if (selectedEvent) {
    // Auto-populate the form fields with the event's data
    postState.title = selectedEvent.title || "";
    postState.startDate = selectedEvent.startDate || "";
    postState.endDate = selectedEvent.endDate || "";
    postState.startTime = selectedEvent.startTime || "";
    postState.endTime = selectedEvent.endTime || "";
    postState.inputText = selectedEvent.description || "";
  }

  updateView();
}