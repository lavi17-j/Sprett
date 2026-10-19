function updateAdminView() {
  const app = document.getElementById("app");

  app.innerHTML = /*HTML*/ `
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
            <button>Bruker/Medlemsoversikt</button>
            <button>Administrer Søknader</button>
            
            <div class="subSection">
              <h3>Nye Medlemssøknader</h3>
              <div class="applicationItem">
                <div class="applicantInfo">
                  <div class="avatarCircle"></div>
                  <div>
                    <div>Navn Navnesen</div>
                    <small>Styrke Medlemskap</small>
                  </div>
                </div>
                <div class="actionButtons">
                  <button class="approve">Godkjenn</button>
                  <button class="deny">Avslå</button>
                </div>
              </div>
              <button>Flere</button>
            </div>

            <button>Endre Abonnementer</button>
          </div>

          <div id="bulletinArea" class="adminCard">
            <h2>Oppslagstavla</h2>
            <button>Lag/Endre Innlegg</button>
            <button>Administrer Innlegg</button>
            
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
              <button>Se og moderer</button>
            </div>
          </div>

          <div class="stackedColumn">
            <div id="bookingArea" class="adminCard">
              <h2>Bookinger/Arrangementer</h2>
              <button>Kalender</button>
              <button>Påmeldinger</button>
              <button>Legg til arrangement</button>
            </div>
            
            <div id="shopArea" class="adminCard">
              <h2>Nettbutikk</h2>
              <button>Legg til Produkt</button>
              <button>Rediger Produkt</button>
            </div>
          </div>

          <div id="equipmentArea" class="adminCard">
            <h2>Utstyr og Sal</h2>
            <button>Legg til Utstyr</button>
            <button>Rediger Utstyr</button>
            <button>Saler</button>
          </div>

        </div>
      </div>
    </div>
  `;
}


function drawApplications() { }
function lastActivity() { }

