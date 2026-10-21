function approveMembership(applicant) {
  const user = model.users.find((u) => u.userId === applicant);

  if (user) {
    user.approved = true;
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
  return membership ? membership.name : "Ingen medlemskap";
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
