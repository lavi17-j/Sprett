function drawAdminMemberships() {
  const adminMembershipsContent = /*HTML*/ `
<div class="adminCard" style="width:100%;">
    <h2>Medlemsoversikt</h2>

    <div class="memberHeaderBar" style="display: flex; gap: 10px; font-weight: bold; padding: 10px; background: #f1f1f1; border-radius: 4px;">
        <div style="flex: 1.5;">Navn</div>
        <div style="flex: 1.2;">Medlemskapstype</div>
        <div style="flex: 1;">Betaling</div>
        <div style="flex: 1;">Aktive Bookinger</div>
        <div style="flex: 1;">Kan Booke</div>
        <div style="flex: 0.6; text-align: center;">Prikker</div>
        <div style="flex: 1;">Status</div>
        <div style="flex: 1.2; text-align: right;">Handling</div>
    </div>

    <div class="memberListContainer">
        ${generateMembersOverview()}
    </div>
</div>
  `;

  return drawAdminShell(adminMembershipsContent);
}

function generateMembersOverview() {
  let html = "";

  if (model.users.length === 0) {
    return "<p>No members found.</p>";
  }

  for (let i = 0; i < model.users.length; i++) {
    const user = model.users[i];

    const membershipName = getMembershipName(user.membershipType);

    const membership = model.memberships.find(
      (m) => m.id === user.membershipType,
    );
    const allowedToBook = membership ? membership.bookingAllowed : false;

    const paymentText = user.paymentStatus ? "Betalt" : "Utestående";
    const bookingText = user.activeBooking ? "Ja" : "Nei";
    const bookingAllowedText = allowedToBook ? "Tillatt" : "Ikke tillatt";
    const approvalText = user.approved ? "Godkjent" : "Avventer";

    const actionButtonsHTML = drawMemberActionButtons(user);

    html += /*HTML*/ `
      <div class="memberRow" style="display: flex; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
        <div style="flex: 1.5;"><strong>${user.username}</strong></div>
        <div style="flex: 1.2;">${membershipName}</div>
        <div style="flex: 1;">${paymentText}</div>
        <div style="flex: 1;">${bookingText}</div>
        <div style="flex: 1;">${bookingAllowedText}</div>
        <div style="flex: 0.6; text-align: center;">${user.penalties}</div>
        <div style="flex: 1;">${approvalText}</div>
        <div style="flex: 1.2; text-align: right; display: flex; gap: 5px; justify-content: flex-end;"> 
          ${actionButtonsHTML}
        </div>
      </div>
    `;
  }
  return html;
}

function drawMemberActionButtons(user) {
  if (!user.approved) {
    return /*HTML*/ `
      <button onclick="approveMembership(${user.userId})">Godkjenn Søknad</button>
      <button onclick="denyMembership(${user.userId})">Avvis Søknad</button>
    `;
  } else {
    return /*HTML*/ `
      <button onclick="revokeMembership(${user.userId})">Fjern medlemskap</button>
    `;
  }
}
