function drawDashBoardFeedback(maxCount) {
    let html = "";
    let count = 0;

    for (let i = model.feedback.length - 1; i >= 0; i--) {
        if (count >= maxCount) break;
        const item = model.feedback[i];

        html += /*HTML*/ `
            <div class="subSection">
                <h3>${getFeedbackUsername(item.userId)} - ${formatDate(item.date)}</h3>
                <p>${item.text}</p>
            </div>
        `;
        count++;
    }

    if (html === "") {
        html = "<p>Ingen tilbakemeldinger ennå.</p>";
    }

    return html;
}

function drawAdminFeedback() {
    let html = "";

    for (const item of model.feedback) {
        html += /*HTML*/ `
            <div class="subSection ${item.isRead ? "" : "feedbackUnread"}">
                <h3>${getFeedbackUsername(item.userId)} - ${formatDate(item.date)}</h3>
                <p>${item.text}</p>
                <div class="actionButtons">
                    ${item.isRead ? "" : `<button onclick="markFeedbackRead(${item.feedbackId})">Merk som lest</button>`}
                    <button onclick="deleteFeedback(${item.feedbackId})">Slett</button>
                </div>
            </div>
        `;
    }

    if (html === "") {
        html = "<p>Ingen tilbakemeldinger ennå.</p>";
    }

    const content = /*HTML*/ `
        <div class="adminCard">
            <h2>Forslagskasse</h2>
            ${html}
        </div>
    `;

    return drawAdminShell(content);
}