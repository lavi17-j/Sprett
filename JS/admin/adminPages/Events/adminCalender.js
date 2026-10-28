function drawAdminCalender() {
    const state = model.viewState.adminCalenderPage;

    const content = /*HTML*/ `
        <div class="adminCard calenderCard">
            <h2>Kalender</h2>

            <div class="actionButtons">
                <button 
                    class="${state.selectedTab === "Events" ? "active" : ""}"
                    onclick="setCalenderTab('Events')"
                >Arrangementer</button>
                <button
                    class="${state.selectedTab === "Equipment" ? "active" : ""}"
                    onclick="setCalenderTab('Equipment')"
                >Utstyr</button>
            </div>

            ${state.selectedTab === "Events" ? createEventsTabHtml() : createEquipmentTabHtml()}
        </div>
    `;

    return drawAdminShell(content);
}

function createEventsTabHtml() {
    const state = model.viewState.adminCalenderPage;

    return /*HTML*/ `
        <div class="calenderColumns">
            <div class="calenderDateList">
                ${createCalenderRowsHtml()}
            </div>

            ${state.selectedEventId === null ? "" : createEventDetailHtml()}
            ${state.selectedEventId === null ? "" : createSignupListHtml()}
        </div>

    `;
}

