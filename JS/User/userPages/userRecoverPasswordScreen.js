function drawRecoverPasswordScreen () {
    const html = /*HTML*/ `
    <div class="userLayout">
        <header class="front-header">
            <h1> Sprett</h1>
            <div class="logo-circle"></div>
            <p>Velkommen, kunde!</p>
        </header>

        <div class="info-box">
            <h3>Har du glemt passordet ditt?</h3>

            <p>Telefon/E-post</p>
            <input type="text" id="recover-username"/>

            <button class="wide-button" id="recover-button">
                Be om nytt passord!
            </button>
        </div>

        <button class="wide-button" onclick="navigateTo('LoginScreen')">
            Tilbake
        </button>

        ${createFooterHtml()}
    </div>
    `;

    return html;
}