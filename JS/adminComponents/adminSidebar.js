function drawAdminSideBar() {
  return /*HTML*/ `
  <div class="sideBar">
    <div class="sidebarLogo">Sprett Admin</div>
    <ul class="sidebarNav">
      <li onclick="navigateTo('adminDashboard')">Dashboard</li>
      <li>Medlemskap</li>
      <li>Oppslagstavla</li>
      <li>Booking/Arrangementer</li>
      <li>Butikk</li>
      <li>Utstyr og Sal</li>
      <li>Annet</li>
    </ul>
  </div>
  `;

}
