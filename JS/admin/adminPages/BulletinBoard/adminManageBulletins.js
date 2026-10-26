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

  for (let i = 0; i < model.bulletins.length; i++) {
    const bulletin = model.bulletins[i];

    html += /*HTML*/ `
      <div class="bulletinItem">
        
        <!-- Bulletin Title/Header -->
        <div style="border: 2px solid #333; padding: 8px 12px; background: #fff; border-radius: 4px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
          <span>${bulletin.title}</span>
          ${bulletin.isArchived ? '<span style="font-size: 0.8rem; color: #666; font-weight: normal;">(Arkivert)</span>' : ""}
        </div>

        <!-- Bulletin Text / Description -->
        <div style="border: 2px solid #333; padding: 12px; background: #fff; border-radius: 4px; min-height: 50px; font-size: 0.9rem; word-break: break-word;">
          ${bulletin.description ? bulletin.description.replace(/\n/g, "<br>") : ""}
        </div>

        <!-- Comments Section -->
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
