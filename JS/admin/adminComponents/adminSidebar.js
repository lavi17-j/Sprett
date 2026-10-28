function drawAdminSideBar() {
  return /*HTML*/ `
    <div class="sideBar">
      <div class="sidebarLogo">Sprett Admin</div>
      <ul class="sidebarNav">
        <li onclick="navigateTo('adminDashboard')">Dashboard</li>
        <li onclick="navigateTo('memberships')">Medlemskap</li>
        <li onclick="navigateTo('editBulletins')">Oppslagstavla</li>
        <li onclick="navigateTo('addEquipment')">Booking/Arrangementer</li>
        <li>Butikk</li>
        <li onclick="navigateTo('addEquipment')">Utstyr</li>
        <li onclick="navigateTo('manageRooms')">Sal</li>
        <li>Annet</li>
      </ul>
      <div class="codeoftheday adminCard">
        <h3>Dagens Kode</h3>
        <h2>${model.codeOfTheDay}</h2>
      </div>
    </div>
  `;
}
