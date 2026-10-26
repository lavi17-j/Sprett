function drawUserSelectSub() {
  const userSelectSubContent = /*HTML*/ `
    <div class="userContentArea">
      <div class="info-box">
        <h3>Velg Medlemskapstype</h3>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
          ${drawAvailableSubs()}
        </div>
      </div>

      <button class="wide-button" onclick="navigateTo('userEditSub')" style="background-color: #f1f1f1; margin-top: 10px;">
        Tilbake
      </button>
    </div>
  `;

  return drawUserShell(userSelectSubContent);
}

function drawAvailableSubs() {
  if (!model.memberships || model.memberships.length === 0) {
    return "<p style='text-align: center; color: #666;'>Ingen medlemskap tilgjengelig.</p>";
  }

  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  const currentMembershipId = user ? user.membershipType : null;

  let html = "";
  for (let i = 0; i < model.memberships.length; i++) {
    const membership = model.memberships[i];
    const isCurrent = currentMembershipId === membership.id;

    html += /*HTML*/ `
      <div style="border: 2px solid #000000; border-radius: 10px; padding: 12px; background: ${isCurrent ? "#f4f9ff" : "#ffffff"};">
        <div style="font-weight: bold; font-size: 15px; margin-bottom: 4px;">${membership.name}</div>
        <div class="price-row">
          <span>Pris:</span>
          <strong>${membership.price} kr / mnd</strong>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
          ${membership.bookingAllowed ? "Inkluderer utstyrsbooking" : ""}
        </div>
        ${
          isCurrent
            ? /*HTML*/ `<div style="font-size: 13px; font-weight: bold; color: #006600; text-align: center; padding: 6px; background: #e6f4ea; border-radius: 6px;">Ditt nåværende medlemskap</div>`
            : /*HTML*/ `<button class="wide-button" style="margin: 0; width: 100%;" onclick="selectMembership(${membership.id})">Velg denne</button>`
        }
      </div>
    `;
  }
  return html;
}
