function drawAdminDashboard() {
  const dashboardContent = /*HTML*/ `
    <div id="membershipArea" class="adminCard">
      <h2>Medlemskap</h2>
      <button onclick="navigateTo('memberships')">Bruker/Medlemsoversikt</button>
      <button onclick="navigateTo('applications')">Administrer Søknader</button>
      
      <div class="subSection">
        <h3>Nye Medlemssøknader</h3>
        <div class="applicationItem">
          ${drawApplications(2)}
        </div>
        <button onclick="navigateTo('applications')">Flere</button>
      </div>

      <button onclick="navigateTo('editSubscriptions')">Endre Abonnementer</button>
    </div>

    <div id="bulletinArea" class="adminCard">
      <h2>Oppslagstavla</h2>
      <button onclick="navigateTo('manageBulletins')">Lag/Endre Innlegg</button>
      <button onclick="navigateTo('editBulletins')">Administrer Innlegg</button>
      
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
        <button onclick="navigateTo('editBulletins')">Se og moderer</button>
      </div>
    </div>

    <div class="stackedColumn">
      <div id="bookingArea" class="adminCard">
        <h2>Bookinger/Arrangementer</h2>
        <button onclick="navigateTo('calender')">Kalender</button>
        <button onclick="navigateTo('signUps')">Påmeldinger</button>
        <button onclick="navigateTo('addEvent')">Legg til arrangement</button>
      </div>
      
      <div id="shopArea" class="adminCard">
        <h2>Nettbutikk</h2>
        <button onclick="navigateTo('addProduct')">Legg til Produkt</button>
        <button onclick="navigateTo('editProduct')">Rediger Produkt</button>
      </div>
    </div>

    <div id="equipmentArea" class="adminCard">
      <h2>Utstyr og Sal</h2>
      <button onclick="navigateTo('addEquipment')">Legg til Utstyr</button>
      <button onclick="navigateTo('editEquipment')">Rediger Utstyr</button>
      <button onclick="navigateTo('manageRooms')">Saler</button>
    </div>
  `;

  // 2. Wrap it inside the shared admin shell layout and return it
  return drawAdminShell(dashboardContent);
}

//Need to do this one later when the bulletin board stuff is one
function lastActivity() {}
