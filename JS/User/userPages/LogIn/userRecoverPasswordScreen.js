function drawRecoverPasswordScreen() {
  const recoverContent = /*HTML*/ `
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
  `;

  return drawNotLoggedInShell(recoverContent);
}
