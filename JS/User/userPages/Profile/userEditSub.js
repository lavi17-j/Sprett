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

  const isPaused = user && user.membershipStatus === "paused";
  const isPendingCancellation =
    user && user.membershipStatus === "pending_cancellation";

  let statusText = "Aktiv (Godkjent)";
  let statusBadgeStyle =
    "background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: 600;";

  if (user && !user.approved) {
    statusText = "Venter på godkjenning";
    statusBadgeStyle =
      "background: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; font-weight: 600;";
  } else if (isPaused) {
    statusText = "Pauset";
    statusBadgeStyle =
      "background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-weight: 600;";
  } else if (isPendingCancellation) {
    statusText = "Oppsigelse til behandling";
    statusBadgeStyle =
      "background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-weight: 600;";
  }

  const userEditSubContent = /*HTML*/ `
    <div class="userContentArea">
      
      <div class="info-box">
        <h3>Betalingsinformasjon</h3>
        <div class="price-row">
          <span style="color: #64748b;">Medlemskapstype:</span>
          <strong style="color: #0f172a;">${membershipName}</strong>
        </div>
        <div class="price-row">
          <span style="color: #64748b;">Pris:</span>
          <strong style="color: #0f172a;">${membershipPrice}</strong>
        </div>
        <div class="price-row" style="margin-bottom: 4px;">
          <span style="color: #64748b;">Neste betalingsdato:</span>
          <strong style="color: #0f172a;">${nextPayment}</strong>
        </div>
      </div>

      <div class="info-box">
        <h3>Medlemskapsdetaljer</h3>
        <div class="price-row">
          <span style="color: #64748b;">Medlemskapstype:</span>
          <strong style="color: #0f172a;">${membershipName}</strong>
        </div>
        <div class="price-row">
          <span style="color: #64748b;">Startdato:</span>
          <strong style="color: #0f172a;">${startDate}</strong>
        </div>
        <div class="price-row">
          <span style="color: #64748b;">Status:</span>
          <span><strong style="${statusBadgeStyle}">${statusText}</strong></span>
        </div>
        <div class="price-row" style="margin-bottom: 16px;">
          <span style="color: #64748b;">Pris:</span>
          <strong style="color: #0f172a;">${membershipPrice}</strong>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="wide-button" style="margin: 0; width: 100%;" onclick="navigateTo('userChangeMembershipType')">
            Endre medlemskapstype
          </button>
          
          <button class="wide-button" style="margin: 0; width: 100%; background-color: ${isPaused ? "#f1f5f9" : "#ffffff"}; color: #0f172a; border: 1px solid #cbd5e1;" onclick="togglePauseMembership()">
            ${isPaused ? "Gjenoppta medlemskap" : "Pause medlemskap"}
          </button>
          
          <button class="wide-button" style="margin: 0; width: 100%; background-color: #fee2e2; color: #991b1b; border: 1px solid #fecaca; ${isPendingCancellation ? "opacity: 0.6; cursor: not-allowed;" : ""}" 
            ${isPendingCancellation ? "disabled" : 'onclick="requestCancellation()"'}>
            ${isPendingCancellation ? "Oppsigelse til behandling" : "Be om oppsigelse av medlemskap"}
          </button>
        </div>
      </div>

      <button class="wide-button" onclick="navigateTo('userProfileHome')" style="background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; margin-top: 0;">
        Tilbake til profil
      </button>
    </div>
  `;

  return drawUserShell(userEditSubContent);
}
