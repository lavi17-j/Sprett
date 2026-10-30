function drawAdminManageBulletins() {
  const manageBulletinsContent = /*HTML*/ `
    <div class="adminCard">
      <h2>Administrer Innlegg</h2>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 8px;">
        ${drawExistingBulletinsForManagement()}
      </div>
    </div>
  `;

  return drawAdminShell(manageBulletinsContent);
}

function drawExistingBulletinsForManagement() {
  let html = "";

  if (!model.bulletins || model.bulletins.length === 0) {
    return `<p style="font-size: 0.9rem; color: #64748b; font-style: italic;">Ingen oppslag funnet.</p>`;
  }

  let drafts = model.bulletins.filter((b) => !b.isPublished);
  let activeOrArchived = model.bulletins.filter((b) => b.isPublished);

  if (drafts.length > 0) {
    html += `<h3 style="font-size: 0.95rem; font-weight: 600; color: #d97706; margin: 0 0 8px 0;">Utkast (Ikke publisert)</h3>`;
    for (let i = 0; i < drafts.length; i++) {
      const bulletin = drafts[i];

      html += /*HTML*/ `
        <div class="bulletinItem" style="background: #fffbeb; border-color: #fde68a; margin-bottom: 16px;">
          <div style="border: 1px solid #e2e8f0; padding: 10px 14px; background: #ffffff; border-radius: 6px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; color: #0f172a;">
            <span>${bulletin.title || "Uten tittel"}</span>
            <span style="font-size: 0.8rem; color: #d97706; font-weight: 600; background: #fef3c7; padding: 2px 8px; border-radius: 4px;">Utkast</span>
          </div>

          <div style="border: 1px solid #e2e8f0; padding: 12px; background: #ffffff; border-radius: 6px; min-height: 40px; font-size: 0.9rem; color: #334155; word-break: break-word;">
            ${bulletin.description ? bulletin.description.replace(/\n/g, "<br>") : "<em style='color: #94a3b8;'>Ingen tekst</em>"}
          </div>

          <div style="display: flex; gap: 8px; justify-content: flex-start; margin-top: 4px;">
            <button onclick="publishDraft(${bulletin.bulletinId})" style="background: #0f172a; color: #ffffff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Publiser nå</button>
            <button onclick="deleteBulletin(${bulletin.bulletinId})" style="background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Slett utkast</button>
          </div>
        </div>
      `;
    }
    html += `<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;">`;
  }

  html += `<h3 style="font-size: 0.95rem; font-weight: 600; color: #0f172a; margin: 0 0 8px 0;">Publiserte og Arkiverte Innlegg</h3>`;

  if (activeOrArchived.length === 0) {
    html += `<p style="font-size: 0.9rem; color: #64748b; font-style: italic;">Ingen publiserte oppslag.</p>`;
    return html;
  }

  for (let i = 0; i < activeOrArchived.length; i++) {
    const bulletin = activeOrArchived[i];

    html += /*HTML*/ `
      <div class="bulletinItem" style="margin-bottom: 16px;">
        <div style="border: 1px solid #e2e8f0; padding: 10px 14px; background: #ffffff; border-radius: 6px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; color: #0f172a;">
          <span>${bulletin.title}</span>
          ${bulletin.isArchived ? '<span style="font-size: 0.8rem; color: #64748b; font-weight: normal; background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">Arkivert</span>' : ""}
        </div>

        <div style="border: 1px solid #e2e8f0; padding: 12px; background: #ffffff; border-radius: 6px; min-height: 40px; font-size: 0.9rem; color: #334155; word-break: break-word;">
          ${bulletin.description ? bulletin.description.replace(/\n/g, "<br>") : ""}
        </div>

        <div class="subSection" style="background: #ffffff; border: 1px solid #e2e8f0;">
          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px; color: #475569; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Kommentarer</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${drawBulletinComments(bulletin)}
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-start; margin-top: 4px;">
          <button onclick="deleteBulletin(${bulletin.bulletinId})" style="background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Slett</button>
          <button onclick="toggleArchiveBulletin(${bulletin.bulletinId})" style="border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; cursor: pointer; background: #ffffff; color: #334155; font-weight: 600; font-size: 0.85rem;">
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
    return `<p style="font-size: 0.85rem; color: #64748b; margin: 0; font-style: italic;">Ingen kommentarer ennå.</p>`;
  }

  let html = "";
  for (let j = 0; j < bulletin.comments.length; j++) {
    const comment = bulletin.comments[j];
    const username = getUsernameById(comment.userId);

    html += /*HTML*/ `
      <div style="border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 6px; background: #f8fafc; position: relative; display: flex; flex-direction: column; gap: 4px; padding-right: 35px;">
        <div style="font-weight: 600; font-size: 0.85rem; color: #0f172a;">${username}</div>
        <div style="font-size: 0.85rem; color: #475569; word-break: break-word;">${comment.text}</div>
        <span class="closeX" onclick="deleteComment(${bulletin.bulletinId}, ${comment.commentId})" title="Slett kommentar" style="font-size: 1.4rem; top: 8px; right: 12px; font-weight: bold; cursor: pointer; color: #94a3b8;">&times;</span>
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
