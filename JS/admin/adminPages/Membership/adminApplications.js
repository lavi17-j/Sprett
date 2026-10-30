function drawManageApplication() {
  const applicationsContent = /*HTML*/ `
    <div class="adminCard" style="width: 100%;">
      <h2>Behandle Søknader</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; width: 100%; margin-top: 8px;">
        ${drawDetailedApplications()}
      </div>
    </div>
  `;

  return drawAdminShell(applicationsContent);
}
