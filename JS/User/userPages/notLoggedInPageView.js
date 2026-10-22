function updateViewNotLoggedInPage(){
    let html = ""
    
    html = /*HTML*/ `
    ${createNotLoggedInHeaderHtml()}

    <button class="wide-button" onclick="goToLoginPage()">
    Allerede kunde? Logg inn!
    </button>

    <button class="wide-button" onclick="goToNewUserPage()">
    Bli medlem i dag!
    </button>

    <section class="price-list">
        <h2 class="rotated-heading">Priser</h2>
        ${createPricesHtml()}
    </section>

    <section class="info-box">
        <h3>Info</h3>
        <h2>Info om Sprett</h2>
        <p>Åpningstider etc</p>
    </section>

    <section class="info-box">
        <h3>Overskrift</h3>
        <p class="scrolling-text">
            Tekstboks som fortsette nedover hvis man scroller
            </p>
    </section>

    ${createFooterHtml()}
    
    `;

    return html
}

function createPricesHtml(){
    let html = '';

    for (const memberships of model.memberships) {
        html += /*HTML*/`
            <div class="price-row">
                <span>${memberships.name}-meldemskap</span>
                <span>${memberships.price} kr</span>
            </div>
        `;
    }

    return html;
}




    
    