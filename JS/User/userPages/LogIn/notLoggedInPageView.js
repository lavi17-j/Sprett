function updateViewNotLoggedInPage() {
  const notLoggedInContent = /*HTML*/ `
    <button class="wide-button" onclick="navigateTo('LoginScreen')">
      Allerede kunde? Logg inn!
    </button>

    <button class="wide-button" onclick="navigateTo('newUserRegistration')" style="background-color: #000000; color: #ffffff;">
      Bli medlem i dag!
    </button>

    <section class="price-list" style="margin: 0; width: 100%; box-sizing: border-box;">
      <h2 class="rotated-heading">Priser</h2>
      ${createPricesHtml()}
    </section>

    <section class="info-box">
      <h3>Info</h3>
      <p style="font-size: 13px; line-height: 1.4; margin: 4px 0;">
        Velkommen til Sprett! Vi tilbyr et moderne og trivelig treningsmiljø for alle nivåer.
      </p>
    </section>

    <section class="info-box">
      <h3>Fasiliteter</h3>
      <div class="scrolling-text" style="max-height: 100px; overflow-y: auto; font-size: 13px; line-height: 1.4;">
        Her finner du fullt utstyrt styrkeavdeling, saler for gruppetimer, garderober med badstue, og enkel parkering like utenfor døren.
      </div>
    </section>
  `;

  return drawNotLoggedInShell(notLoggedInContent);
}

function createPricesHtml() {
  let html = "";

  for (const membership of model.memberships) {
    html += /*HTML*/ `
      <div class="price-row">
        <span>${membership.name}-medlemskap</span>
        <span>${membership.price} kr</span>
      </div>
    `;
  }

  return html;
}
