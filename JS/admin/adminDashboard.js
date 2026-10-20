function updateAdminView() {
  html = "";

  html = /*HTML*/ `
    <div class="adminLayout">

      <div class="sideBar">
        <div class="sidebarLogo">Sprett Admin</div>
        <ul class="sidebarNav">
          <li>Dashboard</li>
          <li>Medlemskap</li>
          <li>Oppslagstavla</li>
          <li>Booking/Arrangementer</li>
          <li>Butikk</li>
          <li>Utstyr og Sal</li>
          <li>Annet</li>
        </ul>
      </div>

      <div class="adminMain">
        <header class="adminTopBar">
          <div class="userInfo">
            <span>Navn Navnesen</span>
            <div class="userAvatar"></div>
            <button class="logoutBtn">Log Ut</button>
          </div>
        </header>

        <div class="adminHeaderBar">
          <h1>Sprett - Admin Dashboard</h1>
        </div>

        <div class="adminContentArea">
          
          <div id="membershipArea" class="adminCard">
            <h2>Medlemskap</h2>
            <button onclick ="navigateTo(memberships)">Bruker/Medlemsoversikt</button>
            <button onclick ="navigateTo(applications)">Administrer Søknader</button>
            
            <div class="subSection">
              <h3>Nye Medlemssøknader</h3>
              <div class="applicationItem">
                ${drawApplications()}
              </div>
              <button onclick ="navigateTo(applications)">Flere</button>
            </div>

            <button onclick ="navigateTo(editSubscriptions)">Endre Abonnementer</button>
          </div>

          <div id="bulletinArea" class="adminCard">
            <h2>Oppslagstavla</h2>
            <button onclick ="navigateTo(manageBulletins)">Lag/Endre Innlegg</button>
            <button onclick ="navigateTo(editBulletins)">Administrer Innlegg</button>
            
            <div class="subSection">
              <h3>Siste Aktivitet</h3>
              <div class="bulletinItem">
                <div class="bulletinHeader">
                  <div class="avatarCircle"></div>
                  <div>
                    <strong>Tittel på oppslag</strong>
                    <div>Brukerens Navn</div>
                    <small>Brukerens Kommentar står her</small>
                  </div>
                  <span class="closeX">✕</span>
                </div>
                <small>Antall Kommentarer</small>
              </div>
              <button onclick ="navigateTo(editBulletins)">Se og moderer</button>
            </div>
          </div>

          <div class="stackedColumn">
            <div id="bookingArea" class="adminCard">
              <h2>Bookinger/Arrangementer</h2>
              <button onclick ="navigateTo(calender)">Kalender</button>
              <button onclick ="navigateTo(signUps)">Påmeldinger</button>
              <button onclick ="navigateTo(addEvent)">Legg til arrangement</button>
            </div>
            
            <div id="shopArea" class="adminCard">
              <h2>Nettbutikk</h2>
              <button onclick ="navigateTo(addProduct)">Legg til Produkt</button>
              <button onclick ="navigateTo(editProduct)">Rediger Produkt</button>
            </div>
          </div>

          <div id="equipmentArea" class="adminCard">
            <h2>Utstyr og Sal</h2>
            <button onclick ="navigateTo(addEquipment)">Legg til Utstyr</button>
            <button onclick ="navigateTo(editEquipment)">Rediger Utstyr</button>
            <button onclick ="navigateTo(manageRooms)">Saler</button>
          </div>

        </div>
      </div>
    </div>
  `;

  return html;
}

function drawApplications() {
  let html = "";
  const maxDisplayedApplicants = 2;
  let awaitingApproval = [];

  for (let i = 0; i < model.users.length; i++) {
    const currentUser = model.users[i];

    if (currentUser.approved === false) {
      awaitingApproval.push(currentUser);

      if (awaitingApproval.length >= maxDisplayedApplicants) {
        break;
      }
    }
  }

  if (awaitingApproval.length === 0) {
    return `<p>No New Applicants</p>`;
  }

  for (let i = 0; i < awaitingApproval.length; i++) {
    const user = awaitingApproval[i];

    const membership = model.memberships.find(
      (m) => m.id === user.membershipType,
    );

    const membershipName = membership ? membership.name : "Ingen medlemskap";

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

//Need to do this one later when the bulletin board stuff is one
function lastActivity() {}

//------------------------------------------------------------------------
//                          Membership
//------------------------------------------------------------------------

function approveMembership(applicant) {
  const user = model.users.find((u) => u.userId === applicant);

  if (user) {
    user.approved = true;
    updateAdminView();
  }
}
function denyMembership(applicant) {
  const index = model.users.findIndex((u) => u.userId === applicant);

  if (index !== -1) {
    model.users.splice(index, 1);
    console.log("Application Denied!");
  }
  updateAdminView();
}
