function drawAdminMemberships() {
  const adminMembershipsContent = /*HTML*/ `

<div class="adminCard" style="width:100%;">
    <h2>Medlemsoversikt</h2>

    <div class="memberHeaderBar" style="display: flex; gap: 15px; font-weight: bold; padding: 10px; background: #f1f1f1; border-radius: 4px;">
        <div style="flex:1;">Navn</div>
        <div style="flex:1;">Medlemskapstype</div>
        <div style="flex:1;">Betaling</div>
        <div style="flex:1;">Aktive Bookinger</div>
        <div style="flex:1;">Kan Booke</div>
        <div style="flex:1;">Prikker</div>
        <div style="flex:1;">Status</div>
        <div style="flex:1;">Handling</div>
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

    const paymentText = user.paymentStatus ? "betalt" : "Utestående";
    const bookingText = user.activeBooking ? "Ja" : "Nei";
    const bookingAllowedText = allowedToBook ? "Tillatt" : "Ikke tillatt";
    const approvalText = user.approved ? "Godkjent" : "Avventer";

    html += /*HTML*/ `
        <div class="memberRow" style="display: flex; gap: 15px; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
        <div><strong>${user.username}</strong></div>
        <div>${membershipName}</div>
        <div>${paymentText}</div>
        <div>${bookingText}</div>
        <div>${bookingAllowedText}</div>
        <div>${user.penalties}</div>
        <div>${approvalText}</div>
        <div>
          <button onclick="revokeMembership(${user.userId})">Fjern medlemskap</button>
        </div>
      </div>
      
      `;
  }
  return html;
}
