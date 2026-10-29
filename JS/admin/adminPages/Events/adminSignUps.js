function drawAdminSignUps() {
    const state = model.viewState.adminSignUpsPage;

    const content = /*HTML*/ `
        <div class="adminCard signUpsCard">
            <h2>Arrangementer</h2>

            ${createEventRowsHtml()}
        </div>

        ${state.selectedEventId === null ? "" : createSignupListHtml()}
    `;

    return drawAdminShell(content);
}

function createEventRowsHtml() {
    let html = "";

    for (const event of model.events) {
        if (event.isArchived) continue;

        html += /*HTML*/ `
            <div class="subSection signUpEventRow">
                <span>${event.title}</span>
                <span>Start ${formatDate(event.startDate)}</span>
                <span>kl ${event.startTime}</span>
                <button onclick="cancelEvent(${event.id})">Avlys</button>
                <button onclick="startEditSignUpEvent(${event.id})">Rediger</button>
            </div>
        `;
    }

    if (html === "") {
        html = "<p>Ingen arrangementer.</p>";
    }

    return html;
}

function createSignupListHtml() {
    const event = getSignUpEvent();
    if (event === null) return "";

    let html = "";

    for (const signup of event.signups) {
        html += /*HTML*/ `
            <div class="subSection signupRow">
                <span>${getSignUpUsername(signup.userId)}</span>
                <div class="actionButtons">
                    <button onclick="approveSignUp(${event.id}, ${signup.userId})"
                        class="${signup.approved ? "active" : ""}">✓</button>
                    <button onclick="rejectSignUp(${event.id}, ${signup.userId})"
                        class="${signup.approved ? "" : "active"}">X</button>
                </div>
            <div>
        `;
    }

    if (html === "") {
        html = "<p>Ingen påmeldte.</p>";
    }

    return /*HTML*/ `
        <div class="adminCard">
            <h2>Deltagerliste</h2>
            ${html}
        </div>
    `;
}