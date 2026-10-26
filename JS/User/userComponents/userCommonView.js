function createNotLoggedInHeaderHtml(){
    return /*HTML*/ `
    <header class="front-header">
        <div class="logo-circle"></div>
        <h1>Sprett</h1>
        <p>Velkommen, Kunde!</p>
        <p onclick="goToNewUserPage()" class="link-text">Bli medlem!</p>
    </header>
   
    `;
}

function createLoggedInHeaderHtml (){
    let username = "";
    let membershipName = "";

    for (const user of model.users) {
        if (user.userId === model.app.loggedInUserId) {
            username = user.username;

            for (const membership of model.memberships) {
                if (membership.id === user.membershipType) {
                    membershipName = membership.name + "-medlem";
                }
            }
        }
    }

    return /*HTML*/ `
    <header class="front-header">
        <h1>Sprett</h1>
        <div class="profile-picture">Profilbildet</div>
        <p>Velkommen, ${username}!</p>
        <p>${membershipName}</p>
        <button onclick="logoutUser()">Log Ut</button>
    </header>
    `;
}

function createFooterHtml(){
    return /*HTML*/`
        <footer class="front-footer">
            <h3>Adresse</h3>
            <h3>Åpningstider</h3>
            <p>
                Resepsjon: ${model.openingHours.reception.open}
                -
                ${model.openingHours.reception.close}
            </p>
            <p>
                Treningssenter: ${model.openingHours.gymAccess.open}
                -
                ${model.openingHours.gymAccess.close}
            </p>
        </footer>
    `;
}
