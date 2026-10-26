function drawLoginScreen() {
  const loginState = model.viewState.loginPage.loginForm;

  const loginContent = /*HTML*/ `
    <div class="info-box" style="margin-top: 10px;">
      <h3>Innlogging</h3>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
        
        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">Brukernavn eller E-post</label>
          <input 
            type="text" 
            value="${loginState.username}"
            placeholder="Skriv inn brukernavn..."
            oninput="model.viewState.loginPage.loginForm.username = this.value"
          >
        </div>

        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">Passord</label>
          <input 
            type="password"
            value="${loginState.password}"
            placeholder="Skriv inn passord..."
            oninput="model.viewState.loginPage.loginForm.password = this.value"
          >
        </div>

        ${
          loginState.errorMessage
            ? /*HTML*/ `<div style="color: #cc0000; font-size: 12px; font-weight: bold; text-align: center;">${loginState.errorMessage}</div>`
            : ""
        }

        <button class="wide-button" onclick="handleLogin()" style="margin: 8px 0 0 0; width: 100%; background-color: #000000; color: #ffffff;">
          Logg inn
        </button>

        <div style="display: flex; gap: 6px;">
          <button class="wide-button" onclick="navigateTo('startPage')" style="margin: 0; flex: 1; background-color: #f1f1f1;">
            Tilbake
          </button>
          <button class="wide-button" onclick="alert('Glemt passord-funksjonalitet kommer senere')" style="margin: 0; flex: 1; background-color: #f1f1f1;">
            Glemt passord?
          </button>
        </div>

      </div>
    </div>
  `;

  return drawNotLoggedInShell(loginContent);
}

function handleLogin() {
  const loginState = model.viewState.loginPage.loginForm;
  const usernameInput = loginState.username.trim();
  const passwordInput = loginState.password.trim();

  const foundUser = model.users.find(
    (u) => u.username === usernameInput || u.email === usernameInput,
  );

  if (!foundUser) {
    loginState.errorMessage = "Bruknavn eller e-post finnes ikke.";
    updateView();
    return;
  }

  if (foundUser.password !== passwordInput) {
    loginState.errorMessage = "Feil passord.";
    updateView();
    return;
  }

  loginState.errorMessage = "";
  loginState.username = "";
  loginState.password = "";

  model.app.loggedInUserId = foundUser.userId;

  if (foundUser.role === "admin") {
    navigateTo("adminDashboard");
  } else {
    navigateTo("loggedInPage");
  }
}
