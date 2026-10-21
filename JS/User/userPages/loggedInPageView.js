function updateViewLoggedInPage (){
    const html = /*HTML*/ `
    ${createLoggedInHeaderHtml()}

    <nav class="user-nav">
        <button class="selected">Hjem</button>
        <button>Booking</button>
        <button>Oppslag</button>
        <button>Profil</button>
    </nav>

    <section class="info-box">
        <h3>Registrer oppmøte</h3>
        <input type="text" placeholder="Scan/skriv kode"/>
    </section>

    <section class="info.box">
        <h3>Dine reservasjoner</h3>
        ${createReservationsHtml()}
    </section>

    ${createNotLoggedInFooterHtml()}
    `;

    return html;
}

function createReservationsHtml (){
    let html = "";

    for (const booking of model.equimentBookings) {
        if (booking.userId === model.app.loggedInUserId) {
            let equipmentName = "";
            for (const item of model.equipment) {
                
            }
        }
    }
}