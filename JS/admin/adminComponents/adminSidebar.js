function drawAdminSideBar() {
  return /*HTML*/ `
  <div class="sideBar">
    <div class="sidebarLogo">Sprett Admin</div>
    <ul class="sidebarNav">
      <li onclick="navigateTo('adminDashboard')">Dashboard</li>
      <li onclick="navigateTo('memberships')">Medlemskap</li>
      <li onclick="navigateTo('editBulletins')">Oppslagstavla</li>
      <li>Booking/Arrangementer</li>
      <li>Butikk</li>
      <li onclick="navigateTo('manageRooms')">Utstyr og Sal</li>
      <li>Annet</li>
    </ul>
  </div>
  `;

}
