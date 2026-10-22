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

    <section class="info-box">
        <h3>Dine reservasjoner</h3>
        ${createReservationsHtml()}
    </section>

    `;

    return drawUserShell(content);
}

function createReservationsHtml (){
    let html = "";

    for (const booking of model.equipmentBookings) {
        if (booking.userId === model.app.loggedInUserId) {
            let equipmentName = "";
            for (const item of model.equipment) {
              if (item.id === booking.equipmentId) {
                equipmentName = item.name;
              }  
            }

            html += /*HTML*/ `
                <div class="reservation-row">
                    <span>${equipmentName}</span>
                    <span>${booking.date} kl. ${booking.startTime}-${booking.endTime}</span>
                </div>
            `;
        }
    }

    for (const event of model.events) {
        for (const signup of event.signups) {
            if (signup.userId === model.app.loggedInUserId && !event.isArchived) {
                let roomNames = "";
                for (const room of model.rooms) {
                    if (event.reservedRoom.includedes(room.id)) {
                        roomNames += room.name + "";
                    }
                }

                html += /*HTML*/ `
                    <div class="reservation-row">
                        <span>${event.title}</span>
                        <span>${roomNames}</span>
                        <span>${event.startDate} ${event.startTime}</span>
                    </div>
                `;
            }
        }
    }

    if (html === "") {
        html = "<p>Du har ingen reservasjoner.</p>";
    }

    return html;
}