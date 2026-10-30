function drawAdminEditBulletins() {
  const postState = model.viewState.adminCreatePostPage;

  const editBulletinsContent = /*HTML*/ `
    <div class="adminCard">
      <h2>Lag Innlegg</h2>

      <div class="adminContentArea">
        
        <div class="stackedColumn" style="flex: 1;">
          <div class="subSection">
            <h3>Tittel</h3>
            <input
              type="text"
              value="${postState.title || ""}"
              oninput="model.viewState.adminCreatePostPage.title = this.value"
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px;"
            />
          </div>

          <div class="subSection">
            <h3>Koble til Arrangement (Event ID)</h3>
            <select
              style="width: 100%; padding: 8px; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; background: #fff;"
              onchange="selectEventForPost(this.value)"
            >
              ${generateEventDropdown()}
            </select>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button onclick="createPost(false)">Lagre utkast</button>
            <button onclick="createPost(true)" style="background: #333 !important; color: white !important;">Publiser</button>
          </div>
        </div>

        <div class="adminContentArea" style="flex: 1.2; gap: 15px;">
          
          <div class="adminCard" style="flex: 1; background: #fafafa;">
            <h2>Forhåndsvisning</h2>
            <div style="font-weight: bold; text-align: center; border-bottom: 2px solid #333; padding-bottom: 6px; word-break: break-word;">
              ${postState.title || "Tittel"}
            </div>
            <div style="flex: 1; min-height: 180px; background: #fff; border: 2px solid #333; padding: 10px; border-radius: 4px; font-size: 0.9rem; color: #333; word-break: break-word; overflow-y: auto;">
              ${postState.inputText ? postState.inputText.replace(/\n/g, "<br>") : "Teksten forhåndsvises her"}
            </div>
          </div>

          <div class="adminCard" style="flex: 1; background: #fafafa;">
            <h2>Innleggstekst</h2>
            <textarea
              style="width: 100%; flex: 1; min-height: 220px; padding: 10px; resize: vertical; box-sizing: border-box; border: 2px solid #333; border-radius: 4px; font-family: sans-serif;"
              placeholder="Skriv her for å fylle inn tekst i innlegget"
              oninput="model.viewState.adminCreatePostPage.inputText = this.value"
            >${postState.inputText || ""}</textarea>
          </div>
        </div>

      </div>
    </div>
  `;

  return drawAdminShell(editBulletinsContent);
}
