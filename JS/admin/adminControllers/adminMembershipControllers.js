function approveMembership(applicant) {
  const user = model.users.find((u) => u.userId === applicant);

  if (user) {
    user.approved = true;

    const userMembership = model.memberships.find(
      (m) => m.id === user.membershipType,
    );

    if (user.approved && userMembership && userMembership.bookingAllowed) {
      user.isBookingAllowed = true;
    } else {
      user.isBookingAllowed = false;
    }

    updateView();
  }
}

function denyMembership(applicant) {
  const index = model.users.findIndex((u) => u.userId === applicant);

  if (index !== -1) {
    model.users.splice(index, 1);
    console.log("Application Denied!");
  }
  updateView();
}

function getMembershipName(membershipId) {
  const membership = model.memberships.find((m) => m.id === membershipId);
  return membership ? membership.name : "Manglende medlemskapstype";
}

//Fikse opp denne senere
function revokeMembership(membershipId) {}

function drawApplications(maxDisplay) {
  let html = "";
  let awaitingApproval = [];

  for (let i = 0; i < model.users.length; i++) {
    const currentUser = model.users[i];

    if (currentUser.approved === false) {
      awaitingApproval.push(currentUser);

      if (awaitingApproval.length >= maxDisplay) {
        break;
      }
    }
  }

  if (awaitingApproval.length === 0) {
    return `<p>No New Applicants</p>`;
  }

  for (let i = 0; i < awaitingApproval.length; i++) {
    const user = awaitingApproval[i];

    const membershipName = getMembershipName(user.membershipType);

    html += /*HTML*/ `
      <div class="applicantInfo">
        <div class="avatarCircle"></div>
        <div>
          <div>${user.username}</div>
          <small>${membershipName} Medlemskap</small>
        </div>
      </div>
      <div class="actionButtons">
        <button class="approve" onclick ="approveMembership(${user.userId})" >Godkjenn</button>
        <button class="deny" onclick ="denyMembership(${user.userId})">Avslå</button>
      </div>
    `;
  }

  return html;
}

function drawDetailedApplications() {
  let awaitingApproval = [];
  let pendingCancellations = [];

  for (let i = 0; i < model.users.length; i++) {
    const user = model.users[i];
    if (user.approved === false && user.membershipStatus === "standard") {
      awaitingApproval.push(user);
    } else if (user.membershipStatus === "pending_cancellation") {
      pendingCancellations.push(user);
    }
  }

  if (awaitingApproval.length === 0 && pendingCancellations.length === 0) {
    return `<p style="font-size: 0.85rem; color: #666; padding: 10px;">Ingen nye søknader eller oppsigelser til behandling.</p>`;
  }

  let html = "";

  if (awaitingApproval.length > 0) {
    html += `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; margin-bottom: 20px;">
        <h3 style="font-size: 0.9rem; margin: 0; padding-bottom: 4px; border-bottom: 2px solid #333;">Nye Medlemssøknader</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; width: 100%;">
    `;

    for (let i = 0; i < awaitingApproval.length; i++) {
      const user = awaitingApproval[i];
      const membershipName = getMembershipName(user.membershipType);

      html += /*HTML*/ `
        <div class="applicationItem" style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="applicantInfo" style="align-items: flex-start;">
            <div class="avatarCircle"></div>
            <div style="display: flex; flex-direction: column; gap: 2px; flex: 1; word-break: break-word;">
              <div><strong>${user.username}</strong></div>
              <small style="font-weight: bold;">${membershipName} Medlemskap</small>
              <span style="color: #555;"><strong>Adresse:</strong> ${user.address}, ${user.postCode}</span>
              <span style="color: #555;"><strong>Betaling:</strong> ${user.paymentMethod}</span>
              <span style="color: #555;"><strong>Startdato:</strong> ${user.membershipStartUpDate}</span>
            </div>
          </div>
          <div class="actionButtons" style="margin-top: 10px;">
            <button onclick="approveMembership(${user.userId})" style="background: #e6f4ea; color: #006600; font-weight: bold;">Godkjenn</button>
            <button onclick="denyMembership(${user.userId})" style="background: #fff0f0; color: #cc0000; font-weight: bold;">Avslå</button>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  if (pendingCancellations.length > 0) {
    html += `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
        <h3 style="font-size: 0.9rem; margin: 0; padding-bottom: 4px; border-bottom: 2px solid #333;">Innleverte Oppsigelser</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; width: 100%;">
    `;

    for (let i = 0; i < pendingCancellations.length; i++) {
      const user = pendingCancellations[i];
      const membershipName = getMembershipName(user.membershipType);

      html += /*HTML*/ `
        <div class="applicationItem" style="background: #fff9f9; border-color: #ff9999; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="applicantInfo" style="align-items: flex-start;">
            <div class="avatarCircle" style="background: #ffcccc;"></div>
            <div style="display: flex; flex-direction: column; gap: 2px; flex: 1; word-break: break-word;">
              <div><strong>${user.username}</strong> <span style="color: #cc0000; font-size: 0.75rem;">(Ønsker oppsigelse)</span></div>
              <small style="font-weight: bold;">${membershipName} Medlemskap</small>
              <span style="color: #555;"><strong>Startdato:</strong> ${user.membershipStartUpDate}</span>
            </div>
          </div>
          <div class="actionButtons" style="margin-top: 10px;">
            <button onclick="approveCancellation(${user.userId})" style="background: #cc0000; color: white; font-weight: bold;">Godkjenn</button>
            <button onclick="denyCancellation(${user.userId})" style="font-weight: bold;">Avslå</button>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  return html;
}

function drawManageApplication() {
  const applicationsContent = /*HTML*/ `
    <div class="adminCard" style="width: 100%; box-sizing: border-box;">
      <h2>Behandle Søknader og Oppsigelser</h2>
      ${drawDetailedApplications()}
    </div>
  `;

  return drawAdminShell(applicationsContent);
}

function toggleBookingRights(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (user) {
    user.isBookingAllowed = !user.isBookingAllowed;
    updateView();
  }
}

function approveCancellation(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (!user) return;

  if (
    confirm(
      `Godkjenn oppsigelse for ${user.username}? Medlemskapet vil bli avsluttet.`,
    )
  ) {
    user.membershipType = null;
    user.membershipStatus = "standard";
    user.approved = false; 
    user.membershipStartUpDate = "";
    updateView();
  }
}

function denyCancellation(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (!user) return;

  if (confirm(`Avslå oppsigelsesforespørsel for ${user.username}?`)) {
    user.membershipStatus = "standard";
    updateView();
  }
}