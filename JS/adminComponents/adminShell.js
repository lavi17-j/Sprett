function drawAdminShell(contentHtml) {
  return /*HTML*/ `
    <div class="adminLayout">
      ${drawAdminSideBar()}

      <div class="adminMain">
        ${drawAdminHeader()}
        ${drawAdminSubHeader()}

        <div class="adminContentArea">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;
}
