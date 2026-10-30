function drawLoginScreen() {
  const loginState = model.viewState.loginPage.loginForm;

  const loginContent = /*HTML*/ `
    <div class="info-box">
      <h3>Innlogging</h3>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
        
        <div>
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px; color: #475569;">Brukernavn eller E-post</label>
          <input 
            type="text" 
            value="${loginState.username}"
            placeholder="Skriv inn brukernavn..."
            oninput="model.viewState.loginPage.loginForm.username = this.value"
          >
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px; color: #475569;">Passord</label>
          <input 
            type="password"
            value="${loginState.password}"
            placeholder="Skriv inn passord..."
            oninput="model.viewState.loginPage.loginForm.password = this.value"
          >
        </div>

        ${
          loginState.errorMessage
            ? /*HTML*/ `<div style="color: #ef4444; font-size: 0.85rem; font-weight: 600; text-align: center;">${loginState.errorMessage}</div>`
            : ""
        }

        <button class="wide-button" onclick="handleLogin()">
          Logg inn
        </button>

        <div style="display: flex; gap: 8px;">
          <button class="wide-button" style="flex: 1; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;" onclick="navigateTo('startPage')">
            Tilbake
          </button>
          <button class="wide-button" style="flex: 1;" onclick="navigateTo('userRecoverPassword')">
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
