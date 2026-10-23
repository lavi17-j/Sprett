function deleteBulletin(bulletinId) {
  const index = model.bulletins.findIndex((b) => b.bulletinId === bulletinId);
  if (index !== -1) {
    model.bulletins.splice(index, 1);
  }
  updateView();
}

function toggleArchiveBulletin(bulletinId) {
  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (bulletin) {
    bulletin.isArchived = !bulletin.isArchived;
  }
  updateView();
}

function deleteComment(bulletinId, commentId) {
  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (bulletin && bulletin.comments) {
    const commentIndex = bulletin.comments.findIndex(
      (c) => c.commentId === commentId,
    );
    if (commentIndex !== -1) {
      bulletin.comments.splice(commentIndex, 1);
    }
  }
  updateView();
}

function getLatestCommentActivity() {
  if (!model.bulletins || model.bulletins.length === 0) return null;

  let allComments = [];

  // 1. Flatten all comments from all bulletins into a single list
  for (let i = 0; i < model.bulletins.length; i++) {
    const bulletin = model.bulletins[i];
    if (bulletin.comments && bulletin.comments.length > 0) {
      for (let j = 0; j < bulletin.comments.length; j++) {
        const comment = bulletin.comments[j];
        allComments.push({
          bulletinTitle: bulletin.title,
          bulletinId: bulletin.bulletinId,
          userId: comment.userId,
          text: comment.text,
          commentId: comment.commentId,
          totalCommentsInBulletin: bulletin.comments.length,
        });
      }
    }
  }

  if (allComments.length === 0) return null;

  // 2. Find the latest comment (using commentId or array position)
  // Assuming higher commentId or the last item pushed is the latest
  const latest = allComments[allComments.length - 1];

  // 3. Resolve the username
  const user = model.users.find((u) => u.userId === latest.userId);
  latest.userName = user ? user.username : "Ukjent bruker";

  return latest;
}

function drawDashboardLatestActivity() {
  const latest = getLatestCommentActivity();

  if (!latest) {
    return `
      <div class="subSection">
        <h3>Siste Aktivitet</h3>
        <p style="font-size: 0.85rem; color: #666; margin: 0;">Ingen nylige kommentarer.</p>
        <button onclick="navigateTo('manageBulletins')">Se og moderer</button>
      </div>
    `;
  }

  return /*HTML*/ `
    <div class="subSection">
      <h3>Siste Aktivitet</h3>
      <div class="bulletinItem">
        <div class="bulletinHeader">
          <div class="avatarCircle"></div>
          <div>
            <strong>${latest.bulletinTitle}</strong>
            <div>${latest.userName}</div>
            <small>${latest.text}</small>
          </div>
          <span class="closeX" onclick="deleteComment(${latest.bulletinId}, ${latest.commentId})" title="Slett kommentar">✕</span>
        </div>
        <small>Antall kommentarer: ${latest.totalCommentsInBulletin}</small>
      </div>
      <button onclick="navigateTo('manageBulletins')">Se og moderer</button>
    </div>
  `;
}