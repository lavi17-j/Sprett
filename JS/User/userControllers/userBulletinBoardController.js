function focusBulletin(bulletinId) {
  model.viewState.bulletinPage.selectedBulletinId = bulletinId;
  updateView();
}

function clearBulletinFocus() {
  model.viewState.bulletinPage.selectedBulletinId = null;
  updateView();
}

function addComment(bulletinId) {
  const text = model.viewState.bulletinPage.inputComment;
  if (!text || text.trim() === "") return;

  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (!bulletin) return;

  if (!bulletin.comments) {
    bulletin.comments = [];
  }

  let newCommentId = 0;
  if (bulletin.comments.length > 0) {
    newCommentId = Math.max(...bulletin.comments.map((c) => c.commentId)) + 1;
  }

  bulletin.comments.push({
    commentId: newCommentId,
    userId: model.app.loggedInUserId,
    text: text.trim(),
  });

  model.viewState.bulletinPage.inputComment = "";
  updateView();
}

function deleteUserComment(bulletinId, commentId) {
  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (!bulletin || !bulletin.comments) return;

  const commentIndex = bulletin.comments.findIndex(
    (c) => c.commentId === commentId,
  );
  if (commentIndex !== -1) {
    const comment = bulletin.comments[commentIndex];

    if (comment.userId === model.app.loggedInUserId || model.app.loggedInUserId === 0) {
      bulletin.comments.splice(commentIndex, 1);
      updateView();
    }
  }
}

function getUsernameById(userId) {
  if (!model.users) return "Unknown user";
  const user = model.users.find((u) => u.userId === userId);
  return user ? user.username : "Unknown user";
}

function drawUserBulletinsList(selectedId) {
  let html = "";

  if (!model.bulletins || model.bulletins.length === 0) {
    return "<p style='text-align: center; color: #666;'>No bulletins found.</p>";
  }

  const bulletinsToDisplay =
    selectedId !== null
      ? model.bulletins.filter((b) => b.bulletinId === selectedId)
      : model.bulletins;

  if (bulletinsToDisplay.length === 0) {
    return "<p style='text-align: center; color: #666;'>Bulletin not found.</p>";
  }

  for (let i = 0; i < bulletinsToDisplay.length; i++) {
    const bulletin = bulletinsToDisplay[i];

    if (bulletin.isArchived) continue;

    const isFocused = selectedId !== null;
    const maxLength = 140;
    const rawText = bulletin.description || "";

    let displayText = rawText;
    if (!isFocused && rawText.length > maxLength) {
      displayText = rawText.substring(0, maxLength) + "...";
    }

    const formattedText = displayText.replace(/\n/g, "<br>");

    html += /*HTML*/ `
      <div 
        onclick="${isFocused ? "" : `focusBulletin(${bulletin.bulletinId})`}"
        style="
          border: 2px solid #000000; 
          border-radius: 10px; 
          padding: 12px; 
          background: #ffffff; 
          display: flex; 
          flex-direction: column; 
          gap: 6px; 
          cursor: ${isFocused ? "default" : "pointer"};
          transition: background 0.2s;
        "
        onmouseover="if(!${isFocused}) this.style.background='#f9f9f9'"
        onmouseout="if(!${isFocused}) this.style.background='#ffffff'"
      >
        <div style="font-weight: bold; font-size: 14px; border-bottom: 1px solid #000000; padding-bottom: 4px;">
          ${bulletin.title}
        </div>
        <div style="font-size: 13px; color: #333333; word-break: break-word; line-height: 1.4;">
          ${formattedText}
        </div>
        ${
          !isFocused && rawText.length > maxLength
            ? /*HTML*/ `
          <div style="font-size: 11px; color: #666; font-style: italic; margin-top: 2px;">Click to read more...</div>
        `
            : ""
        }

        ${
          isFocused
            ? /*HTML*/ `
          <div style="margin-top: 15px; border-top: 1px solid #000000; padding-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: bold; font-size: 13px;">Comments</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${drawBulletinCommentsList(bulletin)}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;" onclick="event.stopPropagation()">
              <textarea 
                style="width: 100%; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; font-size: 13px; padding: 8px; border: 2px solid #000000; border-radius: 6px; resize: vertical; min-height: 60px;"
                placeholder="Write a comment..."
                oninput="model.viewState.bulletinPage.inputComment = this.value"
              >${model.viewState.bulletinPage.inputComment || ""}</textarea>
              <button class="wide-button" onclick="addComment(${bulletin.bulletinId})" style="margin: 0; width: 100%;">Post comment</button>
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  return html;
}

function drawBulletinCommentsList(bulletin) {
  if (!bulletin.comments || bulletin.comments.length === 0) {
    return `<p style="font-size: 12px; color: #666; font-style: italic; margin: 0;">No comments yet.</p>`;
  }

  let html = "";
  for (let j = 0; j < bulletin.comments.length; j++) {
    const comment = bulletin.comments[j];
    const username = getUsernameById(comment.userId);
    const isOwner = comment.userId === model.app.loggedInUserId || model.app.loggedInUserId === 0;

    html += /*HTML*/ `
      <div style="border: 1px solid #000000; border-radius: 6px; padding: 8px; background: #fafafa; position: relative; display: flex; flex-direction: column; gap: 4px; ${isOwner ? "padding-right: 25px;" : ""}">
        <div style="font-weight: bold; font-size: 12px; color: #000;">${username}</div>
        <div style="font-size: 13px; color: #333; word-break: break-word;">${comment.text}</div>
        
        ${
          isOwner
            ? /*HTML*/ `
          <span onclick="deleteUserComment(${bulletin.bulletinId}, ${comment.commentId})" style="position: absolute; right: 8px; top: 6px; font-weight: bold; cursor: pointer; font-size: 16px;" title="Delete comment">&times;</span>
        `
            : ""
        }
      </div>
    `;
  }
  return html;
}