function drawUserEditSub() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  const membership =
    user && user.membershipType !== null
      ? model.memberships.find((m) => m.id === user.membershipType)
      : null;

  const membershipName = membership ? membership.name : "Ingen medlemskap";
  const membershipPrice = membership ? `${membership.price} kr / mnd` : "0 kr";

  const nextPayment = user ? formatDate(getNextPaymentDate(user)) : "-";
  const startDate = user
    ? formatDate(user.membershipStartUpDate || user.membershipApplicationDate)
    : "-";

  const statusText =
    user && user.approved ? "Aktiv (Godkjent)" : "Venter på godkjenning";

  const userEditSubContent = /*HTML*/ `
    <div class="userContentArea">
      
      <div class="info-box">
        <h3>Betalingsinformasjon</h3>
        <div class="price-row">
          <span>Medlemskapstype:</span>
          <strong>${membershipName}</strong>
        </div>
        <div class="price-row">
          <span>Pris:</span>
          <strong>${membershipPrice}</strong>
        </div>
        <div class="price-row" style="margin-bottom: 4px;">
          <span>Neste betalingsdato:</span>
          <strong>${nextPayment}</strong>
        </div>
      </div>

      <div class="info-box">
        <h3>Medlemskapsdetaljer</h3>
        <div class="price-row">
          <span>Medlemskapstype:</span>
          <strong>${membershipName}</strong>
        </div>
        <div class="price-row">
          <span>Startdato:</span>
          <strong>${startDate}</strong>
        </div>
        <div class="price-row">
          <span>Status:</span>
          <strong>${statusText}</strong>
        </div>
        <div class="price-row" style="margin-bottom: 12px;">
          <span>Pris:</span>
          <strong>${membershipPrice}</strong>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button class="wide-button" style="margin: 0; width: 100%;" onclick="navigateTo('userChangeMembershipType')">
            Endre medlemskapstype
          </button>
          <button class="wide-button" style="margin: 0; width: 100%; background-color: #f9f9f9;" onclick="alert('Pausefunksjonalitet kommer senere')">
            Pause medlemskap
          </button>
          <button class="wide-button" style="margin: 0; width: 100%; background-color: #fff0f0;" onclick="alert('Oppsigelsesfunksjonalitet kommer senere')">
            Be om oppsigelse av medlemskap
          </button>
        </div>
      </div>

      <button class="wide-button" onclick="navigateTo('userProfileHome')" style="background-color: #f1f1f1;">
        Tilbake til profil
      </button>
    </div>
  `;

  return drawUserShell(userEditSubContent);
}
