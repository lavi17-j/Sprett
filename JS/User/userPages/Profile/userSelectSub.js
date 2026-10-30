function drawUserSelectSub() {
  const userSelectSubContent = /*HTML*/ `
    <div class="userContentArea">
      <div class="info-box">
        <h3>Velg Medlemskapstype</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
          ${drawAvailableSubs()}
        </div>
      </div>

      <button class="wide-button" onclick="navigateTo('userEditSubscription')" style="background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; margin-top: 0;">
        Tilbake
      </button>
    </div>
  `;

  return drawUserShell(userSelectSubContent);
}

function drawAvailableSubs() {
  if (!model.memberships || model.memberships.length === 0) {
    return `<p style='text-align: center; color: #64748b; font-style: italic;'>Ingen medlemskap tilgjengelig.</p>`;
  }

  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  const currentMembershipId = user ? user.membershipType : null;

  let html = "";
  for (let i = 0; i < model.memberships.length; i++) {
    const membership = model.memberships[i];
    const isCurrent = currentMembershipId === membership.id;

    html += /*HTML*/ `
      <div style="border: 1px solid ${isCurrent ? "#93c5fd" : "#e2e8f0"}; border-radius: 8px; padding: 14px; background: ${isCurrent ? "#f0f9ff" : "#ffffff"}; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
        <div style="font-weight: 600; font-size: 1rem; color: #0f172a; margin-bottom: 6px;">${membership.name}</div>
        <div class="price-row" style="border-bottom: none; padding: 2px 0;">
          <span style="color: #64748b;">Pris:</span>
          <strong style="color: #0f172a;">${membership.price} kr / mnd</strong>
        </div>
        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 12px;">
          ${membership.bookingAllowed ? "Inkluderer utstyrsbooking" : ""}
        </div>
        ${
          isCurrent
            ? /*HTML*/ `<div style="font-size: 0.85rem; font-weight: 600; color: #065f46; text-align: center; padding: 8px; background: #d1fae5; border-radius: 6px; border: 1px solid #a7f3d0;">Ditt nåværende medlemskap</div>`
            : /*HTML*/ `<button class="wide-button" style="margin: 0; width: 100%;" onclick="selectMembership(${membership.id})">Velg denne</button>`
        }
      </div>
    `;
  }
  return html;
}
