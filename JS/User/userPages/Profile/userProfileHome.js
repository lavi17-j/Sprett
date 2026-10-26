function drawUserProfileHomePage() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  const membership =
    user && user.membershipType !== null
      ? model.memberships.find((m) => m.id === user.membershipType)
      : null;

  const userProfileHomePageContent = /*HTML*/ `
    <div class="userContentArea">
      
      <div class="info-box">
        <h3>Personalia</h3>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <div class="profile-picture">${displayUserName().substring(0, 1).toUpperCase()}</div>
          <div>
            <div style="font-weight: bold;">${displayUserName()}</div>
            <div style="font-size: 12px; color: #666;">${user ? `${user.address || ""}, ${user.postCode || ""}` : ""}</div>
          </div>
        </div>
        <button class="wide-button" onclick="navigateTo('userEditProfile')">Administrer</button>
      </div>

      <div class="info-box">
        <h3>Medlemskap</h3>
        ${
          membership
            ? /*HTML*/ `
          <div class="price-row">
            <span>Type:</span>
            <strong>${membership.name}</strong>
          </div>
          <div class="price-row" style="margin-bottom: 8px;">
            <span>Pris:</span>
            <strong>${membership.price} kr / mnd</strong>
          </div>
        `
            : /*HTML*/ `
          <div style="padding: 6px 0; font-style: italic; color: #666; text-align: center;">Ingen aktivt medlemskap</div>
        `
        }
        <button class="wide-button" onclick="navigateTo('userEditSubscription')">Administrer</button>
      </div>

    </div>
  `;

  return drawUserShell(userProfileHomePageContent);
}

function getUserAddress() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  if (!user) return "Ingen adresse registrert";
  return `${user.address || ""}, ${user.postCode || ""}`;
}

function drawSubscriptionInfo() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);

  if (
    !user ||
    user.membershipType === null ||
    user.membershipType === undefined
  ) {
    return `<div style="padding: 4px 0; font-style: italic; color: #666;">Ingen aktivt medlemskap</div>`;
  }

  const membership = model.memberships.find(
    (m) => m.id === user.membershipType,
  );

  if (!membership) {
    return `<div style="padding: 4px 0; font-style: italic; color: #666;">Ukjent medlemskapstype</div>`;
  }

  return /*HTML*/ `
    <div class="price-row">
      <span>Type:</span>
      <strong>${membership.name}</strong>
    </div>
    <div class="price-row" style="margin-bottom: 10px;">
      <span>Pris:</span>
      <strong>${membership.price} kr / mnd</strong>
    </div>
  `;
}