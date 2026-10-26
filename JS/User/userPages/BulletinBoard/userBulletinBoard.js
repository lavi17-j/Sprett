function drawUserBulletinBoard() {
  const pageState = model.viewState.bulletinPage;
  const isFocused =
    pageState.selectedBulletinId !== null || pageState.selectedEventId !== null;

  let bulletinBoardContent = /*HTML*/ `
    <div class="userContentArea">
      <div class="info-box">
        <h3>Oppslagstavle & Arrangementer</h3>
        
        ${
          isFocused
            ? /*HTML*/ `
          <button class="wide-button" onclick="clearBulletinFocus()" style="margin: 0 0 12px 0; width: 100%;">← Tilbake til oversikt</button>
        `
            : ""
        }

        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
          ${drawUserBulletinsList()}
        </div>
      </div>
    </div>
  `;

  return drawUserShell(bulletinBoardContent);
}
