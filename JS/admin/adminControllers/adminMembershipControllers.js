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
  let html = "";
  let awaitingApproval = [];

  for (let i = 0; i < model.users.length; i++) {
    if (model.users[i].approved === false) {
      awaitingApproval.push(model.users[i]);
    }
  }

  if (awaitingApproval.length === 0) {
    return `<p>No New Applicants</p>`;
  }

  for (let i = 0; i < awaitingApproval.length; i++) {
    const user = awaitingApproval[i];
    const membershipName = getMembershipName(user.membershipType);

    html += /*HTML*/ `
      <div class="applicationItem" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #ddd; background: #fff; margin-bottom: 10px; border-radius: 4px;">
        <div class="applicantInfo" style="display: flex; gap: 15px; align-items: center;">
          <div class="avatarCircle" style="width: 40px; height: 40px; background: #ccc; border-radius: 50%;"></div>
          <div>
            <div><strong>${user.username}</strong></div>
            <small style="color: #444; font-weight: bold;">${membershipName} Medlemskap</small>
            <div style="font-size: 0.85rem; color: #666; margin-top: 4px; display: flex; flex-direction: column; gap: 2px;">
              <span><strong>Adresse:</strong> ${user.address}, ${user.postCode}</span>
              <span><strong>Betalingsmåte:</strong> ${user.paymentMethod}</span>
              <span><strong>Søknadsdato:</strong> ${user.membershipApplicationDate} | <strong>Startdato:</strong> ${user.membershipStartUpDate}</span>
            </div>
          </div>
        </div>
        <div class="actionButtons" style="display: flex; gap: 5px;">
          <button class="approve" onclick="approveMembership(${user.userId})">Godkjenn</button>
          <button class="deny" onclick="denyMembership(${user.userId})">Avslå</button>
        </div>
      </div>
    `;
  }

  return html;
}

function toggleBookingRights(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (user) {
    user.isBookingAllowed = !user.isBookingAllowed;
    updateView();
  }
}
