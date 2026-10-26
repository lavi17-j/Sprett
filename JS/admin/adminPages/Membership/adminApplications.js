function drawManageApplication() {
  const applicationsContent = /*HTML*/ `
    <div class="adminCard" style="width: 100%;">
      <h2>Behandle Søknader</h2>
      
      <div class="applicationListContainer" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        ${drawDetailedApplications()}
      </div>
    </div>
  `;

  return drawAdminShell(applicationsContent);
}
