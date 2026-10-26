function drawUserChangePersonaliaPage() {
  const profileState = model.viewState.profilePage;

  if (profileState.loadedUserId !== model.app.loggedInUserId) {
    initEditProfileForm();
  }

  const userChangePersonaliaContent = /*HTML*/ `
    <div class="userContentArea">
      <div class="info-box">
        <h3>Endre Personalia</h3>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
          
          <div>
            <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">Navn</label>
            <div style="padding: 10px; background: #f1f1f1; border: 2px solid #000000; border-radius: 6px; font-size: 15px;">
              ${profileState.username || "Ukjent"}
            </div>
          </div>

          <div>
            <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">E-post</label>
            <div style="display: flex; gap: 6px;">
              <input 
                type="email" 
                value="${profileState.email || ""}" 
                oninput="model.viewState.profilePage.email = this.value"
                ${!profileState.isEmailEditable ? 'disabled style="background-color: #f9f9f9; cursor: not-allowed;"' : ""}
              >
              ${
                profileState.isEmailEditable
                  ? /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="saveFieldChanges('email')">Lagre</button>
              `
                  : /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="toggleEditField('email')">Endre</button>
              `
              }
            </div>
          </div>

          <div>
            <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">Telefonnummer</label>
            <div style="display: flex; gap: 6px;">
              <input 
                type="tel" 
                value="${profileState.phone || ""}" 
                oninput="model.viewState.profilePage.phone = this.value"
                ${!profileState.isPhoneEditable ? 'disabled style="background-color: #f9f9f9; cursor: not-allowed;"' : ""}
              >
              ${
                profileState.isPhoneEditable
                  ? /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="saveFieldChanges('phone')">Lagre</button>
              `
                  : /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="toggleEditField('phone')">Endre</button>
              `
              }
            </div>
          </div>

          <div>
            <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">Adresse</label>
            <div style="display: flex; gap: 6px;">
              <input 
                type="text" 
                value="${profileState.address || ""}" 
                oninput="model.viewState.profilePage.address = this.value"
                ${!profileState.isAddressEditable ? 'disabled style="background-color: #f9f9f9; cursor: not-allowed;"' : ""}
              >
              ${
                profileState.isAddressEditable
                  ? /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="saveFieldChanges('address')">Lagre</button>
              `
                  : /*HTML*/ `
                <button class="wide-button" style="margin: 0; width: auto; padding: 0 12px;" onclick="toggleEditField('address')">Endre</button>
              `
              }
            </div>
          </div>

        </div>

        <button class="wide-button" onclick="navigateTo('userProfileHome')" style="margin-top: 20px; background-color: #f1f1f1;">
          Tilbake til profil
        </button>
      </div>
    </div>
  `;

  return drawUserShell(userChangePersonaliaContent);
}
