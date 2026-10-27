function drawAdminManageBulletins() {
  const manageBulletinsContent = /*HTML*/ `
    <div class="adminCard">
      <h2>Administrer Innlegg</h2>
      <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;">
        ${drawExistingBulletinsForManagement()}
      </div>
    </div>
  `;

  return drawAdminShell(manageBulletinsContent);
}

function drawExistingBulletinsForManagement() {
  let html = "";

  if (!model.bulletins || model.bulletins.length === 0) {
    return "<p>Ingen oppslag funnet.</p>";
  }

  let drafts = model.bulletins.filter((b) => !b.isPublished);
  let activeOrArchived = model.bulletins.filter((b) => b.isPublished);

  if (drafts.length > 0) {
    html += `<h3 style="font-size: 0.9rem; margin: 0 0 10px 0; color: #b8860b;">Utkast (Ikke publisert)</h3>`;
    for (let i = 0; i < drafts.length; i++) {
      const bulletin = drafts[i];

      html += /*HTML*/ `
        <div class="bulletinItem" style="background: #fffdf5; border-color: #e6dbb9; margin-bottom: 15px;">
          <div style="border: 2px solid #333; padding: 8px 12px; background: #fff; border-radius: 4px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
            <span>${bulletin.title || "Uten tittel"}</span>
            <span style="font-size: 0.8rem; color: #b8860b; font-weight: bold;">(Utkast)</span>
          </div>

          <div style="border: 2px solid #333; padding: 12px; background: #fff; border-radius: 4px; min-height: 40px; font-size: 0.9rem; word-break: break-word;">
            ${bulletin.description ? bulletin.description.replace(/\n/g, "<br>") : "<em>Ingen tekst</em>"}
          </div>

          <div style="display: flex; gap: 8px; justify-content: flex-start; margin-top: 5px;">
            <button onclick="publishDraft(${bulletin.bulletinId})" style="background: #333 !important; color: white !important; border: 2px solid #333; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Publiser nå</button>
            <button onclick="deleteBulletin(${bulletin.bulletinId})" style="background: #be0000 !important; color: white !important; border: 2px solid #333; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Slett utkast</button>
          </div>
        </div>
      `;
    }
    html += `<hr style="border: 0; border-top: 2px solid #ddd; margin: 20px 0;">`;
  }

  html += `<h3 style="font-size: 0.9rem; margin: 0 0 10px 0;">Publiserte og Arkiverte Innlegg</h3>`;

  if (activeOrArchived.length === 0) {
    html += `<p style="font-size: 0.85rem; color: #666;">Ingen publiserte oppslag.</p>`;
    return html;
  }

  for (let i = 0; i < activeOrArchived.length; i++) {
    const bulletin = activeOrArchived[i];

    html += /*HTML*/ `
      <div class="bulletinItem" style="margin-bottom: 15px;">
        <div style="border: 2px solid #333; padding: 8px 12px; background: #fff; border-radius: 4px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
          <span>${bulletin.title}</span>
          ${bulletin.isArchived ? '<span style="font-size: 0.8rem; color: #666; font-weight: normal;">(Arkivert)</span>' : ""}
        </div>

        <div style="border: 2px solid #333; padding: 12px; background: #fff; border-radius: 4px; min-height: 40px; font-size: 0.9rem; word-break: break-word;">
          ${bulletin.description ? bulletin.description.replace(/\n/g, "<br>") : ""}
        </div>

        <div class="subSection" style="background: #fff;">
          <h3 style="border-bottom: 1px solid #333; padding-bottom: 4px; margin-bottom: 8px;">Kommentarer</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${drawBulletinComments(bulletin)}
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-start; margin-top: 5px;">
          <button onclick="deleteBulletin(${bulletin.bulletinId})" style="background: #be0000 !important; color: white !important; border: 2px solid #333; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Slett</button>
          <button onclick="toggleArchiveBulletin(${bulletin.bulletinId})" style="border: 2px solid #333; padding: 6px 12px; border-radius: 4px; cursor: pointer; background: #fff;">
            ${bulletin.isArchived ? "Gjenopprett" : "Arkiver"}
          </button>
        </div>

      </div>
    `;
  }

  return html;
}

function drawBulletinComments(bulletin) {
  if (!bulletin.comments || bulletin.comments.length === 0) {
    return `<p style="font-size: 0.85rem; color: #666; margin: 0;">Ingen kommentarer ennå.</p>`;
  }

  let html = "";
  for (let j = 0; j < bulletin.comments.length; j++) {
    const comment = bulletin.comments[j];
    const username = getUsernameById(comment.userId);

    html += /*HTML*/ `
      <div style="border: 2px solid #333; padding: 8px 12px; border-radius: 4px; background: #f9f9f9; position: relative; display: flex; flex-direction: column; gap: 4px; padding-right: 35px;">
        <div style="font-weight: bold; font-size: 0.85rem; color: #333;">${username}</div>
        <div style="font-size: 0.85rem; color: #555; word-break: break-word;">${comment.text}</div>
        <span class="closeX" onclick="deleteComment(${bulletin.bulletinId}, ${comment.commentId})" title="Slett kommentar" style="font-size: 1.8rem; top: 2px; right: 8px; font-weight: bold; cursor: pointer;">&times;</span>
      </div>
    `;
  }
  return html;
}

function getUsernameById(userId) {
  if (!model.users) return "Ukjent bruker";
  const user = model.users.find((u) => u.userId === userId);
  return user ? user.username : "Ukjent bruker";
}
