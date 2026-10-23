function drawBookingDateScreen () {
    const html = /*HTML*/ `
    <section class="info-box">
        <h3>Velg dato for booking</h3>

        <div class="date-grid">
            ${createDateButtonsHtml()}
        </div>
    </section>
    `;

    return drawUserShell(html);
}

function createDateButtonsHtml() {
    let html = "";

    for (const day of model.calender) {
        html += /*HTML*/ `
            <button class="date-button">${formatDate(day.date)}</button>
        `;

    }

    if (html === "") {
        html = "<p>Ingen datoer er lagt ut ennå.</p>";
    }

    return html;
}